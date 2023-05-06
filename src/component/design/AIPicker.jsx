import React from "react";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div>
      <div className="absolute left-full ml-4 -mt-44 max-w-2xl p-2 bg-white flex flex-col">
        <textarea
          type="text"
          placeholder="Ask AI...."
          row={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <div className="flex flex-wrap gap-1 mt-6  justify-center">
          {generatingImg ? (
            <label className="btn ">Waiting for response</label>
          ) : (
            <>
              <button
                className="btn-small"
                onClick={() => handleSubmit("logo")}
              >
                AI Logo
              </button>
              <button
                className="btn-small"
                onClick={() => handleSubmit("full")}
              >
                AI Full
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPicker;
