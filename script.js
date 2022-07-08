const grid = document.querySelector(".grid")
const sizeup = document.querySelector(".size-up")
const sizedown = document.querySelector(".size-dn")
const num = document.querySelector(".num")
const resize = document.querySelector(".resize")
const buttons = document.querySelectorAll(".btn")
const color = document.querySelector(".default")
const rain = document.querySelector(".rainbow")
const eraser = document.querySelector(".erase")
const gap = document.querySelector(".gap")
const clear = document.querySelector(".clear")
const picker = document.querySelector("#color")
let thecolor = "#000000"
let mode = "color"
let down = false
let size = 16
let gap_size = 0

createGrid(256)

sizeup.addEventListener("click", () => sizeUp())
sizedown.addEventListener("click", () => sizeDn())
resize.addEventListener("click", () => changeSize(size))
color.addEventListener("click", () => changeDef())
rain.addEventListener("click", () => changeRainbow())
eraser.addEventListener("click", () => changeEraser())
gap.addEventListener("click", () => addGap())
clear.addEventListener("click", () => clearAll())
picker.addEventListener("change", () => thecolor = picker.value)

document.body.onmousedown = function() {
  down = true
}

document.body.onmouseup = function() {
  down = false
}

buttons.forEach(item => {
  item.addEventListener("click", () => {
    num.textContent = item.textContent.split(" ").slice(1)
    size = num.textContent
    changeSize(size)
  })
})

function createGrid(num) {
  for (let i=1; i<=num; i++) {
    const element = document.createElement("div")
    element.classList.add("div")
    element.addEventListener("mouseover", () => changeColor(element))
    element.addEventListener("mousedown", () => {down = true; changeColor(element)})
    grid.appendChild(element)
  }
}

function sizeUp() {
  num.textContent++
  size = num.textContent
  if(size>100){
    num.textContent--
  }
}

function sizeDn() {
  num.textContent--
  size = num.textContent
  if(size<0){
    num.textContent++
  }
}

function changeSize(size) {
  document.querySelectorAll(".div").forEach(item => item.remove())
  createGrid(size*size)
  grid.style.gridTemplateColumns = "repeat(" + size + ",1fr)"
}

function changeDef() {
  mode = "color"
  rain.textContent = "Rainbow: Off"
  rain.style.background = "red"
  eraser.textContent = "Eraser: Off"
  eraser.style.background = "red"
  color.textContent = "color: On"
  color.style.background = "green"
}

function changeRainbow() {
  mode = "rainbow"
  rain.textContent = "Rainbow: On"
  rain.style.background = "green"
  eraser.textContent = "Eraser: Off"
  eraser.style.background = "red"
  color.textContent = "color: Off"
  color.style.background = "red"
}

function changeEraser() {
  mode = "eraser"
  rain.textContent = "Rainbow: Off"
  rain.style.background = "red"
  eraser.textContent = "Eraser: On"
  eraser.style.background = "green"
  color.textContent = "color: Off"
  color.style.background = "red"
}

function addGap(){
  if(gap_size == 0){
    gap_size = 1
    grid.style.gap = gap_size + "px"
    gap.textContent = "Outline: On"
    gap.style.background = "green"
  }else{
    gap_size = 0
    grid.style.gap = gap_size + "px"
    gap.textContent = "Outline: Off"
    gap.style.background = "red"
  }
}

function clearAll(){
  document.querySelectorAll(".div").forEach(item => {
    item.style.background = "#FAEBD7" 
    item.style.borderColor = "#FAEBD7"
  })
}

function changeColor(element) {
  if(down){
    if(mode == "rainbow"){
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      element.style.background = rgbToHex(r,g,b)
      element.style.borderColor = rgbToHex(r,g,b)
    }else if(mode == "color"){
      element.style.background = thecolor
      element.style.borderColor = thecolor
    }else{
      element.style.background = "#FAEBD7"
      element.style.borderColor = "#FAEBD7"
    }
  }
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}