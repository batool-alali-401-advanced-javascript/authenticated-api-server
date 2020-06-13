'use strict';


const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const mongoose = require('mongoose');


const SECRET = process.env.SECRET || 'batool123';

/**
 * User Model
 * @module
 * @param {object}  - The record of the book.
 */

const Users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, require:true, default:'user',enum: ['user','writer','editor','administrator']},
}); 

const  user = ['read'];
const writer = ['read', 'create'];
const editor = ['read', 'create', 'update' ];
const administrator = ['read', 'create', 'update', 'delete'];

/**
 * Hashing the passward and save a record
 * @returns {void} nothing
 */

Users.pre('save', async function () {
  
  //Pre middleware functions are executed one after another, when each middleware calls next.
  // beforeSave => do the hash() 
  // resource1 https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
  // resourse2 https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  this.password = await bcrypt.hash(this.password, 5);
});


/**
 * Basic Auth
 * @param {object} auth - The authintication object 
 * @returns {string} hashed password
 */
Users.statics.basicAuth = function (auth) { 
// Statics defining functions that exist directly on your Model.
// resource1 https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// resourse2 https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
// compare  password with a hashed password
  let password = { username: auth.user };
  return this.findOne(password)
    .then(user => {
      return user.passwordComparator(auth.pass);
    })
    .catch(console.error);
};

/**
 * Password Comparator
 * @param {string} pass - The authintication object 
 * @returns {string} password if valid
 */

Users.methods.passwordComparator = function (pass) {
  /// we can use 'this' key word
  //// resourse1: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null;
    });
};

/**
 * Can 
 * @param {string} role - The roles array 
 * @returns {Array} array of  capabilities
 */

Users.methods.can = function (role){
  let capabilities;
  if (role === 'user'){
    capabilities = user;
  }else if (role === 'writer')
  {
    capabilities = writer;
  }else if( role === 'editor'){
    capabilities= editor;
  }else if (role === 'administrator'){
    capabilities=administrator;
  }
  return capabilities;
};

/**
 * Token Generator
 * @returns {object} token
 */

Users.methods.tokenGenerator = function () {
  let capabilities= this.can(this.role);
  let token = 
  jwt.sign({  role: this.role, id:this._id ,user:this.username,capabilities: capabilities ,expiresIn:  900000, algorithm:  'RS256' }, SECRET);  return token;
};

/**
 * Authenticate Token
 * @param {string} token - The token  
 * @returns {object} user token object
 */

Users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = await jwt.verify(token, SECRET);

    if (tokenObject.user) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject('User is not found!');
    }
  } catch (e) {
    return Promise.reject(e.message);
  }
};

/**
 * list
 * @returns {Array} list of user 
 */

Users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};


module.exports = mongoose.model('users', Users);