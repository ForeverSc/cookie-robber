import storage from './storage'

export default {
  getAll() {
    return storage.get('bindings') || []
  },
  setAll(bindings = []) {
    storage.set('bindings', bindings)
  },
  add(binding = {}) {
    const updatedAll = this.getAll().concat(binding)

    this.setAll(updatedAll)
  },
  delete({ id }) {
    const deleteIndex = this.searchIndex(id)

    all.splice(deleteIndex, 1)
    this.setAll(all) 
  },
  search(id) {
    return this.getAll().find(({ aimId: id }) => aimId === id)
  },
  searchIndex(id) {
    return this.getAll().findIndex(({ aimId: id }) => aimId === id)
  }
}