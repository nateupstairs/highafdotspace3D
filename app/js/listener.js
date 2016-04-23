/**
 * Listener
 */

export class Listener {

  constructor() {
    this.registrations = []
    window.addEventListener('message', this.dispatch.bind(this), false)
    DEBUG.trigger = this.triggerEvent
    window.parent.postMessage('loaded', '*')
  }

  dispatch(data) {
    this.registrations.forEach(r => {
      r.feedEvent(data)
    })
  }

  triggerEvent(data) {
    window.postMessage(data, '*')
  }

  register(model) {
    this.registrations.push(model)
  }

}
