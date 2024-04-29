const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const { name, date, event_time, event_price, charityAddress, description, eventAddress } = req.body;
  const event = await eventService.createEvent({
    name,
    date,
    event_time,
    event_price,
    charityAddress,
    image,
    description,
    eventAddress,
  });

  const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${image}`;
  const isActive = 1;
  // Respond with success and image URL
  res.status(httpStatus.CREATED).json({
    status: 'Success',
    Event: {
      name: event.name,
      date: event.data,
      event_time: event.event_time,
      event_price: event.event_price,
      charityAddress: event.charityAddress,
      imageUrl: imageUrl,
      description: event.description,
      eventAddress: event.eventAddress,
      isActive: isActive,
    },
  });
  // res.status(httpStatus.CREATED).send(post);
});

const getEvents = catchAsync(async (req, res) => {
  try {
    const event = await eventService.getEvents();
    // Map each post to include the image URL
    const eventsWithImageUrl = event.map((event) => {
      const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${event.image}`;
      return {
        id: event.id,
        createdAt: event.createdAt,
        name: event.name,
        description: event.description,
        image: event.image,
        eventAddress: event.eventAddress,
        date: event.date,
        event_time: event.event_time,
        event_price: event.event_price,
        charityAddress: event.charityAddress,
        isActive: event.isActive === 1 ? true : false,
        imageUrl: imageUrl,
      };
    });

    // Respond with the posts including image URLs
    res.status(httpStatus.OK).json({
      status: 'Success',
      posts: eventsWithImageUrl,
    });
  } catch (error) {
    // Handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

const getEvent = catchAsync(async (req, res) => {
  const post = await eventService.getEventById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updateEvent = catchAsync(async (req, res) => {
  const eventId = req.params.eventId;
  const events = await eventService.getEventById(eventId);
  console.log(events, 'evemttt');
  const event = await eventService.updateEventById(req.params.eventId, req.body);
  const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${event.image}`;
  event.imageUrl = imageUrl;
  res.send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.eventId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createPost = catchAsync(async (req, res) => {
  const post = await eventService.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.queryPosts(filter, options);
  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await eventService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await eventService.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await eventService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
