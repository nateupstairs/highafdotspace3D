import {Engine as Engine} from './engine'
import {Ship as Ship} from './ship'
import {Loader as Loader} from './loader'
import {Listener as Listener} from './listener'
import {Camera as Camera} from './camera'

async function start() {
  var loader = new Loader()
  await loader.loadAll()
  let assets = loader.assets

  var listener = new Listener()
  var engine = new Engine(assets)
  var camera = new Camera(engine.camera)
  var ship = new Ship(assets)
  listener.register(ship)
  listener.register(camera)

  engine.camera.position.x = 1000
  engine.camera.position.y = 200
  engine.camera.up = new THREE.Vector3(0, 1, 0)
  engine.camera.lookAt(new THREE.Vector3(0, 0, 0))
  engine.addEntity(0, ship)
  engine.updateList.push(camera)

  DEBUG.ship = ship
}

start()
