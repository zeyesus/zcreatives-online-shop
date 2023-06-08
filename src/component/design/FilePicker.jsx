import React from "react";
import { toast } from "react-toastify";

const FilePicker = ({ file, setFile, readFile }) => {
  const handleFileUpload = (event) => {
    const fileUploaded = event.target.files[0];
    const acceptedFileTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (fileUploaded.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      event.target.value = "";
    } else if (!acceptedFileTypes.includes(fileUploaded.type)) {
      toast.error("File type must be in jpeg, png or svg");
      event.target.value = "";
    } else {
      // handle file upload
      setFile(fileUploaded);
    }
  };
  return (
    <div className="absolute left-full ml-4 w-48 p-2 bg-white flex flex-col">
      <input
        className="hidden"
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
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
