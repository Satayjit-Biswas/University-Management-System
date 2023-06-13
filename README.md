# Getting Started Project with Node js and ts

## Frist Create a Documentation and Analysis Your Project Feature

[Requerment Analysis & Documentation](https://docs.google.com/document/d/1GphXZGrruRQ1Pq3TMG1PAcrX0zNL7l6ymfQLt038tRw/edit)

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

###s Then plan for trucking the project

- [Project Trucking](https://level2project.atlassian.net/jira/software/projects/UM/boards/1/roadmap)

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

$\colorbox{green}{root/.env}$

```
PORT=5000

DATABASE_URL=mongodb+srv://university-admin:Ma5rRWVenevWUT0S@cluster0.qnn0nll.mongodb.net/?retryWrites=true&w=majority

DEFAULT_USER_PASS=Ma5rRWVenevWUT0S
```

$\colorbox{green}{root/src/app.js}$

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

$\colorbox{green}{root/src/server.js}$

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

$\colorbox{green}{root/src/config/config.ts
}$

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

$\colorbox{green}{root/.eslintrc}$

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

$\colorbox{green}{root/.eslintignore}$

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

$\colorbox{green}{root/.prettierrc}$

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
