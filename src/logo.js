import { isRectangleOverlap, getBoxCoordinate } from './utils/index'
import table from './table'

export default class Logo {
  constructor () {
    this.x = 0
    this.y = 0
    this.isInTable = false
    this.isInBox = true
    this.gridId = 0
    this.isMoving = false

    this.el = document.createElement('div')
    this.el.classList.add('element')
    // this.el.draggable = true

    this.mouseDownPosition = {
      left: 0,
      top: 0
    }

    this.regListener()
  }

  regListener () {
    this.el.addEventListener('mousedown', e => {
      this.mouseDownPosition = {
        left: e.pageX,
        top: e.pageY
      }
      this.isMoving = true

      if (this.gridId > 0) {
        this.emptyGrid(this.gridId)
        this.gridId = 0
      }
    })

    this.el.addEventListener('mousemove', e => {
      if (!this.isMoving) {
        return
      }
      const { pageX, pageY } = e
      const tx = pageX - this.mouseDownPosition.left
      const ty = pageY - this.mouseDownPosition.top
      this.el.style.transform = `translate(${tx}px, ${ty}px)`
    })

    this.el.addEventListener('mouseup', e => {
      this.isMoving = false

      const elRect = this.el.getBoundingClientRect()
      const elCoordinate = [elRect.left, elRect.top, elRect.left + 80, elRect.top + 80]
      const { tableRect } = getBoxCoordinate()

      if (isRectangleOverlap(tableRect, elCoordinate)) {
        this.handleGrid(tableRect, elRect)
      } else {
        this.el.style.transform = 'none'
      }
    })
  }

  handleGrid (tableRect, elRect) {
    this.x = elRect.left - tableRect[0]
    this.y = elRect.top - tableRect[1]

    const grid = this.elInWhichGrid(this.x, this.y)
    if (grid.hasEl) {
      this.el.style.transform = 'none'
      return
    }

    this.gridId = grid.id
    
    this.el.style.position = 'absolute'
    this.el.style.left = `${grid.x1 + 10}px`
    this.el.style.top = `${grid.y1 + 10}px`
    this.el.style.transform = 'none'

    const tableEl = document.querySelector('.logo-table')
    tableEl.appendChild(this.el)

    this.x = grid.x1 + 50
    this.y = grid.y1 + 50

    this.fillGrid(this.gridId)
  }

  elInWhichGrid (x, y) {
    return table.find(v => {
      return (x < v.x2 && x > v.x1) && (y < v.y2 && y > v.y1)
    })
  }

  fillGrid (id) {
    table.forEach(v => {
      if ( v.id === id) {
        v.hasEl = true
      }
    })
  }

  emptyGrid (id) {
    table.forEach(v => {
      if ( v.id === id) {
        v.hasEl = false
      }
    })
  }
}
