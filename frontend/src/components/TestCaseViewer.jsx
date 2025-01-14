import React from 'react';

const TestCaseViewer = ({ testCases }) => {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(testCases, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-cases.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Generated Test Cases</h2>
        <button
          onClick={handleExport}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
        >
          Export JSON
        </button>
      </div>
      <div className="space-y-8">
        {testCases.map((result, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <span className="text-blue-600">{result.ticket_key}:</span> {result.ticket_summary}
            </h3>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-6 rounded-lg text-black">
              {result.test_cases}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseViewer;