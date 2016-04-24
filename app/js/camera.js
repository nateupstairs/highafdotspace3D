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
      'M-1': {
        position: new THREE.Vector3(0, 800, -150),
        lookAt: new THREE.Vector3(0, 300, 0)
      },
      'M-2': {
        position: new THREE.Vector3(0, 30, -200),
        lookAt: new THREE.Vector3(0, 600, 0)
      },
      'M-3': {
        position: new THREE.Vector3(0, 250, -500),
        lookAt: new THREE.Vector3(0, 250, 0)
      },
      'M-4': {
        position: new THREE.Vector3(0, 150, -150),
        lookAt: new THREE.Vector3(0, 100, 0)
      },
      'M-5': {
        position: new THREE.Vector3(0, 100, -1000),
        lookAt: new THREE.Vector3(0, 400, 0)
      },
      'M-6': {
        position: new THREE.Vector3(0, 500, -100),
        lookAt: new THREE.Vector3(0, 700, 0)
      },
      'M-7': {
        position: new THREE.Vector3(0, 300, -400),
        lookAt: new THREE.Vector3(0, 150, 0)
      },
      'M-8': {
        position: new THREE.Vector3(70, 800, -10),
        lookAt: new THREE.Vector3(0, 0, 0)
      },
      'M-9': {
        position: new THREE.Vector3(0, 50, -100),
        lookAt: new THREE.Vector3(0, 20, 0)
      },


    }
    this.target = 'main'
    this.resetMove = false
    this.startPos = {
      position: new THREE.Vector3(1000, 0, 0),
      lookAt: new THREE.Vector3(0, 0, 0)
    }
  }

  feedEvent(data) {
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
