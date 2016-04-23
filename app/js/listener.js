/**
 * Listener
 */

export class Listener {

  constructor() {
    window.addEventListener('message', this.dispatch, false)
    DEBUG.trigger = this.triggerEvent
    window.parent.postMessage('loaded', '*')
  }

  dispatch(data) {
    console.log('GOT DATA')
    console.log(data)
  }


  triggerEvent(data) {
    window.postMessage({testing: true}, '*')
  }

}
