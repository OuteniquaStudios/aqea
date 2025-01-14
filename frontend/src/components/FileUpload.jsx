import React, { useRef } from 'react';

const FileUpload = ({ onUpload }) => {
  const fileRef = useRef();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-blue-300 border-dashed rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-lg text-blue-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-sm text-blue-500">JSON file exported from Jira</p>
          </div>
          <input type="file" className="hidden" accept=".json" onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;