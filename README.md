<div align="center">
<img width="1200" height="475" alt="Nesty Real Estate Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🏠 Nesty - Real Estate Website

A modern, responsive real estate website built with Next.js, featuring property listings, search functionality, and an intuitive user interface.

![Nesty Real Estate](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

- **🏘️ Property Listings** - Browse and search through available properties
- **🔍 Advanced Search** - Filter properties by location, price, type, and more
- **📱 Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **⚡ Fast Performance** - Built with Next.js for optimal speed and SEO
- **🎨 Modern UI** - Clean and professional real estate interface
- **🖼️ Image Galleries** - High-quality property images with smooth viewing
- **🌙 Dark Mode** - Built-in dark mode support
- **⚡ Fast Loading** - Optimized images and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Geist Sans (Optimized)

## 📦 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hatimlk/nesty-website.git
   cd nesty-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the website.

## 🏗️ Project Structure

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

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. Modify the `tailwind.config.js` file to customize the design system:

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
Update the property data in the components or create a data file to manage property listings:

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

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory for environment-specific configuration:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will detect Next.js and configure optimal settings
4. Your site will be deployed!

### Other Platforms
You can also deploy on:
- **Netlify**: Connect your GitHub repository and deploy
- **AWS**: Use AWS Amplify or other services
- **DigitalOcean**: Use App Platform

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Ensure responsive design for all components
- Add proper TypeScript types for all props
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Hatim Lakouas** - [Hatimlk](https://github.com/Hatimlk)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vercel for seamless deployment

## 📞 Support

If you have any questions or need help with the setup:

- 📧 Open an [issue](https://github.com/Hatimlk/nesty-website/issues) on GitHub
- 💬 Check the [Next.js documentation](https://nextjs.org/docs)
- 🎨 Refer to [Tailwind CSS docs](https://tailwindcss.com/docs)




