## NodeJS + Typescript MongoDB template

This application uses mongo database with mongoose. it provides a start rest api
to create, read, update and delete notifications.

##### Development

This application was developed using TDD(Test Driven Development) using SOLID principles.

#### This project uses

- Typescript
- Jest for unity tests
- MongoDB
- Mongoose
- Tsyringe for dependency injection
- Eslint
- Prettier

#### Install dependencies

\$ 'yarn' or 'npm install'

#### Start Development Application

\$ yarn dev

#### Build Application

\$ yarn build

#### Run Tests

\$ yarn test

#### Routes

##### get /notifications

it will return all notifications with pagination. if 'unread' query string is passed,
it will return only the unread notifications.

##### get /notifications/:id

it will return a single notification based on provided \_id.

##### post /notifications

it will create a notification if passes a content on body.

##### patch /notifications/:id

it will mark the specific notification as read.

##### delete /notifications/:id

it will delete a single notification based on provided \_id.
