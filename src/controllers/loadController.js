const { connectToDatabase } = require('../db/connect');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const loadData = async () => {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  const postsCollection = db.collection('posts');
  const commentsCollection = db.collection('comments');

  // Fetch data from JSON Placeholder
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await usersResponse.json();

  const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsResponse.json();

  const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
  const comments = await commentsResponse.json();

  // Insert data into MongoDB
  await usersCollection.insertMany(users);
  await postsCollection.insertMany(posts);
  await commentsCollection.insertMany(comments);
};

module.exports = { loadData };