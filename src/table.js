// 描述网格
class Grid {
  constructor (x, y, id) {
    this.x1 = x
    this.y1 = y
    this.x2 = x + 100
    this.y2 = y + 100
    this.id = id
    this.hasEl = false
  }
}


const table = new Array(5*5)

export const init = () => {
  let indexX = 0
  let indexY = 0

  for (let i = 0; i < table.length; i++) {
    const x = 100*indexX
    const y = 100*indexY
    const id = i + 1

    if (indexX < 4) {
      indexX++
    } else {
      indexX = 0
      indexY++
    }

    table[i] = new Grid(x, y, id)
  }
}

export default table
