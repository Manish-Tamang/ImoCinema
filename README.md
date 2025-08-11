# ImoCinema 🎬

A modern, minimal movie discovery website built with Next.js, featuring a clean UI design and comprehensive movie search functionality.

![ImoCinema Homepage](https://github.com/Manish-Tamang/ImoCinema/blob/main/public/Screenshot%202025-08-11%20204845.png?raw=true)

![ImoCinema Search](https://github.com/Manish-Tamang/ImoCinema/blob/main/public/Screenshot%202025-08-11%20204945.png?raw=true)

## ✨ Features

- **Modern UI/UX**: Clean, minimal design with consistent color scheme and typography
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Movie Search**: Advanced search functionality with real-time results
- **Movie Discovery**: Browse trending and popular movies
- **Sticky Navigation**: Persistent header with smooth navigation
- **Skeleton Loading**: Elegant loading states with animated placeholders
- **Compact Cards**: Small, efficient movie cards for better browsing experience
- **4-Column Grid**: Optimized layout for desktop and tablet viewing

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API**: RESTful API with Next.js API Routes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Manish-Tamang/ImoCinema.git
cd ImoCinema
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Run the development server
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
ImoCinema/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── movie/             # Movie detail pages
│   ├── search/            # Search functionality
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   ├── ui/                # UI component library
│   ├── header.tsx         # Navigation header
│   ├── movie-card.tsx     # Movie display cards
│   └── footer.tsx         # Site footer
├── lib/                    # Utility functions
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🎨 Design Principles

- **Minimalism**: Clean, uncluttered interface
- **Consistency**: Unified color palette and typography
- **Accessibility**: High contrast and readable fonts
- **Performance**: Optimized loading with skeleton states
- **Responsiveness**: Adaptive layouts for all devices

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## 📱 Responsive Breakpoints

- **Mobile**: 2 columns (grid-cols-2)
- **Tablet**: 3 columns (sm:grid-cols-3) 
- **Desktop**: 4 columns (md:grid-cols-4)

## 🎯 Key Components

### Header
- Sticky navigation with minimal design
- Responsive mobile menu
- Consistent branding and navigation

### Movie Cards
- Compact, efficient design
- Hover effects and transitions
- Optimized image loading

### Search Interface
- Clean search form with minimal styling
- Real-time search results
- Skeleton loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Manish Tamang**
- GitHub: [@Manish-Tamang](https://github.com/Manish-Tamang)
- Website: [manishtamang.com](https://www.manishtamang.com)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible component primitives
- Lucide for beautiful icons

---

⭐ Star this repository if you found it helpful!
