import {Engine as Engine} from './engine'
import {Ship as Ship} from './ship'
import {Loader as Loader} from './loader'
import {Listener as Listener} from './listener'
import {Camera as Camera} from './camera'

async function start() {
  let loader = new Loader()

  await loader.loadAll()
  let assets = loader.assets

  var listener = new Listener()
  var engine = new Engine(assets)
  var camera = new Camera(engine.camera, engine.controls)
  var ship = new Ship(assets, engine.cameraHolder, engine.floor)

  listener.register(ship)
  listener.register(camera)

  engine.camera.position.x = 50
  engine.camera.position.y = 50
  engine.camera.position.z = -400
  engine.camera.up = new THREE.Vector3(0, 1, 0)
  camera.enableOrbitControls()
  engine.addEntity(0, ship)
  engine.updateList.push(camera)

  DEBUG.ship = ship
}

start()
