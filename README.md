# Getting Started Project with Node js and ts

# University Management System Authentication Service

This is the documentation for the Authentication Service component of the University Management System. The Authentication Service provides authentication and authorization functionalities for the three main roles in the system: Admin, Student, and Faculty. It is built using TypeScript, Express.js, Zod validation, and MongoDB.

## First Create a Documentation and Analysis Your Project Feature

[Requerment Analysis & Documentation](https://docs.google.com/document/d/1GNdvX85GGiS0Jh1JmDnbPYvyLtOfYLNeFB9KJ1ZQ5s0/edit?usp=sharing)

### The documentation will include the following step

- Requerment Analysis

  - Functional Requerment
    - Authentication Service
  - Model

  - ER - Diagram
    - [lucidchart](https://www.lucidchart.com/) ( Not Free)
    - [app.diagrams](https://app.diagrams.net/) ( Free)

- API end Points

- Create Wireframe

### Then plan for trucking the project

- [Project Trucking](https://level2project.atlassian.net/jira/software/projects/UM/boards/1/roadmap)

## Functional Requirements

### Student

- Student can login and log out.
- Student can manage and update their profile.
- Student can update certain fields.

### Admin

- Admin can log in and log out.
- Admin can manage and update their profile.
- Admin can only update certain fields.
- Admin can manage user accounts:
  - Change Password

### Faculty

- Faculty can log in and log out.
- Faculty can manage and update their profile.
- Faculty can only update certain fields.

## API Endpoints

### User

- `POST /users/create-student`
- `POST /users/create-faculty`
- `POST /users/create-admin`

### Student

- `GET /students`
- `GET /students?searchTerm=fr797`
- `GET /students?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`

### Faculty

- `GET /faculties`
- `GET /faculties?searchTerm=john`
- `GET /faculties?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /faculties/:id`
- `PATCH /faculties/:id`
- `DELETE /faculties/:id`

### Admin

- `GET /admins`
- `GET /admins?searchTerm=us88`
- `GET /admins?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`

### Academic Semester

- `POST /academic-semesters/create-semester`
- `GET /academic-semesters`
- `GET /academic-semesters?searchTerm=fal`
- `GET /academic-semesters?page=1&limit=10&sortBy=year&sortOrder=asc`
- `GET /academic-semesters/:id`
- `PATCH /academic-semesters/:id`
- `DELETE /academic-semesters/:id`

### Academic Department

- `POST /academic-departments/create-department`
- `GET /academic-departments`
- `GET /academic-departments?searchTerm=math`
- `GET /academic-departments?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /academic-departments/:id`
- `PATCH /academic-departments/:id`
- `DELETE /academic-departments/:id`

### Academic Faculty

- `POST /academic-faculties/create-faculty`
- `GET /academic-faculties`
- `GET /academic-faculties?searchTerm=com`
- `GET /academic-faculties?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /academic-faculties/:id`
- `PATCH /academic-faculties/:id`
- `DELETE /academic-faculties/:id`

### Authentication

- `POST /auth/login`
- `POST /auth/change-password`
- `POST /auth/refresh-token`

## Getting Started Project Setup with Node js and ts for Backend

# Step 1 :

```
npm init - y
```

or

```
npm init
(if you want to change entry point , must be written.)
" entry point: (index.js) src/server.ts "
```

# Step 2 :

```
yarn add -D typescript
```

# Step 3 :

```
yarn add express mongoose dotenv cors
```

```
yarn add -D @types/express
```

# Step 4 :

Next configaration on typescript:

So type and enter under command line

```
tsc --init
```

next edit a file tsconfig.json

find rootDir & outDir and write

------> "rootDir" : "./src"

after the compile ts to js next js will store the dist folder

------> "outDir" : "./dist"

# Step 5 :

next create .gitignore file and write

```
node_modules
.env
```

# Step 6 :

Next, Create a GitHub repository and Create a branch-to-branch push your work

# Step 7 :

Next Create file server.ts and app.ts in src folder And create .env file in root folder

`root/.env`

```
PORT=5000

DATABASE_URL=mongodb+srv://university-admin:Ma5rRWVenevWUT0S@cluster0.qnn0nll.mongodb.net/?retryWrites=true&w=majority

DEFAULT_USER_PASS=Ma5rRWVenevWUT0S
```

`root/src/app.js`

```
import express, { Application, Request, Response } from "express";
const app: Application = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//welcome route
app.get("/", (req: Request, res: Response) => {
    res.json("Welcome to Auth Service!");
});

export default app;
```

`root/src/server.js`

```
import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

async function connectDB() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log(`Database is connected successfully!`);
        app.listen(config.port, () => {
            console.log(`App Listening on port: ${config.port}`);
        });
    } catch (error) {
        console.log("Failed to connect database!", error);
    }
}

connectDB();
```

`root/src/config/config.ts`

```
import dotenv from "dotenv";
import path from "path";

//join path
dotenv.config({ path: path.join(process.cwd(), ".env") });

//export
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_user_pass: process.env.DEFAULT_USER_PASS,
};

```

# Step 8 :

Next Compiles Your TS app

```
yarn add ts-node-dev --dev
```

and

add this code in package.json file

```
"scripts": {
        "start": "ts-node-dev --respawn --transpile-only src/server.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
```

# Step 9 :

Run Application

```
npm start
```

# Step 10 :

Next Setup ESLint

Add this code to tsconfig.json and of course add top

```
"include": ["src"], // which files to compile
"exclude": ["node_modules"], // which files to skip
```

# Step 11 :

Next install eslint

```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

# Step 12 :

Next Create a eslint file on the root

`root/.eslintrc`

```
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint"],
  // HERE
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },

  "env": {
    "browser": true,
    "es2021": true
  }
}
```

# Step 13 :

add this code in package.json

```
        "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
        "link:fix": "eslint --fix",
```

For Example:

```
"scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/server.ts",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "link:fix": "eslint --fix",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

# Step 14 :

Next Create a .eslintignore file

`root/.eslintignore`

```
node_modules
dist
.env
```

# step 15:

Setup Prettier

Next install Prettier

```
yarn add -D prettier
```

# Step 16 :

Next Create a eslint file on the root

`root/.prettierrc`

```
{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

# Step 17 :

add this code in package.json

```
    "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "lint-prettier": "yarn lint:check && yarn prettier:check",

```

For Example:

```
"scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/server.ts",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "eslint --fix",
    "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "lint-prettier": "yarn lint:check && yarn prettier:check",
    "prettier:fix": "prettier --write .",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

# Step 18 :

Next Install

```
yarn add -D eslint-config-prettier
```

# Step 19:

Next Install

```
yarn add husky --dev
```

# Step 20:

Next Install

```
yarn husky install
```

# Step 21:

Next Install

```
yarn husky add .husky/pre-commit "npm test"
```

and Open root/.husky/pre-commit and edit

npm test ---------to----------> yarn lint-staged

# Step 22:

Next Install

```
yarn add -D lint-staged
```

and also add this code in package.json on devDependencies

```
"lint-staged": {
    "src/**/*.ts": "yarn lint-prettier"
  },
```

For Example :

```
{
  "name": "university-managment",
  "version": "1.0.0",
  "description": "",
  "main": "src/server.ts",
  "scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/server.ts",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "eslint . --fix",
    "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "lint-prettier": "yarn lint:check && yarn prettier:check",
    "prettier:fix": "prettier --write .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "satyjit",
  "license": "ISC",
  "lint-staged": {
    "src/**/*.ts": "yarn lint-prettier"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@typescript-eslint/eslint-plugin": "^5.59.11",
    "@typescript-eslint/parser": "^5.59.11",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^8.8.0",
    "husky": "^8.0.3",
    "lint-staged": "^13.2.2",
    "prettier": "^2.8.8",
    "ts-node-dev": "^2.0.0"
  },
  "dependencies": {
    "@typescript-eslint/typescript-estree": "^5.59.11",
    "cors": "^2.8.5",
    "dotenv": "^16.1.4",
    "express": "^4.18.2",
    "exprss": "^0.0.1-security",
    "mongoose": "^7.2.2",
    "typescript": "4.5.2"
  }
}
```

---

---

## Working To next prosidure...

---

---

# Step 23:

Next SetUp Logger

So Need to Install Winston from npm

```
yarn add winston
```

# Step 24:

Next SetUp winston-daily-rotate-file
A transport for winston which logs to a rotating file each day

So Need to Install winston-daily-rotate-file

```
yarn add winston-daily-rotate-file
```

# Step 25:

Next SetUp ZOD.
Zod is a TypeScript-first schema declaration and validation library.

So Need to Install ZOD

```
yarn add zod
```
