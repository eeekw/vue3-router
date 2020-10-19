import { History, Listener, HistoryLocation } from './history'

// eslint-disable-next-line import/prefer-default-export
export class Html5History extends History {
  listen(on: Listener) {
    super.listen(on)
    window.addEventListener('popstate', () => {
      this.historyChange()
    })
  }

  push(l: HistoryLocation) {
    super.push(l)
    window.history.pushState(l, '', l)
  }
}