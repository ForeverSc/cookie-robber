import storage from '../../util/storage'

export default class {
  constructor() {
    this.all = storage.get('bindings') || []
  }
  get() {
    return this.all
  }
  setAll() {
    storage.set('bindings', this.all)
  }
  add(newBinding = {}) {
    const { id }= this.all.slice(-1)[0] || { id: 0 }

    newBinding.id = id + 1
    this.all.push(newBinding)
    this.setAll()
  }
  update(binding) {
    const index = this.searchIndex(binding.id)

    this.all.splice(index, 1, binding)
    this.setAll()
  }
  delete({ id }) {
    const deleteIndex = this.searchIndex(id)

    this.all.splice(deleteIndex, 1)
    this.setAll()
  }
  search(id) {
    return this.all.find(({ id: aimId }) => aimId === id)
  }
  searchIndex(id) {
    return this.all.findIndex(({ id: aimId }) => aimId === id)
  }
}