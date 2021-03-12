# Blurg Server

## Description

Blurg Server houses resolvers that powers the blurg mobile app

## Hosted API Link
[Click Here](https://blurg-server.herokuapp.com/)

## API Documentation
Click [here](https://documenter.getpostman.com/view/2988092/Tz5p6xqZ) to view the API Documentation

## Tools
- [Nest](https://docs.nestjs.com/) - A framework for building efficient, scalable and modular Node.js server-side applications
- [GraphQL](https://graphql.org/) - A query language
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system
- [TypeORM](https://typeorm.io/#/) - Typescript based ORM


## Running the Publisher Server Locally

```bash
# clone the repo
$ git clone https://github.com/Felglitzzz/blurg-server.git

# cd to blurg server
$ cd blurg-server/

# Install Dependencies
$ yarn install

# Create .env file and pattern it after .env-sample file. Ensure db credentials are added to .env in this step
$ touch .env

# Run migration
$ yarn migrate

# Run the application
yarn start:dev

```
