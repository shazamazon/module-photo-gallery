# Shazamazon

> Photo gallery component of a magic-themed clone of Amazon's product page

View proxy [here](https://github.com/shazamazon/proxy-photo-gallery).

## Contributors

  - [Navigation and Search](https://github.com/shazamazon/module-nav-search-bar) - [Sean McCarthy](https://github.com/SeanMcCarthy3223)
  - [Item Description](https://github.com/shazamazon/module-item-description) - [Whitney Lee](https://github.com/wiggitywhitney)
  - [Cart](https://github.com/shazamazon/module-cart) - [John Connolly](https://github.com/jkcryptolock)
  - [Carousel](https://github.com/shazamazon/module-the-best-carousel) - [Jeff Salinas](https://github.com/JeffSalinas)
  - [Questions & Answers](https://github.com/shazamazon/modules-qa) - [Gibran Iqbal](https://github.com/Jibbscript)
  - [Reviews](https://github.com/shazamazon/module-reviews) - [Arohan Dutt](https://github.com/ArohanD)

## Getting Started

> Follow these instructions to get a development environment running.

### Requirements

- Node 10.16.0 or a later version
- nodemon
- MongoDB

### Prerequisites

Currently, the application is connected to MongoDB Atlas. Create a database using MongoDB on your local machine and invoke the `seedDatabase` function defined in `database/index.js`. Then, update `URI` in `database/index.js` to reflect address of local database.

### Installation

From within the root directory, install dependencies:

```
npm install
```

Start MongoDB:

```
mongod
```

Bundle modules with webpack:

```
npm build
```

Start server:

```
npm start
```

Navigate to http://localhost:8369.

## Built With

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)