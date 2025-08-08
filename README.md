# HA Component Kit

A modern React component library for building beautiful, responsive dashboards and applications.

## 🏠 Homeboard Dashboard

This repository includes a complete **Homeboard Dashboard** application with:
- **iCloud Calendar Sync** via CalDAV
- **Local Photo Indexing** with File System Access API
- **Offline-First Design** with IndexedDB storage
- **Skylight/Hearth Aesthetics** optimized for 4K touchscreens
- **Idle Photo Frame Mode** with weather overlay

### 🚀 Quick Start - Homeboard Dashboard

```bash
# Start the Homeboard dashboard (recommended)
npm run dev

# Or start from the app directory
cd app && npm run dev
```

The dashboard will be available at: **http://localhost:3000**

### 🎨 Component Library Development

```bash
# Start Storybook for component development
npm run dev:storybook
```

Storybook will be available at: **http://localhost:6006**

## 🚀 Features

- **Modern React Components**: Built with React 19+ and TypeScript
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Customizable**: Extensive theming and styling options
- **Accessible**: WCAG compliant components
- **Type Safe**: Full TypeScript support

## 📦 Packages

### @hakit/components
A comprehensive collection of React components for building dashboards and applications.

**Key Components:**
- **CalendarCard**: Interactive calendar with date selection
- **TodoCard**: Task management with add/complete/delete functionality
- **PhotoSlideshowCard**: Image slideshow with navigation controls
- **StickyNotesCard**: Colorful sticky notes with rich text support
- **TimeCard**: Real-time clock with timezone support
- **Layout Components**: Row, Column, CardBase for flexible layouts

### @hakit/core
Core utilities and hooks for building applications.

**Key Features:**
- **useHass**: Simplified hook for application state management
- **useConfig**: Configuration management
- **ThemeProvider**: Global theming system
- **Routing**: Simple routing utilities

### @hakit/create-hakit
CLI tool for quickly scaffolding new dashboard applications.

## 🛠️ Quick Start

### Using the CLI
```bash
npx @hakit/create-hakit my-dashboard
cd my-dashboard
npm start
```

### Manual Setup
```bash
npm install @hakit/components @hakit/core
```

```tsx
import { ThemeProvider, Column, Row, TimeCard, CalendarCard } from '@hakit/components';

function App() {
  return (
    <ThemeProvider>
      <Column fullWidth fullHeight gap="16px">
        <Row gap="16px">
          <TimeCard title="Current Time" />
          <CalendarCard title="Calendar" />
        </Row>
      </Column>
    </ThemeProvider>
  );
}
```

## 🎨 Theming

The library includes a comprehensive theming system:

```tsx
import { ThemeProvider } from '@hakit/components';

<ThemeProvider
  globalStyles={`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
  `}
/>
```

## 📱 Responsive Design

All components are built with responsive design in mind:

```tsx
<Row gap="16px" css={`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`}>
  <TimeCard />
  <CalendarCard />
</Row>
```

## 🔧 Customization

Components support extensive customization through props and CSS:

```tsx
<CalendarCard 
  title="My Calendar"
  cssStyles={`
    .calendar-grid {
      background-color: #f0f0f0;
    }
  `}
/>
```

## 📚 Documentation

Visit our [Storybook](https://shannonhochkins.github.io/ha-component-kit) for interactive examples and documentation.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Emotion](https://emotion.sh/)
- Icons from [Iconify](https://iconify.design/)


