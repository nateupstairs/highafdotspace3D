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
        position: new THREE.Vector3(500, 100, 100),
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
      let diff = this.positions[this.target].position
        .clone()
        .sub(this.startPos.position)
      let diffMult = diff.multiplyScalar(progress)
      let camPosition = this.startPos.position.clone().add(diffMult)
      
      this.camera.position.copy(camPosition)
    }
  }

  update(delta) {
    this.time += delta
    if (this.resetMove) {
      this.progress = 0
      this.startPos = {
        position: this.camera.position.clone()
      }
      this.resetMove = false
    }
    this.progress += delta / this.animationTime
    if (this.progress < 1) {
      this.updateCameraPosition()
    }
  }

}
