const Joi = require('joi');

const createVoluntery = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getVolunterys = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVoluntery = {
  params: Joi.object().keys({
    volunteryId: Joi.string(),
  }),
};

const updateVoluntery = {
  params: Joi.object().keys({
    volunteryId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteVoluntery = {
  params: Joi.object().keys({
    volunteryId: Joi.string(),
  }),
};

module.exports = {
  createVoluntery,
  getVolunterys,
  getVoluntery,
  updateVoluntery,
  deleteVoluntery,
};
