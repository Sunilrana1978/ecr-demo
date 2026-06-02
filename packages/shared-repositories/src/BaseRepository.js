export class BaseRepository {
  constructor(EntityClass = Object) {
    this.storage = new Map();
    this.nextId = 1;
    this.EntityClass = EntityClass;
  }

  findAll() {
    return Array.from(this.storage.values());
  }

  findById(id) {
    return this.storage.get(parseInt(id));
  }

  create(data) {
    const id = this.nextId++;
    const entity = new this.EntityClass({ id, ...data });
    this.storage.set(id, entity);
    return entity;
  }

  update(id, data) {
    const entity = this.storage.get(parseInt(id));
    if (!entity) return null;

    Object.assign(entity, data);
    this.storage.set(parseInt(id), entity);
    return entity;
  }

  delete(id) {
    return this.storage.delete(parseInt(id));
  }

  clear() {
    this.storage.clear();
    this.nextId = 1;
  }

  count() {
    return this.storage.size;
  }
}
