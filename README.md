# WebFlix: a Fullstack Netflix Clone

<!-- ![image](https://user-images.githubusercontent.com/23248726/220005380-ede4fb14-0b8d-4582-a063-3cc4beeccfb7.png) -->

This is a repository for a FullStack Netflix Clone using `React`, `NextJS`, `TailwindCSS` & `Prisma`.

This is me following the instructions on **Code With Antonio** [video](https://www.youtube.com/watch?v=mqUN4N2q4qY) with some of my own changes.

### My additions

- Use NextJS's new App Router.
- Use a local MongoDB cluster as a replica set

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/kenan-altaki/webflix.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```

### Initialise local cluster

```shell
chmod +x init_mongodb.sh
./init_mongodb.sh
```

### Start the app

```shell
npm run dev
```
