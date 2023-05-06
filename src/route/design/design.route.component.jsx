import React, { useState } from "react";
import { useSnapshot } from "valtio";
import config from "../../config/config";
import state from "../../store";
import { EditorTabs, FilterTabs, DecalTypes } from "../../config/constants";
import { downloadCanvasToImage, reader } from "../../config/helpers";
import {
  AIPicker,
  FilePicker,
  ColorPicker,
  TextPicker,
} from "../../component/design";
import Tab from "../../component/design/tab";
import CanvasModel from "../../component/canvas";
import { download } from "../../assets";
const DesignRoute = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [textLogo, setTextLogo] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditor, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //show tab content depending on the activeTab
  const generteTabContent = () => {
    switch (activeEditor) {
      case "colorpicker":
        return <ColorPicker />;
      case "textpicker":
        return <TextPicker textLogo={textLogo} setTextLogo={setTextLogo} />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("please enter a prompt");
    try {
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log(data);
      console.log("this is farom design route page ~ ~ ~~ ~ ~");
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    // after setting the state activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return { ...prevState, [tabName]: !prevState[tabName] };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  return (
    <div className="relative">
      <div className="absolute z-10 text-black flex flex-col gap-6 top-1/3 bg-brightYellow p-2">
        {EditorTabs.map((item) => {
          return (
            <Tab
              key={item.name}
              tab={item}
              handleClick={() => {
                setActiveEditorTab(item.name);
              }}
            />
          );
        })}
        {generteTabContent()}
      </div>
      <div className="md:h-screen h-72 ">
        <CanvasModel />
      </div>

      <div className="absolute md:bottom-28 bottom-10 left-2/4 flex justify-center gap-2  bg-gray-200 p-2">
        {FilterTabs.map((item) => {
          return (
            <>
              <Tab
                key={item.name}
                tab={item}
                isFilterTab
                isActiveTab={activeFilterTab[item.name]}
                handleCllick={() => {
                  handleActiveFilterTab(item.name);
                }}
              />
            </>
          );
        })}
        <button className="download-btn" onClick={downloadCanvasToImage}>
          <img
            src={download}
            alt="download_image"
            className="w-7 object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default DesignRoute;
