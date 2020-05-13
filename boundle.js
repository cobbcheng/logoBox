(function () {
  'use strict';

  class Logo {
    constructor (x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    move (x, y) {
      this.x = x;
      this.y = y;
    }
  }

  console.log(1);

  const logo = new Logo();

  console.log(logo);

}());
