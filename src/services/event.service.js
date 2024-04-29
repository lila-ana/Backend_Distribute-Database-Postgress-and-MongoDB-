const httpStatus = require('http-status');
const { Event, Post } = require('../models');
// const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
const EventPostgres = require('../models/event.model');
const { getConnection } = require('typeorm');

// const eventRepository = dataSource.getRepository(Event).extend({
//   findAll,
//   sortBy,
// });
// const postRepository = dataSource.getRepository(Post).extend({
//   findAll,
//   sortBy,
// });
const createEvent = async (name, date, event_time, event_price, charityAddress, image, description, eventAddress) => {
  const connection = getConnection();
  const eventRepository = connection.getRepository(EventPostgres);
  const doc = eventRepository.create(name, date, event_time, event_price, charityAddress, image, description, eventAddress);
  const savedUserPostgress = await eventRepository.save(doc);

  // const result = await eventRepository.save(doc);
  return savedUserPostgress;
};

const queryEvents = async () => {
  // eslint-disable-next-line no-shadow
  // const { limit, page, sortBy } = options;

  const result = await eventRepository.findAll({ tableName: 'events' });
  return result;
};

const getEventById = async (id) => {
  console.log(id, 'iddd');
  const result = await eventRepository.findOneBy({ id });
  console.log(result, 'hellooo');
  return result;
};

const updateEventById = async (eventId, updateBody) => {
  let result;
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'event not found');
  }
  let update;
  update = await eventRepository.update({ id: eventId }, updateBody);
  if (update) {
    result = await getEventById(eventId);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'event not found');
  }
  return result;
};

const deleteEventById = async (eventId) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'event not found');
  }
  const result = await eventRepository.delete({ id: eventId });
  return result;
};

const getEvents = async () => {
  const connection = getConnection();
  const eventRepository = connection.getRepository(EventPostgres);
  const event = eventRepository.find();
  return event;
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getEvents,
};
