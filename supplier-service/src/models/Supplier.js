export class Supplier {
  constructor(data) {
    if (typeof data === 'number') {
      this.id = data;
      this.name = arguments[1];
      this.email = arguments[2];
      this.phone = arguments[3];
      this.rating = arguments[4];
      this.createdAt = new Date();
    } else {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone || null;
      this.rating = data.rating || 0;
      this.createdAt = data.createdAt || new Date();
    }
  }
}

