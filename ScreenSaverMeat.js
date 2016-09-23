var colors = ["Black"]
var c = document.getElementById("myCanvas")
var ctx = c.getContext("2d")
var x = 0
var y = 0
var xI = 1
var yI = 1
var xLim = c.width
var yLim = c.height
var coords = new Array(xLim + 1)
for (i = 0; i < coords.length; i++) {
    coords[i] = Array(yLim + 1).fill(0);
}
var running = false
var interval;
var debugMode = true
ctx.globalAlpha=1;

//Creating backgound
//ctx.fillRect(0, 0, xLim, yLim)

//Method used to draw a single pixel, receives (x, y) and a color
function drawPixel(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
}

//Main method, this sets every pixel to the next color and runs recursively until it has finished a line
function move() {
    //Check to see if (x, y) is at an edge yet
    if (x != xLim && y != yLim) {
        drawPixel(x, y, colors[++coords[x][y] % colors.length])
        x += xI
        y += yI
        move()
    }
    //Flips x's limit and x's increment
    if (x == xLim) {
        xI *= -1
        xLim = c.width - xLim
    }

    //Flips y's limit and y's increment
    if (y == yLim) {
        yI *= -1
        yLim = c.height - yLim
    }
}

//This exists because of limitations on the setInterval() function
function callMove() {
    for (i = 0; i < 50; i++) {
        move();
    }
}

//Play/Pause fuction, allows for the canvas to be paused or played at any moment.
function onClick(element) {
    var button = element
    if (running)
        clearInterval(interval)
    else
        interval = setInterval(callMove, 5)
    running = !running
    button.innerHTML = (running) ? "Pause" : "Play"
}

//Function is ran on load, sets the color of every button
function fillButtons() {
    var buttons = document.getElementsByClassName(document.getElementById("Orange").className)
    for (i = 0; i < buttons.length; i++) {
        setColor(buttons[i])
    }
}

//Function used by fillButtons(), kept in a seperate method in case it's needed elsewhere.
function setColor(element) {
    element.style = "background-color: " + element.id + ";"
}

function clearColors() {
    while(colors.length > 1){
      var temp = document.getElementById(colors[1])
      colorClicked(temp);
    }
}

//This adds or removes a color for the colors array when its respective button is clicked
function colorClicked(element) {
    //If the color is in the array, the array is shifted to the left and the color is removed.
    if (colors.includes(element.id)) {
      for (i = 1; i < colors.length; i++) {
          if (colors[i] == element.id) {
              for (k = i; k < colors.length - 1; k++) {
                  colors[k] = colors[k + 1]
              }
              colors.pop()
          }
      }
    }
    //If the color is not already in the array, it is pushed onto the end.
    else {
        colors.push(element.id)
    }
    if (debugMode) {
        console.log(colors)
        editDebug(colors)
    }
}

function addAllColors(){
  clearColors()
  var buttons = document.getElementsByClassName(document.getElementById("Orange").className)
  for(i = 0; i < buttons.length; i++){
    colorClicked(buttons[i])
  }
}

function toggleDebug(element) {
    debugMode = !debugMode
    element.innerHTML = (debugMode) ? "Disable debug mode." : "Enable debug mode."
    editDebug((debugMode)? colors:"")

}

function editDebug(string){
  var debug = document.getElementById("debugParagraph")
  debug.innerHTML = string
}
