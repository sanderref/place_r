//much variables
var canvas = document.getElementById("mainCanvas");
var btnShape = document.getElementsByClassName("shape");
var jsColorSelector = document.getElementById("jsColorSelector");
var jsColorSelectorBody = document.getElementById("jsColorSelectorBody");
var ctx = canvas.getContext("2d");
var shape = "square";
var color = "#FF0";
var seconds = 60;

//vigtig list med prik objecter
dotList = [];
function initiateDots() {
  $.ajax({
    url: '/data',
    type: 'GET',
    success: function (data) {
      for (i = 0; i < data.length - 1; i++) {
        dotList.push(data[i]);
      }
      renderDots();
    }
  });
}
initiateDots();

//load sidste opdatering
var latestCanvas = new Image();
latestCanvas.src = "../data/canvas.png";

latestCanvas.onload = () => {
  ctx.drawImage(latestCanvas, 0, 0);
}

//color selection
function setColor(colorSent) {
  color = colorSent;
}

function update(picker) {
  jsColorSelectorBody.style.background = picker.toBackground();
}

//shape selection
function setShape(shapeSent) {
  shape = shapeSent;
}

//dot definition
function Dot(x, y, color, shape) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.shape = shape;
};

//render dem dots
function renderDots() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  dotList.forEach(Dot => {
    switch (Dot.shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(Dot.x, Dot.y, 4, 0, Math.PI * 2, false);
        ctx.fillStyle = Dot.color;
        ctx.fill();
        ctx.closePath();
        break;
      case "square":
        ctx.fillStyle = Dot.color;
        ctx.fillRect(Dot.x - 6, Dot.y - 6, 8, 8);
        break;
      default:
        ctx.beginPath();
        ctx.arc(Dot.x, Dot.y, 4, 0, Math.PI * 2, false);
        ctx.fillStyle = Dot.color;
        ctx.fill();
        ctx.closePath();
    }

  });
}

/* hvad var meningen med det her?

canvas.addEventListener(
  "mouseover",
  function (evt) {
    var mousePos = getMousePos(
      canvas,
      evt,
      canvas.clientWidth,
      canvas.clientHeight
    );
    ctx.fillStyle = color;
    ctx.fillRect(mousePos.x - 6, mousePos.y - 6, 8, 8);
  },
  false
);
*/

//ajax post
function saveImage(dot) {

  $.ajax({
    url: '/data',
    type: 'POST',
    data: dot,
    success: function (data) {
      console.log(data);
      dotList = data;
    }
  });
}

canvas.addEventListener(
  "mousedown",
  function (evt) {
    var mousePos = getMousePos(
      canvas,
      evt,
      canvas.clientWidth,
      canvas.clientHeight
    );

    //push new dot to dotList
    let newDot = new Dot(mousePos.x, mousePos.y, color, shape);
    dotList.push(newDot);
    console.log(Math.round(newDot.x) + " ; " + Math.round(newDot.y));
    renderDots();

    saveImage(newDot);
  },
  false
);

function getMousePos(canvas, evt, canvasWidth, canvasHeight) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX / (canvasWidth / canvas.width) - rect.left,
    y: evt.clientY / (canvasHeight / canvas.height) - rect.top,
  };
}

function appendDot() { }

/*
NOTE:
lort = getJsColor()
Wulf, vi skal have lortet til at loope!
*/



/*  irelavant???
    xpos = window.event.screenX;
    ypos = window.event.screenY;
*/
