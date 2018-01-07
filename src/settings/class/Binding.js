export default class Binding {
  constructor ({ ud = -1, local = '', online = '', tip = '', bind = true } = {}) {
    this.id = -1
    this.local = local
    this.online = online
    this.tip = tip
    this.bind = bind
  }
}
