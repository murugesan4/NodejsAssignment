const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/node_assignment';
let db;

const connectToDatabase = async () => {
  if (db) return db;
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
};

module.exports = { connectToDatabase };