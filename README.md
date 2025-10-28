# 🌍 Countries Explorer

A modern app about countries built with Next.js that provides comprehensive information about countries around the world. Explore country details, check weather conditions, browse beautiful images, and learn from Wikipedia summaries.

## ✨ Features

### 🔍 **Country Discovery**

- Browse and search through all world countries
- Filter by regions (Africa, Americas, Asia, Europe, Oceania, Antarctic)
- Real-time search with URL synchronization
- Responsive pagination for easy navigation

### 🏛️ **Detailed Country Information**

- Flag display and official country names
- Population, capital, region, and subregion details
- Languages and currencies information
- World Bank population data integration

### 🌤️ **Weather Integration**

- Current weather conditions for country capitals
- Temperature, humidity, wind speed and direction
- Powered by Open-Meteo API

### 📸 **Visual Content**

- Beautiful country images from Unsplash
- Wikipedia introductions and summaries
- Responsive image galleries

### 🔐 **Authentication**

- Google OAuth integration with NextAuth.js
- Protected routes for detailed country information
- Secure session management

### 🎨 **User Experience**

- Dark/light theme support
- Loading states and error boundaries
- Hover effects and smooth transitions
- Mobile-first responsive design
- Accessibility features (ARIA labels, keyboard navigation)

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library

### **Authentication**

- **NextAuth.js** - Authentication for Next.js
- **Google OAuth** - Secure social login

### **APIs & Data**

- **REST Countries API** - Country information
- **Open-Meteo API** - Weather data
- **Unsplash API** - High-quality images
- **Wikipedia API** - Country summaries
- **World Bank API** - Population statistics

### **Development**

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **Next.js Image Optimization** - Automatic image optimization

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/thealindsjo/js3-slutuppgift-thea-lindsjo.git
   cd js3-slutuppgift-thea-lindsjo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_URL=your-auth-url
   NEXTAUTH_SECRET=your-auth-secret

   AUTH_GOOGLE_ID=your-auth-google-id
   AUTH_GOOGLE_SECRET=your-auth-google-secret
   
   UNSPLASH_ACCESS_KEY=your-unsplash-access-key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (NextAuth)
│   ├── countries/         # Countries list page
│   ├── country/[code]/    # Dynamic country detail page
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── AuthButton.tsx    # Authentication component
│   ├── CountriesContainer.tsx # Main countries container
│   ├── CountryCard.tsx   # Individual country card
│   ├── ErrorBoundary.tsx # Error handling
│   └── ...
├── api/                  # API utility functions
│   ├── country.ts        # REST Countries API
│   ├── weather.ts        # Open-Meteo API
│   ├── unsplash.ts       # Unsplash API
│   └── ...
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
├── public/               # Static assets
└── middleware.ts         # Next.js middleware for auth
```

## 🔧 API Integration

### External APIs Used

- **[REST Countries](https://restcountries.com/)** - Comprehensive country data
- **[Open-Meteo](https://open-meteo.com/)** - Free weather API
- **[Unsplash](https://unsplash.com/developers)** - High-quality stock photos
- **[Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)** - Encyclopedia content
- **[World Bank](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392)** - Development indicators

## 🔐 Authentication Setup

### Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

### Unsplash API Setup

1. Create account at [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Get your Access Key
4. Add to environment variables

## 📱 Features in Detail

### Search & Filter

- **Real-time search**: Instant results as you type
- **Region filtering**: Filter by geographical regions
- **URL persistence**: Search parameters saved in URL
- **Input validation**: 100 character limit with error handling

### Country Details

- **Comprehensive info**: All essential country data
- **Weather integration**: Live weather for capital cities
- **Image gallery**: Curated photos from Unsplash
- **Wikipedia content**: Educational country summaries

## 🎨 Styling & UI

### Design System

- **Consistent spacing**: Tailwind's spacing scale
- **Typography**: Hierarchical text sizing
- **Color palette**: Semantic color usage
- **Interactive states**: Hover and focus effects

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Breakpoint system**: sm, md, lg responsive breakpoints
- **Flexible layouts**: CSS Grid and Flexbox
- **Touch-friendly**: Appropriate touch targets

## 🧪 Development

### Code Quality

- **TypeScript**: Full type coverage
- **ESLint**: Configured linting rules
- **Component documentation**: JSDoc comments
- **Error boundaries**: Robust error handling

### Performance

- **Next.js optimization**: Automatic code splitting
- **Image optimization**: Next.js Image component
- **API caching**: Revalidation strategies
- **Loading states**: Skeleton screens and spinners