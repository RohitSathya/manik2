import React from 'react';

const UploadButton = ({ onFileUpload }) => {
  return (
    <div className="mb-4">
      <label className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">
        Upload Excel Sheet
        <input type="file" hidden onChange={(e) => onFileUpload(e.target.files[0])} />
      </label>
    </div>
  );
};

export default UploadButton;
