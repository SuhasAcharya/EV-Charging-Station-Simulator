'use client';

interface DocSection {
  title: string;
  content: string;
}

const documentation: DocSection[] = [
  {
    title: "Getting Started",
    content: "The EV Charging Station Simulator helps you plan and optimize your charging infrastructure. Start by adding charging points and configuring their power levels."
  },
  {
    title: "Charging Points",
    content: "Add multiple charging points with different power levels (11kW, 22kW, or 50kW). Each point can be configured with a specific count, allowing you to simulate various infrastructure setups."
  },
  {
    title: "Arrival Probability",
    content: "The arrival multiplier (20-200%) affects how frequently EVs arrive for charging. Higher values simulate busier locations with more frequent arrivals."
  },
  {
    title: "Power Consumption",
    content: "Set the average car consumption in kWh to match your typical user base. This affects the duration of charging sessions and total energy consumption."
  },
  {
    title: "Simulation Results",
    content: "View detailed analytics including total energy consumption, peak power demand, and charging events. Charts visualize hourly power usage and daily statistics."
  }
];

export default function Documentation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documentation.map((section, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {section.title}
          </h3>
          <p className="text-gray-600">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
} 