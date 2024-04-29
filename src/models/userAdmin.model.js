const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class UserAdmin extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.user_id = { type: 'varchar' };
    this.role = { type: 'varchar' };
    this.is_actived = { type: 'varchar' };
    this.path = { type: 'varchar' };
  }
}

module.exports = new EntitySchema({
  name: 'UserAdmin',
  tableName: 'useradmins',
  columns: new UserAdmin(),
  relations: {
    user: {
      type: 'one-to-many',
      target: 'User',
      inverseSide: 'userAdmins',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
