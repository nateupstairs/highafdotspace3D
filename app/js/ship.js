/**
 * Ship
 */

export class Ship {

  constructor(params) {
    this.object
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

}
