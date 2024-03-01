# Portfolio Monsters Microservice

![Cover Image](./public/images/portfolio-monsters-ms.svg)

This is the microservice responsible for handling monster-related data in the application.

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/crisgarlez/portfolio-monsters-ms.git
```

2. Install project dependencies:

```
cd portfolio-monsters-ms
npm install
```

## Configuration

Before running the microservice, you need to configure some environment variables. Create a .env file at the root of the project and set the following variables:

```
AMQP_URL=AMQP_SERVER_URL
MONSTERS_MS_QUEUE_NAME=MONSTERS_QUEUE_NAME
PORT=MICROSERVICE_PORT
```

## Usage

To run the microservice, simply execute the following command:

```
npm start
```
