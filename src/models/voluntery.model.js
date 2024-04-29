const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Voluntery extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.name = { type: 'varchar' };
    this.description = { type: 'text' };
  }
}

module.exports = new EntitySchema({
  name: 'Voluntery',
  tableName: 'volunterys',
  columns: new Voluntery(),
  relations: {
    users: {
      target: 'User', // Target entity name
      type: 'one-to-many', // Type of relationship
      joinColumn: true, // Indicates if this side of the relationship will contain the join column(s)
      inverseSide: 'voluntery', // Name of the inverse side property (optional)
    },
  },
});
