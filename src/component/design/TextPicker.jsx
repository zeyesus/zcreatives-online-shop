import React from "react";

const TextPicker = ({ textLogo, setTextLogo, handleSubmit }) => {
  return (
    <div>
      <div className="absolute left-full ml-4 -mt-44 max-w-2xl p-2 bg-white flex flex-col">
        <textarea
          type="text"
          placeholder="Ask AI...."
          row={5}
          value={textLogo}
          onChange={(e) => setTextLogo(e.target.value)}
        ></textarea>

        <div className="flex flex-wrap gap-1 mt-6  justify-center">
          <button className="btn-small" onClick={() => {}}>
            Text Logo
          </button>
          <button className="btn-small" onClick={() => {}}>
            Text Full
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextPicker;
