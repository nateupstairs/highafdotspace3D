/**
 * Entity
 */

export class Entity {

  constructor() {
    this.bindings = {}
  }

  control(e) {
    if (this.bindings[e.input]) {
      if (this.bindings[e.input][e.status]) {
        this[this.bindings[e.input][e.status]](e.value)
      }
    }
  }

}
