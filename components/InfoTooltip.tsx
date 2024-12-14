'use client';

interface Props {
  content: string;
}

export default function InfoTooltip({ content }: Props) {
  return (
    <div className="group relative inline-block ml-2">
      <svg 
        className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-help transition-colors" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity absolute z-10 w-64 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600">
        {content}
      </div>
    </div>
  );
} 