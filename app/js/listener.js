/**
 * Listener
 */

export class Listener {

  constructor() {
    window.addEventListener('message', this.dispatch, false)
    DEBUG.trigger = this.triggerEvent
  }

  dispatch(data) {
    console.log('GOT DATA')
    console.log(data)
  }


  triggerEvent(data) {
    window.postMessage({testing: true}, '*')
  }

}
