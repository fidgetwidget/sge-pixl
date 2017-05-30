// 
// A basic Vector class
// with some optimized methods for unit vectors
// 

class Vector {

  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  copy(v) {
    this.x = v.x
    this.y = v.y
    return this
  }

  perp() {
    let x = this.x
    this.x = this.y
    this.y = -x
    return this
  }

  rotate(angle) {
    let x = this.x
    let y = this.y
    this.x = x * Math.cos(angle) - y * Math.sin(angle)
    this.y = x * Math.sin(angle) + y * Math.cos(angle)
    return this
  }

  reverse() {
    this.x = -this.x
    this.y = -this.y
    return this
  }

  normalize() {
    let d = this.len
    if (d > 0) {
      this.x = this.x / d
      this.y = this.y / d
    }
    return this
  }

  add(v) {
    if (typeof v === 'number') {
      this.x += v
      this.y += v
      return this
    }
    this.x += v.x
    this.y += v.y
    return this
  }

  subtract(v) {
    if (typeof v === 'number') {
      this.x -= v
      this.y -= v
      return this
    }
    this.x -= v.x
    this.y -= v.y
    return this
  }

  multiply(v) {
    if (typeof v === 'number') {
      this.x *= v
      this.y *= v
      return this
    }
    this.x *= v.x
    this.y *= v.y
    return this
  }

  divide(v) {
    if (typeof v === 'number') {
      this.x /= v
      this.y /= v
      return this
    }
    this.x /= v.x
    this.y /= v.y
    return this
  }

  scale(x,y) {
    this.x *= x
    this.y *= y || x
    return this
  }

  project(v) {
    let a = this.dot(v) / v.len2
    this.x = a * v.x
    this.y = a * v.y
    return this
  }

  // project for when v is a unit vector (x|y = 0,1,-1)
  projectUnit(v) {
    let a = this.dot(v)
    this.x = a * v.x
    this.y = a * v.y
    return this
  }

  reflect(axis) {
    let x = this.x
    let y = this.y
    this.project(axis).scale(2)
    this.x -= x
    this.y -= y
    return this
  }

  // reflect when the axis vector is a unit vector
  reflectUnit(axis) {
    let x = this.x
    let y = this.y
    this.projectUnit(axis).scale(2)
    this.x -= x
    this.y -= y
    return this
  }

  dot(v) {
    return this.x * v.x + this.y * v.y
  }

  // length squared
  get len2() {
    return this.dot(this)
  }

  get len() {
    return Math.sqrt(this.len2)
  }

  get normal() {
    return this.clone().normalize()
  }

}

export default Vector