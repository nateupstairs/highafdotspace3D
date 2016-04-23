/**
 * Loader
 */

export class Loader {

  constructor(params) {
    this.assets = {
      meshes: {},
      textures: {}
    }
    this.assetList = {
      meshes: ['deltaIV_v01.json'],
      textures: []
    }
    this.baseUrl = './assets/'
    this.loadAll()
  }

  async loadObject(path) {
    let name = path.split('.')[0]
    let loader = new THREE.ObjectLoader()

    return new Promise((resolve, reject) => {
      return loader.load(this.baseUrl + path, (asset) => {
        this.assets.meshes[name] = asset
        return resolve()
      })
    })
  }

  async loadAll() {
    for (let a of this.assetList.meshes) {
      await this.loadObject(a)
    }
  }

}
