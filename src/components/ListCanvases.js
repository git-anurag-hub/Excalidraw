import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../history";

const ListCanvases = () => {
  const [canvases, setCanvases] = useState(
    JSON.parse(window.localStorage.getItem("canvases") || "[]")
  );
  const [toggle, setToggle] = useState(false);
  const [canvas, setCanvas] = useState("");

  const renderCanvases = () => {
    return canvases.map((canvas) => {
      return (
        <Link class="mt-2 flex border rounded p-2" to={"/canvas/" + canvas.name}>
          {canvas.name}
        </Link>
      );
    });
  };

  return (
    <div class="m-10">
      <div class="flex justify-between">
        <div class="font-semibold text-lg">List of Canvases</div>
        {!toggle ? (
          <button
            class="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => {
              setToggle(true);
            }}
          >
            New Canvas
          </button>
        ) : (
          <form>
            <input
              type="text"
              class="px-2 py-1 rounded border ml-2"
              placeholder="Name of Canvas"
              required
              value={canvas}
              onChange={(e) => setCanvas(e.target.value)}
            ></input>
            <button
              class="bg-green-500 text-white px-2 py-1 rounded ml-2"
              type="submit"
              onClick={() => {
                if (canvas !== "") {
                  history.push("/canvas/" + canvas);
                }
              }}
            >
              Continue
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => {
                setToggle(false);
              }}
            >
              Exit
            </button>
          </form>
        )}
      </div>
      <div class="mt-5">{renderCanvases()}</div>
    </div>
  );
};

export default ListCanvases;
