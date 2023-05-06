import React from "react";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="absolute left-full ml-4 w-48 p-2 bg-white flex flex-col">
      <input
        className="hidden"
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label className="btn btn-large" htmlFor="file-upload">
        Upload File
      </label>
      <p>{file === "" ? "No file selected" : file.name}</p>
      <div className="flex gap-2 mt-6 justify-center">
        <button className="btn-small" onClick={() => readFile("logo")}>
          Logo
        </button>
        <button className="btn-small" onClick={() => readFile("full")}>
          Full
        </button>
      </div>
    </div>
  );
};

export default FilePicker;
