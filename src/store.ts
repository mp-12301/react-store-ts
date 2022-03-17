import { Handler, States } from './types/store'

export default class Store {
  private handlers: Handler[] = []
  private states: States = {}
  
  constructor() {
  }

  subscribe(handler: Handler) {
    this.handlers.push(handler)
  }

  unsubscribe(handler: Handler) {
    this.handlers = this.handlers.filter(h => h !== handler)

    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i].key === handler.key) {
        return
      }
    }

    delete this.states[handler.key]
  }

  getState(key: string) {
    return this.states[key]
  }

  fire(event: any, thisScope: Object) {
    const scope = thisScope || {}
   
    this.states[event.key] = event.value

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].fn.call(scope, event)
    }
  }
}
