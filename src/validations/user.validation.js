const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    fullName: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
    country: Joi.string(),
    volenteerTypeId: Joi.string(),
    image: Joi.string(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  // body: Joi.object()
  //   .keys({
  //     title: Joi.string(),
  //     body: Joi.string(),
  //   })
  //   .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
