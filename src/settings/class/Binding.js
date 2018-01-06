export default class Binding {
  constructor ({ local = '', online = '', tip = '', bind = true } = {}) {
    this.id = -1
    this.local = local
    this.online = online
    this.tip = tip
    this.bind = bind
  }
}
