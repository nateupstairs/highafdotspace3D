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
    this.enabled = false
  }

  addObject() {
    let meshGroup = this.assets.meshes['deltaIV_v01']

    this.shipMeshes = new THREE.Object3D()
    meshGroup.children.forEach(m => {
      let material = new THREE.MeshPhongMaterial({
        color: 0xffffff
      })
      let mesh = new THREE.Mesh(m.geometry, material)

      this.shipMeshes.add(mesh)
    })
    this.object.add(this.shipMeshes)
    this.addParticles()
  }

  addParticles() {
    this.exhaustParticles = new SPE.Group({
  		texture: {
        value: this.assets.textures['smokeparticle']
      },
      maxParticleCount: 4000
  	})
    this.emitter = new SPE.Emitter({
      maxAge: {
        value: 0.3
      },
  		position: {
        value: new THREE.Vector3(0, 0, 0),
        spread: new THREE.Vector3(20, 0, 20)
      },
  		acceleration: {
        value: new THREE.Vector3(0, 0, 0),
        spread: new THREE.Vector3(0, 0, 0)
      },
  		velocity: {
        value: new THREE.Vector3(0, -400, 0),
        spread: new THREE.Vector3(100, 200, 100)
      },
      color: {
        value: [ new THREE.Color('white'), new THREE.Color('yellow') ]
      },
      size: {
        value: 40
      },
  	  particleCount: 500
  	})
    this.exhaustParticles.addEmitter(this.emitter)
    this.object.add(this.exhaustParticles.mesh)
    this.enabled = true
  }

  update(delta) {
    if (this.enabled) {
      this.time += delta
      if (this.launched) {
        let yPos = easing.easeOutCubic(this.time - this.launched)

        this.emitter.particleCount = 1000
        this.shipMeshes.position.setY(yPos)
        this.exhaustParticles.mesh.position.y = yPos
      }
      this.exhaustParticles.tick(delta)
    }
  }

  launch() {
    this.launched = this.time
  }

  feedEvent(data) {

  }

}
