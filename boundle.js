(function () {
  'use strict';

  class Logo {
    constructor () {
      this.x = 0;
      this.y = 0;
      this.isInTable = false;
      this.isInBox = true;
      this.tableId = 1;
      this.isMoving = false;

      this.el = document.createElement('div');
      this.el.classList.add('element');
      this.el.draggable = true;

      this.regListener();
    }

    setPositionInTable (id) {
      this.tableId = id;
    }

    regListener () {
      this.el.addEventListener('mousedown', e => {
        console.log(e);
        this.isMoving = true;
      });

      this.el.addEventListener('mousemove', e => {
        if (this.isMoving) {
          this.el.style.transform = `translate(${e.movementX}, ${e.movementY})`;
        }
      });

      this.el.addEventListener('mouseup', e => {
        this.isMoving = false;
      });
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

  // 描述网格
  class Unit {
    constructor (x, y, id) {
      this.x1 = x;
      this.y1 = y;
      this.x2 = x + 100;
      this.y2 = y + 100;
      this.id = id;
    }
  }

  const table = new Array(5*5);

  const init = () => {
    let indexX = 0;
    let indexY = 0;

    for (let i = 0; i < table.length; i++) {
      const x = 100*indexX;
      const y = 100*indexY;
      const id = i + 1;

      if (indexX < 4) {
        indexX++;
      } else {
        indexX = 0;
        indexY++;
      }

      table[i] = new Unit(x, y, id);
    }

    console.log(table);
  };

  button.init();
  init();

}());
