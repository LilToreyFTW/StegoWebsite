# StegoProxy Masker Website - Final Master Build – Updated in existing files only

A complete Next.js 15+ website for the StegoProxy Masker system with **dual authentication** (Clerk + Better Auth), BuyMeACoffee payment integration, and NeonDB backend connection.

## System Integration (Desktop + Website)

This website is part of the **Final Master Build** that integrates with the desktop StegoProxy Masker application:

- **License System**: Keys bought via website (BuyMeACoffee + receipt upload) can be redeemed in the desktop app
- **Beacon Tracking**: Grabs data from desktop app appears in website Analytics
- **Shared Backend**: Both use the same NeonDB API for data storage
- **Hardware Binding**: Desktop licenses are bound to hardware fingerprints via NeonDB

## Features

- **Next.js 15+ with App Router** - Modern React framework with server-side rendering
- **Dual Authentication System**:
  - **Clerk Authentication (Keyless Mode)** - Secure user authentication without API key setup
  - **Better Auth v1.5.6** - Alternative email/password authentication running alongside Clerk
- **6 Pages/Tabs**:
  - Welcome (Home/Landing)
  - Analytics (Protected - tracking data)
  - Buy Keys (Protected - BuyMeACoffee payment + receipt upload)
  - Download (Protected - Tool download after key redemption)
  - Dashboard (Protected - Personal overview)
  - Account (Protected - Profile & history with dual auth status)
- **Dark Theme** - Modern, professional UI with Tailwind CSS
- **Responsive Design** - Works on desktop, tablet, and mobile

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd E:\viewerGUI\website
npm install
```

This will install both Clerk and Better Auth v1.5.6 along with all peer dependencies.

### 2. Clerk Keyless Mode Setup

This project uses Clerk's keyless mode - no API keys needed! Just run the dev server and Clerk will guide you through setup.

### 3. Better Auth v1.5.6 Setup

Better Auth uses the same NeonDB database as your existing `neondb_api`. Ensure your `DATABASE_URL` environment variable is set (see below).

### 4. Environment Variables

Create a `.env.local` file in the website folder:

```env
# NeonDB Connection (same as neondb_api)
DATABASE_URL=postgresql://username:password@host:port/database

# NeonDB API (optional - for analytics/receipts)
NEONDB_API_URL=https://your-neondb-api.vercel.app/api
ADMIN_KEY=your-admin-key-for-analytics
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. First-Time Setup

1. Visit `http://localhost:3000`
2. Click "Sign Up" to create your first user account with **Clerk**
3. OR visit `/sign-up` to use **Better Auth** (email/password)
4. Both auth systems work independently - you can use either one

## Dual Authentication Explained

This website features **two complete authentication systems** running side by side:

### Clerk (Primary)
- Keyless mode - no API keys required
- Modal-based sign in/sign up
- User button in navigation
- Social login support (if configured)

### Better Auth v1.5.6 (Alternative)
- Email/password authentication
- Uses the same NeonDB database
- Dedicated sign-in/sign-up pages at `/sign-in` and `/sign-up`
- Session info shown in Account page Profile tab

### How It Works
- Both systems use the same protected routes
- Nav links appear when signed in with either system
- Users can choose which auth method to use
- Both sessions can coexist independently

## Project Structure

```
website/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Welcome/Home page
│   ├── layout.tsx                # Root layout with ClerkProvider + BetterAuthProvider
│   ├── globals.css               # Global styles
│   ├── sign-in/page.tsx          # Better Auth sign in page
│   ├── sign-up/page.tsx          # Better Auth sign up page
│   ├── analytics/
│   │   ├── page.tsx              # Analytics page (server)
│   │   └── analytics-client.tsx  # Analytics UI (client)
│   ├── buy-keys/
│   │   ├── page.tsx              # Buy Keys page (server)
│   │   └── buy-keys-client.tsx   # Buy Keys UI (client)
│   ├── download/
│   │   ├── page.tsx              # Download page (server)
│   │   └── download-client.tsx   # Download UI (client)
│   ├── dashboard/
│   │   ├── page.tsx              # Dashboard page (server)
│   │   └── dashboard-client.tsx  # Dashboard UI (client)
│   ├── account/
│   │   ├── page.tsx              # Account page (server)
│   │   └── account-client.tsx    # Account UI (client) - shows dual auth status
│   └── api/                      # API Routes
│       ├── auth/[...all]/route.ts # Better Auth API handler
│       ├── analytics/route.ts     # Analytics data endpoint
│       ├── receipts/route.ts      # Receipt upload endpoint
│       └── redeem/route.ts        # Key redemption endpoint
├── components/
│   ├── navbar.tsx                # Navigation bar (dual auth aware)
│   ├── footer.tsx                # Footer
│   ├── better-auth-provider.tsx  # Better Auth v1.5.6 provider
│   ├── better-auth-signin.tsx    # Better Auth sign in component
│   ├── better-auth-signup.tsx    # Better Auth sign up component
│   ├── better-auth-user-button.tsx # Better Auth user menu
│   └── better-auth-session-info.tsx # Better Auth session display
├── lib/
│   └── auth.ts                   # Better Auth v1.5.6 configuration (NeonDB)
├── middleware.ts                 # Clerk middleware for auth
├── tailwind.config.ts            # Tailwind configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies (Clerk + Better Auth v1.5.6)
├── vercel.json                   # Vercel deployment config (copied from neondb_api)
└── tsconfig.json                 # TypeScript configuration
```

