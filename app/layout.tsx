import './globals.css'
import { Inter } from 'next/font/google'
import ErrorBoundary from '../components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EV Charging Station Simulator',
  description: 'Simulate and analyze EV charging station usage patterns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
