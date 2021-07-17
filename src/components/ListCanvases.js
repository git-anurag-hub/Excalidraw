import React, { useState } from "react";

export const ListCanvases = () => {
  const [canvases, setCanvases] = useState(
    JSON.parse(window.localStorage.getItem("canvases") || "[]")
  );

  const renderCanvases = () => {
    return canvases.map((canvas) => {
      return <div>{canvas.name}</div>;
    });
  };

  return <div>{renderCanvases()}</div>;
};
