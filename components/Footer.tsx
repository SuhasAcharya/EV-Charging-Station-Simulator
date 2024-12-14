export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-sm text-gray-600">
              EV Charging Station Simulator helps businesses optimize their charging infrastructure by providing detailed power consumption analysis and usage patterns.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Multiple charging point configurations</li>
              <li>Power demand analysis</li>
              <li>Usage pattern visualization</li>
              <li>Customizable simulation parameters</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Support</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} EV Charging Station Simulator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 