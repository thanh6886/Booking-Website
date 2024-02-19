# Booking Website (MERN Stack)

## Booking Website

The website makes booking accommodations while traveling easier. The website includes client-side functionalities such as viewing hotels, searching for hotels, logging in, and registering an account. On the admin-side, the owner can add/edit/delete rooms, track revenue, and monitor occupied rooms.

## Demo

\*Note: Please open link server-side first.

- Client-role account: `email: test@test.com`, `password: 12345`
- Admin-role account: `email: test2@test.com`, `password: 12345`

## Project Breakdown

### API Server

- Directory: Server
- Features:
  - [x] Building api server (MVC model) - CRUD operations
  - [x] Generating schema models
  - [x] Session-cookie to store data login user.
  - [x] Authenticating based on user role.
  - [x] Connect and manage data on MongoDB

### Client App

- Directory: Client App
- Features:
  - [x] Developing Login/Sign up page
  - [x] Home page, Search page, Detail product page
  - [x] Search page was build on logic to check available room based on date range input, amount of people.
  - [x] Redux/Redux Toolkit to store some
  - [x] React-router
  - [x] See history of transactions

### Admin App

- Directory: Admin App
- Features:
  - [x] Login page - authenticate role admin.
  - [x] Dash-board to summarize data.
  - [x] Create/Update/Delete Hotel, Room
  - [x] Show all transactions on system
  - [x] User Page - manage and set role for user

### Deployment on local

#### Prerequisites

- MongoDB
- NodeJS
- npm

#### Client-side (Dir: Client App)

- Access src/util/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  client      // go to client folder
$ yarn # or npm i     // install packages
$ npm start     // run it locally
```

#### Admin-side (Dir: Admin App)

- Access ./src/utils/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  Admin App      // go to client folder
$ yarn # or npm i     // install packages
$ npm start     // run it locally
```

#### Server-side (Dir: Server)

- Access ./src/utils/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  Admin App      // go to client folder
$ yarn # or npm i     // install packages
$ npm run start:dev     // run it locally
```
