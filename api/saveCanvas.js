module.exports = (req, res) => {
  try {
    var { name, canvas } = req.body;
    var canvases = localStorage.getItem("canvases");
    canvases = JSON.parse(canvases);
    var storedCanvas = canvases.find((canvas) => {
      return canvas.name === name;
    });
    if (storedCanvas) {
      storedCanvas.canvas = canvas;
    } else {
      canvases.push({ name, canvas });
    }
    localStorage.setItem("canvases", JSON.stringify(canvases));
    res.send(canvases);
  } catch (e) {
    res.status(500).send(e);
  }
};
