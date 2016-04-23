/**
 * Ship
 */

var easing = require('./easing')

export class Ship {

  constructor(assets) {
    this.assets = assets
    this.object = new THREE.Object3D()
    this.time = 0
    this.launched = false
  }

  addObject() {
    let meshGroup = this.assets.meshes['deltaIV_v01']

    meshGroup.children.forEach(m => {
      let material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      })
      let mesh = new THREE.Mesh(m.geometry, material)

      this.object.add(mesh)
    })
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

  feedEvent(data) {
    console.log('EVENT TEST!')
    console.log(data)
  }

}
