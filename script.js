const grid = document.querySelector(".grid")
const num = document.querySelector(".num")
const color = document.querySelector("#color")
const eraser = document.querySelector(".erase")
const gap = document.querySelector(".gap")
const rain = document.querySelector(".rainbow")
let thecolor = "#000000"
let down = false
let size = 16
let gap_size = 0
let rainbow = false

createGrid(256)

color.addEventListener("change", () => {
  thecolor = color.value
})

function createGrid(num) {
  for (let i=1; i<=num; i++) {
    const element = document.createElement("div")
    element.classList.add("div")
    grid.appendChild(element)
  }
  
  document.querySelectorAll(".div").forEach(item => {
    item.addEventListener("mouseover", () => {
      if(down){
        if(rainbow){
          let r = Math.floor(Math.random() * 256)
          let g = Math.floor(Math.random() * 256)
          let b = Math.floor(Math.random() * 256)
          item.setAttribute("style", "background: " + rgbToHex(r,g,b) + ";")
        }else{
          item.setAttribute("style", "background: " + thecolor + ";")
        }
      }
    })
    item.addEventListener("mousedown", () => {
      if(rainbow){
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        item.setAttribute("style", "background: " + rgbToHex(r,g,b) + ";")
      }else{
        item.setAttribute("style", "background: " + thecolor + ";")
      }
    })
  })
}


document.querySelector(".resize").addEventListener("click", () => changeSize(size))
eraser.addEventListener("click", () => {thecolor = "#FAEBD7"})
rain.addEventListener("click", () => {
  if(rainbow == false){
    rainbow = true
    rain.textContent = "Rainbow: On"
    rain.setAttribute("style", "background: green;")
  }else{
    rainbow = false
    rain.textContent = "Rainbow: Off"
    rain.setAttribute("style", "background: red;")
  }
})

document.body.onmousedown = function() {
  down = true
}

document.body.onmouseup = function() {
  down = false
}

document.querySelector(".clear").addEventListener("click", () => {
  document.querySelectorAll(".div").forEach(item => item.setAttribute("style", "background: #FAEBD7;"))
})

gap.addEventListener("click", () => {
  if(gap_size == 0){
    gap_size = 1
    grid.setAttribute("style", "gap:" + gap_size + "px;")
    gap.textContent = "Outline: On"
    gap.setAttribute("style", "background: green;")
  }else{
    gap_size = 0
    grid.setAttribute("style", "gap:" + gap_size + "px;")
    gap.textContent = "Outline: Off"
    gap.setAttribute("style", "background: red;")
  }
})

document.querySelector(".size-up").addEventListener("click", () => {
  num.textContent++
  size = num.textContent
  if(size>100){
    num.textContent--
  }
})

document.querySelector(".size-dn").addEventListener("click", () => {
  num.textContent--
  size = num.textContent
  if(size<0){
    num.textContent++
  }
})

function changeSize(size) {
  document.querySelectorAll(".div").forEach(item => item.remove())
  createGrid(size*size)
  grid.style.gridTemplateColumns = "repeat(" + size + ",1fr)"
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function changeColor(item) {
  if(down){
    if(rainbow){
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      item.setAttribute("style", "background: " + rgbToHex(r,g,b) + ";")
    }else{
      item.setAttribute("style", "background: " + thecolor + ";")
    }
  }
}