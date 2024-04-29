const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Donation extends Base {
  // Define additional properties specific to Donation entity
  constructor() {
    super();
    this.amount = { type: 'int' };
    this.email = { type: 'varchar' };
    this.phone = { type: 'varchar' };
    this.name = { type: 'varchar' };
  }
}

module.exports = new EntitySchema({
  name: 'Donation',
  tableName: 'donations',
  columns: new Donation(),
});
