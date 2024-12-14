# EV Charging Station Simulator

A sophisticated web application for simulating and analyzing EV charging station infrastructure.

## Features

- Multiple charging point configurations (11kW, 22kW, 50kW)
- Real-time power consumption analytics
- Interactive charts and visualizations
- Customizable arrival patterns
- Detailed usage statistics

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ev-charging-simulator.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- React for UI components

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── types/                 # TypeScript types
├── utils/                 # Utility functions
└── public/               # Static assets
```

## Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Start production server: `npm start`

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License - see LICENSE file for details