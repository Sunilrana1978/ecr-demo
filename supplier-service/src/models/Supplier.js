export class Supplier {
  constructor(id, name, email, phone, rating) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.rating = rating;
    this.createdAt = new Date();
  }
}
