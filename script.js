const grid = document.querySelector(".grid")

function createGrid(num) {
  for (let i=1; i<=num; i++) {
    const element = document.createElement("div")
    grid.appendChild(element)
  }
}

createGrid(256)