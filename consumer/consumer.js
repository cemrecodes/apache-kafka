const kafka = require('kafka-node');

const kafkaTopic = 'my-topic';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); 
const consumer = new kafka.Consumer(client, [{ topic: my-topic }]);

consumer.on('message', (message) => {
  console.log('Received Kafka message:', message.value);
});

consumer.on('error', (err) => {
  console.error('Error consuming Kafka message:', err);
});
