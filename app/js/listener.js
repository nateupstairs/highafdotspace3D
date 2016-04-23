/**
 * Listener
 */

export class Listener {

  constructor() {
    window.addEventListener('feed-event', this.dispatch)
    DEBUG.trigger = this.triggerEvent
  }

  dispatch(data) {
    console.log('GOT DATA')
    console.log(data)
  }


  triggerEvent(data) {
    window.dispatchEvent(new CustomEvent('feed-event', {
      detail: data
    }))
  }

}
