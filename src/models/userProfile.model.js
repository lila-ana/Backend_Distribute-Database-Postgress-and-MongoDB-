const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class UserProfile extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.user_id = { type: 'varchar' };
    this.role = { type: 'varchar' };
    this.payment_id = { type: 'varchar' };
    this.is_actived = { type: 'varchar' };
  }
}

module.exports = new EntitySchema({
  name: 'UserProfile',
  tableName: 'userprofiles',
  columns: new UserProfile(),
  relations: {
    user: {
      type: 'one-to-many',
      target: 'User',
      inverseSide: 'userProfiles',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
