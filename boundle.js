(function () {
  'use strict';

  class Logo {
    constructor () {
      this.x = 0;
      this.y = 0;
      this.isInTable = false;
      this.isInBox = true;

      this.el = document.createElement('div');
      this.el.classList.add('element');
    }
  }

  var button = {
    init () {
      const button = document.querySelector('.J-button');
      const box = document.querySelector('.logo-box');

      button.addEventListener('click', () => {
        const logo = new Logo();
        box.appendChild(logo.el);
      });
    }
  };

  button.init();

}());
