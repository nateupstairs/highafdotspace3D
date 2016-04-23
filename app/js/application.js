import {Engine as Engine} from './engine'
import {Ship as Ship} from './ship'

var engine = new Engine()
var ship = new Ship()

engine.camera.position.x = 100
engine.camera.up = new THREE.Vector3(0, 0, 1)
engine.camera.lookAt(new THREE.Vector3(0, 0, 0))
engine.addEntity(0, ship)
