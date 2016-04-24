/**
 * Ship
 */

var easing = require('./easing')

export class Ship {

  constructor(assets, cameraHolder, floor) {
    this.assets = assets
    this.cameraHolder = cameraHolder
    this.floor = floor
    this.object = new THREE.Object3D()
    this.time = 0
    this.launched = false
    this.enabled = false
  }

  addObject() {
    let meshGroup = this.assets.meshes['deltaIV_v02']

    this.shipMeshes = new THREE.Object3D()
    meshGroup.children.forEach(m => {

      let matAttrs = {
        color: 0xeedefe,
        shininess: 20
      }

      // console.log(m.name)

      if (m.name.indexOf('texA') !== -1) {
        matAttrs.map = this.assets.textures['textures/texA']
      }
      else if (m.name.indexOf('orange') !== -1){
        matAttrs.color = 0xea8800
        matAttrs.shininess = 5
      }
      else if (m.name.indexOf('silver') !== -1){
        matAttrs.color = 0xa8b0b9
        matAttrs.shininess = 70
      }

      let material = new THREE.MeshPhongMaterial(matAttrs)

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
    this.flame = new SPE.Emitter({
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
        value: [new THREE.Color('white'), new THREE.Color('yellow')]
      },
      size: {
        value: 40
      },
      drag: {
        value: 0.3
      },
  	  particleCount: 500
  	})
    this.smoke = new SPE.Emitter({
      maxAge: {
        value: 5
      },
  		position: {
        value: new THREE.Vector3(0, -80, 0),
        spread: new THREE.Vector3(20, 0, 20)
      },
  		acceleration: {
        value: new THREE.Vector3(0, 0, 0),
        spread: new THREE.Vector3(0, 0, 0)
      },
  		velocity: {
        value: new THREE.Vector3(0, -200, 0),
        spread: new THREE.Vector3(40, 100, 40)
      },
      color: {
        value: [new THREE.Color( 0x333333 ), new THREE.Color( 0x110000 )]
      },
      size: {
        value: 200
      },
      drag: {
        value: 0.2
      },
  	  particleCount: 150
  	})
    this.flameLeft = new SPE.Emitter({
      maxAge: {
        value: 0.15
      },
  		position: {
        value: new THREE.Vector3(-35, 42, -13),
        spread: new THREE.Vector3(5, 0, 5)
      },
  		acceleration: {
        value: new THREE.Vector3(0, 0, 0),
        spread: new THREE.Vector3(0, 0, 0)
      },
  		velocity: {
        value: new THREE.Vector3(0, -200, 0),
        spread: new THREE.Vector3(40, 100, 40)
      },
      color: {
        value: [new THREE.Color('white'), new THREE.Color('yellow')]
      },
      size: {
        value: 20
      },
      drag: {
        value: 0.2
      },
  	  particleCount: 100
  	})
    this.flameRight = new SPE.Emitter({
      maxAge: {
        value: 0.15
      },
  		position: {
        value: new THREE.Vector3(35, 42, 10),
        spread: new THREE.Vector3(5, 0, 5)
      },
  		acceleration: {
        value: new THREE.Vector3(0, 0, 0),
        spread: new THREE.Vector3(0, 0, 0)
      },
  		velocity: {
        value: new THREE.Vector3(0, -200, 0),
        spread: new THREE.Vector3(40, 100, 40)
      },
      color: {
        value: [new THREE.Color('white'), new THREE.Color('yellow')]
      },
      size: {
        value: 20
      },
      drag: {
        value: 0.3
      },
  	  particleCount: 100
  	})
    this.exhaustParticles.addEmitter(this.flame)
    this.exhaustParticles.addEmitter(this.smoke)
    this.exhaustParticles.addEmitter(this.flameLeft)
    this.exhaustParticles.addEmitter(this.flameRight)
    this.object.add(this.exhaustParticles.mesh)
    this.exhaustParticles.emitters.forEach(e => {
      e.activeMultiplier = 0
    })
    this.enabled = true
  }

  update(delta) {
    if (this.enabled) {
      this.time += delta
      if (this.launched) {
        let yPos = easing.easeOutCubic(this.time - this.launched)

        /*this.shipMeshes.position.setY(yPos)
        this.exhaustParticles.mesh.position.y = yPos
        this.cameraHolder.position.setY(yPos)*/
        this.floor.position.setY(-yPos)
      }
      this.exhaustParticles.tick(delta)
    }
  }

  launch() {
    this.launched = this.time
    this.exhaustParticles.emitters.forEach(e => {
      e.activeMultiplier = 1
    })
  }

  unlaunch() {
    this.launched = false
    this.exhaustParticles.emitters.forEach(e => {
      e.activeMultiplier = 0
    })
    this.floor.position.setY(0)
  }

  feedEvent(data) {
    let e = data.data.eventName

    if (e == 'M-12') {
      this.launch()
    }
    if (e == 'reset') {
      this.unlaunch()
    }
  }

}
