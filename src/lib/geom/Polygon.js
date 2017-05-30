
import Vector from 'lib/Vector'

// recalcuate the points of a polygon
function recalculatePoints(polygon) {
  let points = polygon.points
  let offset = polygon.offset
  let angle = polygon.angle
  let i, l = points.length

  // transform the point
  for (i = 0; i < l; i++) {
    let p = polygon.transformedPoints[i].copy(points[i])
    p.x += offset.x
    p.y += offset.y
    if (angle !== 0) p.rotate(angle)
  }

  // setup the edges and normals
  for (i = 0; i < l; i++) {
    let p1 = polygon.transformedPoints[i]
    let p2 = i < l-1 ? polygon.transformedPoints[i+1] : polygon.transformedPoints[0]
    let e = polygon.edges[i].copy(p2).subtract(p1)
    polygon.normals[i].copy(e).perp().normalize()
  }
}

class Polygon {

  constructor(position, points, angle, offset) {
    this.pos = position || new Vector()
    this.angle = angle || 0
    this.offset = new Vector()
    this.offset.copy(offset)
    this.points = []
    this.transformedPoints = []
    this.edges = []
    this.normals = []
    this.setPoints(points)
  }

  setPoints(points, force = false) {
    if (!!this.points && this.points.length === points.length && !force)
      return // don't build the array if we don't think we have to
    // reset the values
    this.points.length = 0
    this.transformedPoints.length = 0
    this.edges.length = 0
    this.normals.length = 0

    for (let i = 0, l = points.length; i < l; i++) {
      this.transformedPoints[i] = new Vector()
      this.edges[i] = new Vector()
      this.normals[i] = new Vector()
      this.points[i] = points[i].clone()
    }
    recalculatePoints(this)
    return this
  },

  setAngle(angle) {
    this.angle = angle
    recalculatePoints(this)
    return this
  }

  setOffset(offset) {
    this.offset.copy(offset)
    recalculatePoints(this)
    return this
  }

  rotate(angle) {
    for (p in this.points) {
      p.rotate(angle)
    }
    recalculatePoints(this)
    return this
  }

  translate(x, y) {
    for (p in this.points) {
      p.x += x
      p.y += y
    }
    recalculatePoints(this)
    return this
  }

  clone() {
    return new Polygon(this.pos.clone(), this.points)
  }

}

export default Polygon