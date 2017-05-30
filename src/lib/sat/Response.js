
import Vector from 'lib/Vector'

class Response {

  constructor() {
    this.a = null
    this.b = null
    this.overlapV = new Vector()
    this.overlapN = new Vector()
    this.clear()
  }

  clear() {
    this.aInB = true
    this.bInA = true
    this.overlap = Number.MAX_VALUE
  }

}

export default Response