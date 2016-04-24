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
    this.controls = {}
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



    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setClearColor(0x000000, true);
    this.setSize()
    this.addLights()

    this.controls.deviceOrient = new THREE.DeviceOrientationControls(this.camera)
    this.controls.deviceOrient.enabled = false
    this.controls.orbit = new THREE.OrbitControls(this.camera, document.body)
    this.controls.orbit.enabled = false

    this.controls.orbit.enableDamping = true;
    this.controls.orbit.dampingFactor = 0.25;
    this.controls.orbit.enableZoom = false;

    this.controls.orbit.target = new THREE.Vector3(0, 380, 0);
    //this.controls.target = this.camPar.position;
    this.controls.orbit.rotateSpeed = 0.2;
    // this.controls.orbit.keyPanSpeed = 2;
    this.controls.orbit.zoomSpeed = 0.2;
    // this.controls.orbit.noPan = true;
    //this.controls.noZoom = true;
    this.controls.orbit.minDistance = 80;
    this.controls.orbit.maxDistance = 2000;

    // both angle are measured from top in radians (~6.3 in a full circle)
    // this.controls.orbit.minPolarAngle = (Math.PI*0.2);
    // this.controls.orbit.maxPolarAngle = (Math.PI*0.5) + 0.1;


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
    this.light4 = new THREE.SpotLight(0xddddff, 1, 3000, 0.3, 1, 0)
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
    // let geometry = new THREE.PlaneGeometry(5000, 5000, 20, 20)
    // let material = new THREE.MeshLambertMaterial({
    //   color: 0x111111,
    //   side: THREE.DoubleSide
    // })
    // let plane = new THREE.Mesh(geometry, material)
    let meshGroup = this.assets.meshes['launchpad_v01']

    this.floor = new THREE.Object3D()
    //plane.rotation.x = 3.14159 / 2
    meshGroup.children.forEach(m => {
      let material = new THREE.MeshPhongMaterial({
        color: 0x111111
      })
      let mesh = new THREE.Mesh(m.geometry, material)

      this.floor.add(mesh)
    })
    // this.floor.add(plane)
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
