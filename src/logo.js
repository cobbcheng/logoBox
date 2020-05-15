export default class Logo {
  constructor () {
    this.x = 0
    this.y = 0
    this.isInTable = false
    this.isInBox = true
    this.tableId = 1
    this.isMoving = false

    this.el = document.createElement('div')
    this.el.classList.add('element')
    this.el.draggable = true

    this.regListener()
  }

  setPositionInTable (id) {
    this.tableId = id
  }

  regListener () {
    this.el.addEventListener('mousedown', e => {
      console.log(e)
      this.isMoving = true
    })

    this.el.addEventListener('mousemove', e => {
      if (this.isMoving) {
        this.el.style.transform = `translate(${e.movementX}, ${e.movementY})`
      }
    })

    this.el.addEventListener('mouseup', e => {
      this.isMoving = false
    })
  }
}
