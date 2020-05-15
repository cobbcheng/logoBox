import Unit from './unit'

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

    table[i] = new Unit(x, y, id)
  }

  console.log(table)
}

export default table
