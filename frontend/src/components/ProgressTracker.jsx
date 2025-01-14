import React from 'react';

const ProgressTracker = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-700">Processing tickets...</span>
          <span className="text-blue-600">{current} of {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;