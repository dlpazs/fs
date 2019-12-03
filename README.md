Create a simple react application in typescript:
[x] Must be able to display all models created in backend correctly
[x] Must implement the actions created in the backend ie editing and creating entries
[x] Must display a dynamic list
[ ] Must implement redux
[x] do not worry about styling
[x] Implement navigation if you have time

Create a node express server in typescript:
[x] Create as a rest api
[x] Must have a user model – simple authentication
[x] Must include a many to one relationship ( A user can make many posts.)
[x] Must include many to many relationship ( Posts can have many likes)
(example post has many users who like it and user can like many posts)
[x] Must be able to create update delete each type of object
[ ] Preferably use a typeorm to manage the database
[x] Recommend framework https://github.com/cdimascio/generator-express-no-stress , not required to use this if you are more comfortable using others or building your own.

Deployment
[x] Both client and server must be deployed and connected,
[x] Deployment server heroku
[ ] Submission, allow us access to git repo

# Typescript Node React Starter

Server:

![dependencies Status](https://img.shields.io/david/deskoh/Typescript-Node-React-Starter.svg?style=flat)
![devDependencies Status](https://img.shields.io/david/dev/deskoh/Typescript-Node-React-Starter.svg?style=flat)

Client:

![dependencies Status](https://img.shields.io/david/deskoh/Typescript-Node-React-Starter.svg?path=src-client&style=flat)
![devDependencies Status](https://img.shields.io/david/dev/deskoh/Typescript-Node-React-Starter.svg?path=src-client&style=flat)

Starter project for Node and React written in Typescript.

## Install Dependencies

- Install dependencies for server (backend)

  ```bash
  npm install
  ```

- Install dependencies for client (frontend)

  ```bash
  cd src-client
  npm install
  ```

## Folder Structure

| Name                         | Description                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| **.vscode**                  | Contains VS Code specific settings                                                        |
| **dist**                     | Contains the output from TypeScript build for server (Node).                              |
| **public**                   | Static assets that will be used client side.                                              |
| **public/dist**              | Contains the output from TypeScript build for client (React).                             |
| **node_modules**             | Contains all your npm dependencies                                                        |
| **src**                      | Contains your source code for server (Node) that will be compiled to the dist dir         |
| **src**/server.ts            | Entry point to your express app                                                           |
| tsconfig.json                | Config settings for compiling server code written in TypeScript                           |
| **src-client**               | Contains your source code for client (React) that will be compiled to the public/dist dir |
| **src-client**/tsconfig.json | Config settings for compiling server code written in TypeScript                           |
| tslint.json                  | Config settings for TSLint code style checking                                            |

## VS Code Debug Configuration

### Launch Server

For debugging server / backend Typescript source in `src` folder. No JavaScript files will be transpiled to disk.

### Launch Server (Watch)

Same as `Launch Server` configuration but in watch mode. Server will restart and VS code will re-attach when source has changed.

> Note: In launch configuration `"program": "${workspaceFolder}/node_modules/nodemon/bin/nodemon"` can be replaced by `runtimeExecutable": "nodemon"`, however the `nodemon` process will not be terminated when debugging is stopped.

### Launch Browser

Debug source files in `src-client` in Google Chrome browser. `webpack dev server` has to be started first (using `npm run dev:client`).

### Launch All

Starts debug configuration `Launch Server` and `Launch Browser`.

## NPM Scripts

| Npm Script   | Description                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| `start`      | Runs node on `dist/server.js` which is the app entry point at localhost:3000            |
| `dev`        | Runs backend server in watch mode at localhost:3000.                                    |
| `build`      | Runs build tasks for backend                                                            |
| `lint`       | Lint backend TS files                                                                   |
| `dev:client` | Runs frontend server in watch mode at localhost:8080.                                   |
| `dev-all`    | Runs project (backend at localhost:3000 and frontend at localhost:8080]) in watch mode. |
| `build-all`  | Full build. Runs ALL build tasks for backend and frontend                               |
| `lint-all`   | Lint frontend and backend TS files                                                      |
