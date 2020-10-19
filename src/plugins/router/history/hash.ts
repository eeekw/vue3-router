import { History, Listener, HistoryLocation } from './history'

// eslint-disable-next-line import/prefer-default-export
export class HashHistory extends History {
  constructor(base?: string) {
    let b = base
    if (!b) {
      b = ''
    }
    if (b.indexOf('#') < 0) {
      b += '#'
    }
    super(b)
  }

  listen(on: Listener) {
    super.listen(on)
    window.addEventListener('hashchange', () => this.historyChange())
  }

  push(l: HistoryLocation) {
    super.push(l)
    window.location.hash = l
  }
}