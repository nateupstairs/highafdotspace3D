/**
 * Ship
 */

var easing = require('./easing')

export class Ship {

  constructor(params) {
    this.object
    this.time = 0
    this.launched = false
  }

  addObject() {
    let geo = new THREE.BoxGeometry(20, 20, 20)
    let material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    })
    let mesh = new THREE.Mesh(geo, material)

    this.object = new THREE.Object3D()
    this.object.add(mesh)
  }

  update(delta) {
    this.time += delta
    if (this.launched) {
      this.object.position.setY(easing.easeInOutCubic(this.time - this.launched))
    }
  }

  launch() {
    this.launched = this.time
  }

}
