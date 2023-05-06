import React from "react";
import { useSnapshot } from "valtio";
import { SketchPicker } from "react-color";
import state from "../../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute left-full ml-4 z-20">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
        presetColors={[
          "#ccc",
          "#EFBD4E",
          "#80C670",
          "#726DE8",
          "#ffff",
          "#2CCCE4",
          "#FF8A65",
          "#7098DA",
          "#C19277",
          "#512314",
        ]}
      />
    </div>
  );
};

export default ColorPicker;
