/**
 * Listener
 */

export class Listener {

  constructor() {
    document.getElementById('listener').addEventListener('feed-event', dispatch)
  }

  dispatch(data) {
    console.log('GOT DATA')
    console.log(data)
  }

}
