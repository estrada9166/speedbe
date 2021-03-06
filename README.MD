# Speedbe

Speedbe will help you to create a backend with `Node.js` and express.

## Install
```shell
$ npm install -g speedbe
```
## use
```shell
$ speedbe
```
It should make multiples question, like:
  + Name of the project (It will create a folder in the root that you call `speedbe`)
  + Has authentication (It will create a middleware that validate if the token set on the headers is valid with JWT)
  + Has .ENV variables (In case that the response of the previous question is `No`, it will ask to create a global file with the .env variables)
  + Want to upload files (It will create a file and an endpoint to upload files to AWS S3, you must update the variables)

## Project Structure
```shell
├── index.js
├── node_modules
├── package-lock.json
├── package.json
├── routes
├── models
├── variables.env
├── variables.env.example
└── variables.env.now
```
`variables.env.example` is the file that serves as example for other people contributing to your project, it contains all the needed *env* variables with dummy values to be replaced after your project gets cloned (`variables.env` does not get tracked by git).

## Before running this project (after cloned from *github*)
* change the name of `variables.env.example` to `variables.env`
* inside `variables.env` replace the value of the variables with your values

## How to Run this project
```shell
$ node index
```

## Mongoose
You can choose if you want to use [mongoose](http://mongoosejs.com/) in your project.

If you choose to use it, we recomend you to create an account on [mlab](https://mlab.com/), it is free; after that create a new database. To use it your project, you should paste the MongoDB URI (the one that you find after creating the database) in the files `variables.env` and `variables.env.now`

The models have others packages like:
+ validator: in this case we use it to validate if it is a valid email. You can find the package [here](https://www.npmjs.com/package/validator)
+ mongoose-mongodb-errors: it is a plugin to transform mongodb like errors (E.G. "11000 - duplicate key") into Mongoose ValidationError instances. You can find the package [here](https://www.npmjs.com/package/mongoose-mongodb-errors)
+ mongoose-cipher: it is a plugin to encrypt the fields that you select before saving them on the database. You can find the package [here](https://www.npmjs.com/package/mongoose-cipher)

Almost all the fields of the database are using `trim`, it means that if a user is trying to save strings like `"  hello"`, or `"hello  "`, or `"  hello  "`, would end up being saved as `"hello"`.

## Standard
The project use standard, to run it simple run your project folder:
```bash
$ npm run standard
```
And if you want to fix all the issues automatically with the help of standard, run:
```bash
$ npm run standard-fix
```

## JWT
To use it you should create a JWT and set it in each request using the headers. It is with Bearer authentication.

To create a new token, you can make a post to the endpoint toke, with the data you want to pass to it:
```
POST /token
```
The response should be something like:
```
{
    "success": true,
    "type": "Bearer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
}
```
To learn more about JWT click [here](https://jwt.io/)

## Endpoints
### With Mongoose
Request      | Response 
-------------|----------------------------
GET /example | This will return the example with identificator `A1`
POST /example| This will create a new example
PUT /example | This will update the name of the example with identificator `A1`
DELETE /example | This will delete the user with identificator `A1`

### With out Mongoose
Request      | Response 
-------------|----------------------------
GET /example | This is a /GET example
POST /example| This is a /POST example, you just post ${test}
PUT /example | This is a /PUT example, you just put ${test}
DELETE /example | This is a /DELETE example, you just deleted ${test}
## Deploy with Now
Simple run:
```bash
$ npm run deploy
```
In case this is your first time using [now](https://zeit.co/now), follow the steps and that's all.

The file `variables.env.now` is used to set the environment variables in your deploy, the file is not uploaded to the server, `now` read it and set the variables on a secure environment for you.
## License
### The MIT License

Copyright (c) 2017 Alejandro Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.