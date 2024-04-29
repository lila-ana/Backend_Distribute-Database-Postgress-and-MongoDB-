const { EntitySchema } = require('typeorm');

// PostgreSQL Entity

class User {
  constructor() {
    this.id = { type: 'uuid', primary: true, generated: 'uuid' };
    this.fullName = { type: 'varchar', nullable: true };
    this.phone = { type: 'varchar', nullable: true };
    this.email = { type: 'varchar', nullable: true };
    this.password = { type: 'varchar', nullable: true };
    this.role = { type: 'varchar', nullable: true };
    this.country = { type: 'varchar', nullable: true };
    this.volenteerTypeId = { type: 'varchar', nullable: true };
    // Add more fields as needed
  }
}

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: new User(),
});
