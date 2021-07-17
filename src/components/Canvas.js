import React, { Component } from "react";
import Excalidraw, { exportToBlob } from "@excalidraw/excalidraw";
import { Link } from "react-router-dom";

export default class Canvass extends Component {
  constructor(props) {
    super(props);
    this.excalidrawRef = React.createRef();
  }

  state = {
    viewModeEnabled: false,
    zenModeEnabled: false,
    gridModeEnabled: false,
    theme: "light",
    initialData: null,
  };

  componentDidMount = async () => {
    // fetching initial data for canvas
    var canvases = window.localStorage.getItem("canvases");
    if (!canvases) {
      canvases = "[]";
    }
    canvases = JSON.parse(canvases);
    var storedCanvas = canvases.find((canvas) => {
      return canvas.name === this.props.match.params.name;
    });
    this.setState({
      initialData: storedCanvas ? { elements: storedCanvas.canvas.elements } : {},
    });
  };

  // updating the localstorage for the canvas
  // used handle change for updaing rahter than timer change because what if the user is idling for a while then it will be updated in every 10 sec
  // rather than that it will be updated only when the user is actively working on the canvas
  // we can also improve the performance on handleChange by using the other functions in exciledraw library
  handleChange = async (elements, state) => {
    var canvas = { elements, appState: state };
    // fetcing from localstorage
    var canvases = window.localStorage.getItem("canvases");
    if (!canvases) {
      canvases = "[]";
    }
    const name = this.props.match.params.name;
    // converting to json
    canvases = JSON.parse(canvases);
    var storedCanvas = canvases.find((canvas) => {
      return canvas.name === name;
    });
    // updating the localstorage
    if (storedCanvas) {
      storedCanvas.canvas = canvas;
    } else {
      canvases.push({ name, canvas });
    }
    window.localStorage.setItem("canvases", JSON.stringify(canvases));
  };

  // download the canvas
  handleSave = async () => {
    // convert to blob
    const blob = await exportToBlob({
      elements: this.excalidrawRef.current.getSceneElements(),
      mimeType: "image/png",
    });
    // download the blob in form of PNG
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "Image.png";
    a.click();
  };

  render() {
    if (this.state.initialData === null) {
      return <div>Loading..</div>;
    }
    return (
      <div>
        <div class="m-10 flex justify-center">
          <Link to="/" className={`border rounded py-1 px-3 text-white m-2 bg-green-500`}>
            Back to home
          </Link>
          <button
            className={`border rounded py-1 px-3 text-white m-2 ${
              this.state.viewModeEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => this.setState({ viewModeEnabled: !this.state.viewModeEnabled })}
          >
            View Mode
          </button>
          <button
            className={`border rounded py-1 px-3 text-white m-2 ${
              this.state.zenModeEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => this.setState({ zenModeEnabled: !this.state.zenModeEnabled })}
          >
            Zen Mode
          </button>
          <button
            className={`border rounded py-1 px-3 text-white m-2 ${
              this.state.gridModeEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => this.setState({ gridModeEnabled: !this.state.gridModeEnabled })}
          >
            Grid mode
          </button>
          <button
            className={`border rounded py-1 px-3 m-2 ${
              this.state.theme == "light" ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => {
              this.setState({ theme: this.state.theme == "light" ? "dark" : "light" });
            }}
          >
            Theme
          </button>
          <button
            className="border rounded py-1 px-3 bg-red-500 text-white m-2"
            onClick={() => {
              this.excalidrawRef.current.resetScene();
            }}
          >
            Reset
          </button>
          <button className={`border rounded py-1 px-3 m-2`} onClick={() => this.handleSave()}>
            Download
          </button>
        </div>
        <div class="border-gray-900 border rounded-lg m-10" style={{ height: "800px" }}>
          <Excalidraw
            ref={this.excalidrawRef}
            initialData={this.state.initialData}
            onChange={(elements, state) => this.handleChange(elements, state)}
            onCollabButtonClick={() => window.alert("Not Implemented!")}
            viewModeEnabled={this.state.viewModeEnabled}
            zenModeEnabled={this.state.zenModeEnabled}
            gridModeEnabled={this.state.gridModeEnabled}
            theme={this.state.theme}
          />
        </div>
      </div>
    );
  }
}
