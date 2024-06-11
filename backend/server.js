import Express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser';
import cors from 'cors';

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database name
const dbName = 'keykeep_db';
const app = Express()
const port = 3000
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))

client.connect();
const db = client.db(dbName)
const collection = db.collection('passwords')

// Get all the passwords
app.get('/', async(req, res) => {
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save a password
app.post('/', async(req, res) => {
  const passwordData = req.body;
  const postResult = await collection.insertOne(passwordData);
  res.send({success: true, result: postResult});
})

// Delete a password
app.delete('/', async(req, res) => {
  const passwordId = req.body;
  const deleteResult = await collection.deleteOne(passwordId);
  res.send({success: true, result: deleteResult})
})

// Clear database
app.delete('/clearDB', async(req, res) => {
  const deleteResult = await collection.deleteMany({});
  res.send({success: true, result: deleteResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})