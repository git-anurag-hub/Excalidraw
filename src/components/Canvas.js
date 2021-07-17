import React, { useEffect, useState, useRef } from "react";
import Excalidraw from "@excalidraw/excalidraw";
import axios from "axios";

const Canvas = () => {
  const excalidrawRef = useRef(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [theme, setTheme] = useState("light");

  const test = async () => {
    let res = await axios.get("/api/main");
    console.log(res);
  };

  return (
    <div>
      <div class="m-10 flex justify-center">
        <button
          onClick={() => {
            test();
          }}
        >
          Test
        </button>
        <button
          className={`border rounded py-1 px-3 text-white m-2 ${
            viewModeEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => setViewModeEnabled(!viewModeEnabled)}
        >
          View Mode
        </button>
        <button
          className={`border rounded py-1 px-3 text-white m-2 ${
            zenModeEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => setZenModeEnabled(!zenModeEnabled)}
        >
          Zen Mode
        </button>
        <button
          className={`border rounded py-1 px-3 text-white m-2 ${
            gridModeEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => setGridModeEnabled(!gridModeEnabled)}
        >
          Grid mode
        </button>
        <button
          className={`border rounded py-1 px-3 m-2 ${
            theme == "light" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={() => {
            if (theme == "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
        >
          Theme
        </button>
        <button
          className="border rounded py-1 px-3 bg-red-500 text-white m-2"
          onClick={() => {
            excalidrawRef.current.resetScene();
          }}
        >
          Reset
        </button>
      </div>

      <div class="border-gray-900 border rounded-lg m-10" style={{ height: "800px" }}>
        <Excalidraw
          ref={excalidrawRef}
          onChange={(elements, state) => console.log("Elements :", elements, "State : ", state)}
          onCollabButtonClick={() => window.alert("Not Implemented!")}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default Canvas;
