const grid = document.createElement("div")
grid.classList.add("grid")
document.body.appendChild(grid)

function createGrid(num) {
  for (let i=1; i<=num; i++) {
    const element = document.createElement("div")
    element.classList.add("div")
    grid.appendChild(element)
  }
  
  document.querySelectorAll(".div").forEach(item => {
    item.addEventListener("mouseenter", () => {
    item.setAttribute("style", "background: black;")
    })
  })
}

createGrid(256)

document.querySelector(".btn").addEventListener("click", () => size())

function size() {
  let size
  do{
    size = window.prompt("enter the size of the grid", String)
  }while(size<1 || size>100)

  document.querySelectorAll(".div").forEach(item => item.remove())
  createGrid(size*size)
  grid.style.gridTemplateColumns = "repeat(" + size + ",1fr)"
}