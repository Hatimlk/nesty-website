# Nesty - Real Estate Website

A modern, responsive real estate website built with Next.js, featuring property listings, search functionality, and an intuitive user interface.

**Live Demo**: https://nesty-website-self.vercel.app/

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Responsive](https://img.shields.io/badge/Responsive-Design-green?style=for-the-badge)

## Features

- Property listings with search and filtering
- Advanced search filters (location, price, type)
- Responsive design for all devices
- Fast performance with Next.js optimization
- Modern, clean UI design
- Image galleries with smooth viewing
- Dark mode support
- Optimized images and lazy loading

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Geist Sans (Optimized)
- **Deployment**: Vercel (Recommended)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Hatimlk/nesty-website.git
   cd nesty-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
nesty-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # UI components (button, card, etc.)
│   └── sections/         # Page sections
├── public/               # Static assets (images, icons)
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
└── config/               # Configuration files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Customization

### Styling
Modify `tailwind.config.js` to customize the design system:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ed',
          500: '#f97316',
          900: '#7c2d12',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          900: '#0f172a',
        }
      }
    }
  }
}
```

### Adding New Properties
Update property data in components or create a data file:

```typescript
// types/property.ts
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: 'house' | 'apartment' | 'villa';
}
```

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your_api_url_here
```

## Deployment

### Vercel (Recommended)
Deploy your Next.js app using the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will detect Next.js and configure optimal settings
4. Your site will be deployed!

### Other Platforms
- **Netlify**: Connect your GitHub repository
- **AWS**: Use AWS Amplify
- **DigitalOcean**: Use App Platform

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Ensure responsive design
- Add proper TypeScript types
- Test on multiple devices

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Hatim Lakrouni** - [Hatimlk](https://github.com/Hatimlk)

## Support

- Open an [issue](https://github.com/Hatimlk/nesty-website/issues) on GitHub
- Check the [Next.js docs](https://nextjs.org/docs)
- Refer to [Tailwind CSS docs](https://tailwindcss.com/docs)
