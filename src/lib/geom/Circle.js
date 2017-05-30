
import Vector from 'lib/Vector'

class Circle {

  constructor(position, radius) {
    this.pos = position || new Vector()
    this.r = radius
  }

  clone() {
    return new Circle(this.pos.clone(), this.r)
  }

}

export default Circle