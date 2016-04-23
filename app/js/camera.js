/**
 * Engine
 */

var _ = require('lodash')
var easing = require('./easing')

export class Camera {

  constructor(camera) {
    this.camera = camera
    this.time = 0
    this.animationTime = 5
    this.progress = 0
    this.lookAt = new THREE.Vector3(0, 0, 0)
    this.positions = {
      pos1: {
        position: new THREE.Vector3(90, 0, 0),
        lookAt: new THREE.Vector3(8, 0, 0)
      },
      pos2: {
        position: new THREE.Vector3(-90, 0, 0),
        lookAt: new THREE.Vector3(-8, 0, 0)
      }
    }
    this.target = 'pos1'
    this.resetMove = false
    this.startPos
  }

  feedEvent(data) {
    console.log('EVENT TEST!')
    console.log(data)
    if (data.data.camera) {
      this.target = data.data.camera
      this.resetMove = true
    }
  }

  updateCameraPosition() {
    let progress = easing.easeInOutCubic(this.progress)

    if (this.startPos) {
      // this.startPos has the originating camera location
      // this.positions[this.target] has target position/lookat
      var diff = this.positions[this.target].clone().sub(this.startPos);
      var diffMult = diff.multiplyScalar(this.progress);
      var camPosition = this.startPos.clone().add(diffMult);

      // set camera position / lookat to match
    }
  }

  update(delta) {
    this.time += delta
    if (this.resetMove) {
      this.progress = 0
      this.startPos = {
        position: Object.assign({}, this.camera.position),
        rotation: Object.assign({}, this.camera.rotation)
      }
      this.resetMove = false
    }
    this.progress += delta / this.animationTime
    if (this.progress < 1) {
      this.updateCameraPosition()
    }
  }

}
