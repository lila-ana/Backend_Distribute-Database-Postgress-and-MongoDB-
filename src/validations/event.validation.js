const Joi = require('joi');

const createEvent = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      date: Joi.date(),
      eventAddress: Joi.string(),
      charityAddress: Joi.string(),
      description: Joi.string(),
      isActive: Joi.required(),
      event_time: Joi.string(),
      event_price: Joi.string(),
    })
    .unknown(true)
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    eventId: Joi.string(),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
