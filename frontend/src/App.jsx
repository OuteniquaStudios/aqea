import { useState } from 'react';
import axios from 'axios';
import { Editor } from '@monaco-editor/react';
import { generateTestCases } from './services/api';

function App() {
  const [jiraData, setJiraData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [testCases, setTestCases] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setJiraData(response.data.tickets);
      setEditedData(JSON.stringify(response.data.tickets, null, 2));
    } catch (err) {
      setError('Error uploading file: ' + err.message);
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Start SSE connection for progress updates
      const eventSource = new EventSource('http://localhost:8000/status');
      
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setProgress({
          current: data.current,
          total: data.total
        });
        
        if (data.status === 'completed') {
          eventSource.close();
        }
      };

      // Send data for test case generation
      const parsedData = JSON.parse(editedData);
      const response = await generateTestCases(parsedData, 'prompts/test_case_prompt.txt', 'ollama/mistral', 0.7);

      setTestCases(response);
    } catch (err) {
      setError('Error generating test cases: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (!testCases) return;

    const blob = new Blob([JSON.stringify(testCases, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_test_cases.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900">Jira Test Case Generator</h1>
          <p className="mt-2 text-gray-600">Upload Jira tickets to generate comprehensive test cases</p>
        </header>

        {/* File Upload */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">JSON file exported from Jira</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept=".json"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* JSON Editor */}
        {editedData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Ticket Data</h2>
            <div className="h-[500px] border rounded">
              <Editor
                height="100%"
                defaultLanguage="json"
                value={editedData}
                onChange={setEditedData}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Test Cases'}
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {isGenerating && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing tickets...</span>
                <span>{progress.current} of {progress.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Test Cases Display */}
        {testCases && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Test Cases</h2>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Export JSON
              </button>
            </div>
            <div className="space-y-6">
              {testCases.map((result, index) => (
                <div key={index} className="border rounded p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {result.ticket_key}: {result.ticket_summary}
                  </h3>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                    {result.test_cases}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;