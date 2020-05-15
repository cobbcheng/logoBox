export const isRectangleOverlap = function (rec1, rec2) {
  return !(rec1[2] <= rec2[0] ||
    rec1[3] <= rec2[1] ||
    rec2[2] <= rec1[0] ||
    rec2[3] <= rec1[1])
}

export function getBoxCoordinate () {
  const box = document.querySelector('.logo-box').getBoundingClientRect()
  const table = document.querySelector('.logo-table').getBoundingClientRect()

  const boxRect = [box.left, box.top, box.left + 300, box.top + 400]
  const tableRect = [
    table.left,
    table.top,
    table.left + 500,
    table.top + 500
  ]

  return {
    boxRect,
    tableRect
  }
}
