/**
 * Engine
 */

var _ = require('lodash')

export class Engine {

  constructor(params) {
    DEBUG.engine = this
    this.config = {
      dimensions: {}
    }
    this.clock = new THREE.Clock()
    this.updateList = []
    this.entities = []
    this.init()
    this.render()
    this.bindEvents()
  }

  init() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
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
    this.light1 = new THREE.PointLight(0xffffff, 1, 0)
    this.light1.position.set(200, 700, 50)
    this.scene.add(this.light1)
    this.light2 = new THREE.PointLight(0xffffff, 1, 0)
    this.light2.position.set(-400, 0, 0)
    this.scene.add(this.light2)
    this.light3 = new THREE.PointLight(0xffffff, 1, 0)
    this.light3.position.set(-50, -100, -30)
    this.scene.add(this.light3)
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
