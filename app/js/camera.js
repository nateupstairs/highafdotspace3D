/**
 * Engine
 */

var _ = require('lodash')
var easing = require('./easing')

export class Camera {

  constructor(camera) {
    this.camera = camera
    this.time = 0
    this.animationTime = 2
    this.progress = 1
    this.lookAt = new THREE.Vector3(0, 0, 0)
    this.positions = {
      main: {
        position: new THREE.Vector3(800, 0, 0),
        lookAt: new THREE.Vector3(0, 400, 0)
      },
      top: {
        position: new THREE.Vector3(500, 400, 0),
        lookAt: new THREE.Vector3(0, 600, 0)
      },
      side: {
        position: new THREE.Vector3(100, 300, 300),
        lookAt: new THREE.Vector3(0, 400, 0)
      }
    }
    this.target = 'main'
    this.resetMove = false
    this.startPos = {
      position: new THREE.Vector3(1000, 0, 0),
      lookAt: new THREE.Vector3(0, 0, 0)
    }
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
    let target = this.positions[this.target]
    let camDiff = target.position.clone().sub(this.startPos.position)
    let camDiffMult = camDiff.multiplyScalar(progress)
    let camPosition = this.startPos.position.clone().add(camDiffMult)
    let lookAtDiff = target.lookAt.clone().sub(this.startPos.lookAt)
    let lookAtDiffMult = lookAtDiff.multiplyScalar(progress)
    let lookAtPosition = this.startPos.lookAt.clone().add(lookAtDiffMult)

    this.camera.position.copy(camPosition)
    this.lookAt.copy(lookAtPosition)
    this.camera.lookAt(this.lookAt)
  }

  update(delta) {
    this.time += delta
    if (this.resetMove) {
      this.progress = 0
      this.startPos = {
        position: this.camera.position.clone(),
        lookAt: this.lookAt.clone()
      }
      this.resetMove = false
    }
    this.progress += delta / this.animationTime
    if (this.progress < 1) {
      this.updateCameraPosition()
    }
  }

}
