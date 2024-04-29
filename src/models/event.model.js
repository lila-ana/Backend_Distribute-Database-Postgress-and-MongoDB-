const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Event extends Base {
  // Define additional properties specific to event entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.name = { type: 'varchar' };
    this.event_price = { type: 'varchar' };
    this.event_time = { type: 'varchar' };
    this.image = { type: 'varchar' };
    this.eventAddress = { type: 'varchar', nullable: true };
    this.description = { type: 'varchar' };
    // this.date = { type: 'datetime' };
    this.charityAddress = { type: 'varchar' };
    this.isActive = { type: 'boolean', default: true, nullable: true };
  }
}

module.exports = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: new Event(),
});
