import React from 'react';
import { Editor } from '@monaco-editor/react';

const JiraEditor = ({ data, onGenerate, disabled }) => {
  const [editedData, setEditedData] = React.useState(JSON.stringify(data, null, 2));
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    try {
      const parsedData = JSON.parse(editedData);
      onGenerate({ tickets: parsedData });
    } catch (error) {
      console.error('Invalid JSON:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Ticket Data</h2>
      <div className="h-[500px] border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={editedData}
          onChange={setEditedData}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
          }}
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
      >
        {isGenerating ? 'Generating...' : 'Generate Test Cases'}
      </button>
    </div>
  );
};

export default JiraEditor;