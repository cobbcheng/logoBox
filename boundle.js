(function () {
  'use strict';

  const isRectangleOverlap = function (rec1, rec2) {
    return !(rec1[2] <= rec2[0] ||
      rec1[3] <= rec2[1] ||
      rec2[2] <= rec1[0] ||
      rec2[3] <= rec1[1])
  };

  function getBoxCoordinate () {
    const box = document.querySelector('.logo-box').getBoundingClientRect();
    const table = document.querySelector('.logo-table').getBoundingClientRect();

    const boxRect = [box.left, box.top, box.left + 300, box.top + 400];
    const tableRect = [
      table.left,
      table.top,
      table.left + 500,
      table.top + 500
    ];

    return {
      boxRect,
      tableRect
    }
  }

  // 描述网格
  class Grid {
    constructor (x, y, id) {
      this.x1 = x;
      this.y1 = y;
      this.x2 = x + 100;
      this.y2 = y + 100;
      this.id = id;
      this.hasEl = false;
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

      table[i] = new Grid(x, y, id);
    }
  };

  class Logo {
    constructor () {
      this.x = 0;
      this.y = 0;
      this.isInTable = false;
      this.isInBox = true;
      this.gridId = 0;
      this.isMoving = false;

      this.el = document.createElement('div');
      this.el.classList.add('element');
      // this.el.draggable = true

      this.mouseDownPosition = {
        left: 0,
        top: 0
      };

      this.regListener();
    }

    regListener () {
      this.el.addEventListener('mousedown', e => {
        this.mouseDownPosition = {
          left: e.pageX,
          top: e.pageY
        };
        this.isMoving = true;

        if (this.gridId > 0) {
          this.emptyGrid(this.gridId);
          this.gridId = 0;
        }
      });

      this.el.addEventListener('mousemove', e => {
        if (!this.isMoving) {
          return
        }
        const { pageX, pageY } = e;
        const tx = pageX - this.mouseDownPosition.left;
        const ty = pageY - this.mouseDownPosition.top;
        this.el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      this.el.addEventListener('mouseup', e => {
        this.isMoving = false;

        const elRect = this.el.getBoundingClientRect();
        const elCoordinate = [elRect.left, elRect.top, elRect.left + 80, elRect.top + 80];
        const { tableRect } = getBoxCoordinate();

        if (isRectangleOverlap(tableRect, elCoordinate)) {
          this.handleGrid(tableRect, elRect);
        } else {
          this.el.style.transform = 'none';
        }
      });
    }

    handleGrid (tableRect, elRect) {
      this.x = elRect.left - tableRect[0];
      this.y = elRect.top - tableRect[1];

      const grid = this.elInWhichGrid(this.x, this.y);
      if (grid.hasEl) {
        this.el.style.transform = 'none';
        return
      }

      this.gridId = grid.id;
      
      this.el.style.position = 'absolute';
      this.el.style.left = `${grid.x1 + 10}px`;
      this.el.style.top = `${grid.y1 + 10}px`;
      this.el.style.transform = 'none';

      const tableEl = document.querySelector('.logo-table');
      tableEl.appendChild(this.el);

      this.x = grid.x1 + 50;
      this.y = grid.y1 + 50;

      this.fillGrid(this.gridId);
    }

    elInWhichGrid (x, y) {
      return table.find(v => {
        return (x < v.x2 && x > v.x1) && (y < v.y2 && y > v.y1)
      })
    }

    fillGrid (id) {
      table.forEach(v => {
        if ( v.id === id) {
          v.hasEl = true;
        }
      });
    }

    emptyGrid (id) {
      table.forEach(v => {
        if ( v.id === id) {
          v.hasEl = false;
        }
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

  button.init();
  init();

}());