## Better Auth v1.5.6 Files

| File | Purpose |
|------|---------|
| `lib/auth.ts` | Better Auth configuration with NeonDB database |
| `app/api/auth/[...all]/route.ts` | Catch-all API route for Better Auth endpoints |
| `components/better-auth-provider.tsx` | React provider and hooks (useSession, signIn, signUp, signOut) |
| `components/better-auth-signin.tsx` | Sign in form component |
| `components/better-auth-signup.tsx` | Sign up form component |
| `components/better-auth-user-button.tsx` | User menu dropdown |
| `components/better-auth-session-info.tsx` | Session status display |
| `app/sign-in/page.tsx` | Dedicated sign in page |
| `app/sign-up/page.tsx` | Dedicated sign up page |

## BuyMeACoffee Integration

The Buy Keys page includes:
- Direct link to your BuyMeACoffee page: `https://buymeacoffee.com/toreyftw`
- Package selection (24h, 7-day, 1-month, Lifetime)
- Receipt upload form (image/PDF)
- Receipt history with status tracking

To customize the BuyMeACoffee link, edit `app/buy-keys/buy-keys-client.tsx`:
```typescript
<a href="https://buymeacoffee.com/toreyftw" ...>
```

## NeonDB Connection

### Better Auth Database
Better Auth v1.5.6 uses your existing NeonDB connection:
- Tables are automatically created by Better Auth on first run
- Uses the same `DATABASE_URL` as your `neondb_api`
- Tables: `user`, `session`, `account`, `verification`

### API Integration
The website is designed to connect to your existing NeonDB API at `E:\viewerGUI\neondb_api`.

API routes are set up in `app/api/` and include mock data for development. To connect to your actual NeonDB:

1. Update the API routes to call your NeonDB endpoints
2. Add the NeonDB API URL to `.env.local`

Example endpoint integration:
```typescript
// app/api/analytics/route.ts
const response = await fetch(`${process.env.NEONDB_API_URL}/beacon-stats`, {
  headers: { "X-Admin-Key": process.env.ADMIN_KEY }
});
const data = await response.json();
```

## Authentication Flow

1. **Public Pages**: Welcome page is accessible to all
2. **Protected Pages**: All other pages require sign-in with **either** Clerk OR Better Auth
3. **Clerk Middleware**: Handles route protection automatically for Clerk users
4. **Better Auth**: Alternative email/password auth at `/sign-in` and `/sign-up`
5. **Account Page**: Shows status of both auth systems in the Profile tab

## Using Better Auth

### Sign Up
1. Visit `/sign-up`
2. Enter your name, email, and password
3. Account is created in NeonDB
4. Redirected to dashboard

### Sign In
1. Visit `/sign-in`
2. Enter email and password
3. Session is established
4. Redirected to dashboard

### Sign Out
Click the user menu in the navigation bar and select "Sign Out"

## Building for Production

```bash
npm run build
```

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

The `vercel.json` file (copied from `neondb_api`) ensures consistent deployment settings.

### Environment Variables for Production

Set these in your Vercel dashboard:
- `DATABASE_URL` - Your NeonDB connection string
- `NEONDB_API_URL` - Your NeonDB API URL (optional)
- `ADMIN_KEY` - Admin key for analytics API (optional)

### Other Platforms

Build output is in `.next/` folder. Follow your platform's Next.js deployment guide.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Primary Auth**: Clerk (Keyless Mode)
- **Alternative Auth**: Better Auth v1.5.6 (Email/Password)
- **Database**: NeonDB (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payments**: BuyMeACoffee (manual verification)

## Troubleshooting

### Better Auth Tables Not Found
Better Auth will automatically create required tables on first run. Ensure your `DATABASE_URL` is correct and the database is accessible.

### Both Auth Systems Show Different Users
This is expected behavior - Clerk and Better Auth maintain separate user tables. Users can choose which system to use.

### Navigation Links Not Appearing
Navigation links appear when signed in with either Clerk OR Better Auth. Check the Account page Profile tab to see your current auth status.

## License

This project is part of the StegoProxy Masker system.
