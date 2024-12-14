'use client';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  onShowAll: () => void;
}

export default function DateRangeSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
  onShowAll
}: Props) {
  const formatDate = (date: Date | undefined | null): string => {
    if (!date || isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (dateStr: string, setter: (date: Date | null) => void) => {
    if (!dateStr) {
      setter(null);
      return;
    }
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      setter(date);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <input
              type="date"
              value={formatDate(startDate)}
              min={formatDate(minDate)}
              max={formatDate(endDate)}
              onChange={(e) => handleDateChange(e.target.value, onStartDateChange)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-3 pr-8"
            />
            {startDate && (
              <button
                onClick={() => onStartDateChange(null)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <input
              type="date"
              value={formatDate(endDate)}
              min={formatDate(startDate)}
              max={formatDate(maxDate)}
              onChange={(e) => handleDateChange(e.target.value, onEndDateChange)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-3 pr-8"
            />
            {endDate && (
              <button
                onClick={() => onEndDateChange(null)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onShowAll}
        className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        Show All Data
      </button>
    </div>
  );
} 