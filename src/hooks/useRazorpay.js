import { useEffect, useRef, useState } from 'react'

const SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'
const SCRIPT_ID  = 'razorpay-checkout-script'

/**
 * Dynamically loads the Razorpay checkout script and exposes openRazorpay().
 *
 * Returns:
 *   ready       — true once the script is loaded and window.Razorpay exists
 *   scriptError — true if the script failed to load
 *   openRazorpay(options) — opens the Razorpay modal
 *
 * options shape (passed straight through to Razorpay, merged with defaults):
 *   amount, currency, name, description, prefill, notes,
 *   handler(response)   — called on successful payment
 *   onDismiss()         — called when user closes the modal without paying
 *   onError(err)        — called on payment failure
 */
export function useRazorpay() {
  const [ready,       setReady]       = useState(() => Boolean(window.Razorpay))
  const [scriptError, setScriptError] = useState(false)
  const rzpInstance = useRef(null)

  useEffect(() => {
    // Already loaded by a previous render or another hook instance
    if (window.Razorpay) { setReady(true); return }

    // Avoid injecting the script twice
    if (document.getElementById(SCRIPT_ID)) return

    const script    = document.createElement('script')
    script.id       = SCRIPT_ID
    script.src      = SCRIPT_URL
    script.async    = true
    script.onload   = () => setReady(true)
    script.onerror  = () => {
      console.error('[useRazorpay] Failed to load Razorpay checkout script.')
      setScriptError(true)
    }
    document.body.appendChild(script)

    // No cleanup — the script tag should persist for the app's lifetime
  }, [])

  /**
   * Opens the Razorpay payment modal.
   * Resolves when the user either pays, dismisses, or triggers an error.
   */
  const openRazorpay = (options) => {
    if (!ready || !window.Razorpay) {
      console.error('[useRazorpay] Razorpay is not ready yet.')
      options.onError?.({ description: 'Payment gateway not loaded. Please try again.' })
      return
    }

    const { handler, onDismiss, onError, ...rest } = options

    const rzpOptions = {
      key:      import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: 'INR',
      name:     'Saanvi Marks',
      image:    '/logo.png',       // optional — silently ignored if missing
      theme:    { color: '#c98b0a' },
      modal: {
        backdropclose: false,
        escape:        false,
        ondismiss:     () => onDismiss?.(),
      },
      ...rest,
      // handler is Razorpay's success callback
      handler: (response) => handler?.(response),
    }

    // Attach payment failure listener on the instance
    rzpInstance.current = new window.Razorpay(rzpOptions)
    rzpInstance.current.on('payment.failed', (response) => {
      onError?.(response.error)
    })

    rzpInstance.current.open()
  }

  return { ready, scriptError, openRazorpay }
}
