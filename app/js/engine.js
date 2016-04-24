/**
 * Engine
 */

var _ = require('lodash')

export class Engine {

  constructor(assets) {
    DEBUG.engine = this
    this.assets = assets
    this.config = {
      dimensions: {}
    }
    this.clock = new THREE.Clock()
    this.updateList = []
    this.entities = []
    this.init()
    this.render()
    this.bindEvents()
    this.addSphereEnv()
    this.addPlane()
  }

  init() {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog( 0x000000, 1000, 3000 );
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    this.cameraHolder = new THREE.Object3D()
    this.cameraHolder.add(this.camera)
    this.scene.add(this.cameraHolder)

    this.controls = new THREE.DeviceOrientationControls(this.camera)
    this.controls.enabled = false

    this.renderer = new THREE.WebGLRenderer({
      antialias: false
    })
    this.renderer.setClearColor(0x000000, true);
    this.setSize()
    this.addLights()

    document.body.appendChild(this.renderer.domElement)
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.right = '0px'
    this.stats.domElement.style.top = '0px'
    document.body.appendChild(this.stats.domElement)
    return true
  }

  addLights() {
    this.light1 = new THREE.PointLight(0xffffff, 0.6, 0)
    this.light1.position.set(200, 800, 50)
    this.scene.add(this.light1)
    this.light2 = new THREE.PointLight(0xffffff, 1, 0)
    this.light2.position.set(-400, 0, 0)
    this.scene.add(this.light2)
    this.light3 = new THREE.PointLight(0xffffff, 1, 0)
    this.light3.position.set(0, 0, 0)
    this.scene.add(this.light3)
    this.light4 = new THREE.SpotLight(0xddddff, 1, 3000, 0.5, 0.1, 0)
    this.light4.position.set( 0, 1000, 500 );
    this.scene.add(this.light4)

  }

  addSphereEnv() {
    let geometry = new THREE.SphereGeometry(5000, 32, 32)
    let material = new THREE.MeshLambertMaterial({
      color: 0x555555,
      side: THREE.BackSide,
      map: this.assets.textures['textures/sphere']
    })
    let sphere = new THREE.Mesh(geometry, material)

    this.scene.add(sphere)
  }

  addPlane() {
    let geometry = new THREE.PlaneGeometry(5000, 5000, 20, 20)
    let material = new THREE.MeshLambertMaterial({
      color: 0x111111,
      side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(geometry, material)
    let meshGroup = this.assets.meshes['launchpad_v01']

    this.floor = new THREE.Object3D()
    plane.rotation.x = 3.14159 / 2
    meshGroup.children.forEach(m => {
      let material = new THREE.MeshPhongMaterial({
        color: 0x111111
      })
      let mesh = new THREE.Mesh(m.geometry, material)

      this.floor.add(mesh)
    })
    this.floor.add(plane)
    this.scene.add(this.floor)
  }

  setSize() {
    let width = window.innerWidth
    let height = window.innerHeight

    this.config.dimensions = {
      width: width,
      height: height
    }
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    return true
  }

  addEntity(playerId, entity) {
    entity.addObject()
    this.scene.add(entity.object)
    this.entities.push(entity)
  }

  updateChildren(delta) {
    this.updateList.forEach(ul => {
      ul.update(delta)
    })
    this.entities.forEach(e => {
      e.update(delta)
    })
  }

  bindEvents() {
    let self = this

    window.addEventListener('resize', function(e) {
      self.setSize()
    }, false)
  }

  render() {
    let self = this
    let delta = this.clock.getDelta()

    this.stats.begin()
    this.updateChildren(delta)
    this.renderer.render(this.scene, this.camera)
    this.stats.end()

    requestAnimationFrame(function() {
      self.render()
    })
  }

}
