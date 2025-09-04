# Khet Mitra - Agricultural Assistant

A modern web application built with React, TypeScript, and Vite for agricultural management and crop recommendations.

## Features

- 🌾 Crop recommendation system with ML backend
- 🌍 Multi-language support (i18n)
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components with shadcn/ui
- 📊 Analytics and data visualization
- 🌤️ Weather integration
- 💬 Community chat features
- 🛒 Market insights

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS, Radix UI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Backend**: Python Flask (in .zencoder/backend/)
- **ML**: Scikit-learn for crop recommendations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Python 3.8+ (for backend)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KSS-1227/khet-mitra.git
cd khet-mitra-main
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd .zencoder/backend
pip install flask flask-cors python-dotenv numpy scikit-learn
```

4. Start the development server:

```bash
npm run dev
```

5. Start the backend (in separate terminal):

```bash
cd .zencoder/backend
python app.py
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── layouts/            # Layout wrappers
├── store/              # Zustand stores
└── assets/             # Static assets

.zencoder/
└── backend/            # Python Flask backend
    ├── app.py          # Main Flask application
    ├── .env            # Environment variables
    └── *.pkl           # ML model files
```

## Backend API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /predict` - Crop recommendation prediction
- `GET /crops` - Crop information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
