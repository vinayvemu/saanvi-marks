# Saanvi Marks — Luxury Laser Engraving Platform

> *Every mark tells your story.*

Premium e-commerce platform for laser engraved personalised gifts — based in Tirupati, Andhra Pradesh.

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage (design uploads)
- **Payments**: Razorpay *(integration pending)*
- **Routing**: React Router v6

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/vinayvemu/saanvi-marks.git
cd saanvi-marks

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# → Fill in your Firebase config from Firebase Console

# 4. Run development server
npm run dev
```

## Firebase Setup
1. Go to https://console.firebase.google.com
2. Create new project: **saanvi-marks**
3. Add a Web app → copy config to `.env.local`
4. Enable **Firestore**, **Authentication** (Email + Google), **Storage**
5. Set Firestore rules to allow authenticated reads/writes

## Project Structure
```
src/
├── components/
│   ├── layout/       # Navbar, Footer, CartDrawer
│   ├── home/         # HomePage sections
│   ├── product/      # ProductCard, EngravingCustomiser
│   └── ui/           # Reusable UI components
├── pages/            # Route-level pages
├── context/          # CartContext (global cart state)
├── data/             # Products, categories, testimonials
├── lib/              # Firebase init
└── hooks/            # Custom React hooks
```

## Phase 1 (Built)
- [x] Homepage with hero, collections, occasions, testimonials
- [x] Products listing with category filters
- [x] Product detail page
- [x] Live engraving customiser (text + image)
- [x] Cart with persistent localStorage state
- [x] Checkout form with Firebase order creation
- [x] Order success page

## Phase 2 (Next)
- [ ] Firebase Authentication (login/signup)
- [ ] User account + order history
- [ ] Corporate B2B portal
- [ ] Admin dashboard (order management + print queue)
- [ ] Razorpay payment integration
- [ ] WhatsApp notification on order
- [ ] Pre-ship photo approval workflow

## Business
**Saanvi Marks** | Tirupati, Andhra Pradesh  
WhatsApp: +91 XXXXXXXXXX  
Email: hello@saanvimarks.in
