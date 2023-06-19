const kafka = require('kafka-node');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017'; 
const mongoDbName = 'book'; 
const collectionName = 'books'; 
const kafkaTopic = 'my-topic'; 

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); 

function connectToMongoDB() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoUrl, (err, client) => {
      if (err) {
        reject(err);
      } else {
        const db = client.db(mongoDbName);
        const collection = db.collection(collectionName);
        resolve(collection);
      }
    });
  });
}

function sendKafkaMessage(producer, message) {
  const payloads = [
    {
      topic: my-topic,
      messages: JSON.stringify(message),
    },
  ];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending Kafka message:', err);
    } else {
      console.log('Kafka message sent:', data);
    }
  });
}

function startProducer() {
  const producer = new kafka.Producer(client);

  producer.on('ready', async () => {
    console.log('Kafka producer is ready');

    try {
      const collection = await connectToMongoDB();
      let lastDocumentId = null;

      setInterval(async () => {
        const query = lastDocumentId ? { _id: { $gt: lastDocumentId } } : {};

        collection.find(query).toArray((err, documents) => {
          if (err) {
            console.error('Error querying MongoDB:', err);
          } else {
            if (documents.length > 0) {
              const newDocuments = documents.map((doc) => {
                return {
                  id: doc._id,
                  name: doc.name,
                  author: doc.author
                };
              });
              sendKafkaMessage(producer, newDocuments);
              lastDocumentId = documents[documents.length - 1]._id;
            }
          }
        });
      }, 10000);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  });

  producer.on('error', (err) => {
    console.error('Error connecting to Kafka:', err);
  });
}

startProducer();
