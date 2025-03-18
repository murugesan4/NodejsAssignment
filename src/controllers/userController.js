const { connectToDatabase } = require('../db/connect');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const deleteAllUsers = async () => {
  const db = await connectToDatabase();
  await db.collection('users').deleteMany({});
};

const deleteUserById = async (userId) => {
  const db = await connectToDatabase();
  await db.collection('users').deleteOne({ id: userId });
};

const getUserById = async (userId) => {
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ id: userId });

  if (!user) throw new Error('User not found');

  const posts = await db.collection('posts').find({ userId }).toArray();
  const postIds = posts.map((post) => post.id);
  const comments = await db.collection('comments').find({ postId: { $in: postIds } }).toArray();

  return { ...user, posts: posts.map((post) => ({ ...post, comments: comments.filter((comment) => comment.postId === post.id) })) };
};

const createUser = async (user) => {
  const db = await connectToDatabase();
  const existingUser = await db.collection('users').findOne({ id: user.id });
  if (existingUser) throw new Error('User already exists');
  await db.collection('users').insertOne(user);
};

module.exports = { deleteAllUsers, deleteUserById, getUserById, createUser };