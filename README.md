# apache-kafka
open source softwares homework
# Simple CDC Application with Apache Kafka

This is a simple Change Data Capture (CDC) application developed using Node.js, MongoDB, and Apache Kafka. The application is designed to query a specified collection in MongoDB, detect newly added documents, and produce JSON messages to Apache Kafka. There are two components: a producer application (A) that queries MongoDB and publishes messages to a Kafka topic, and multiple consumer applications (B) that consume messages from the Kafka topic and print them to the console.

## Project Status

⚠️ **Notice: This project is currently not working due to an issue with Kafka.**

We are currently experiencing difficulties with the Kafka setup, which is preventing the proper functioning of the application. We are actively investigating the issue and working towards resolving it.

We apologize for any inconvenience caused. Please check back later for updates on the project status.


## How To Run

After cloning and installing this repository go to the directory where the project is installed.

```bash
  docker-compose up
```

