export default class Logo {
  constructor () {
    this.x = 0
    this.y = 0
    this.isInTable = false
    this.isInBox = true

    this.el = document.createElement('div')
    this.el.classList.add('element')
  }
}
