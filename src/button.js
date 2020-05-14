import Logo from './logo'

export default {
  init () {
    const button = document.querySelector('.J-button')
    const box = document.querySelector('.logo-box')

    button.addEventListener('click', () => {
      const logo = new Logo()
      box.appendChild(logo.el)
    })
  }
}