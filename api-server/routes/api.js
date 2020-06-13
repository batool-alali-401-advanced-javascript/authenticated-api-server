'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories-mod/categories-model.js');
const products = require('../models/products-mod/products-model.js');


/**
* Module model
* @module router
*/

/**
 * getModel
 * @param   req
 * @param   res
 * @param   next
 */

function getModel(req,res,next){
  let model = req.params.model;
  // console.log(model);
  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}
router.param('model', getModel);
router.get('/:model',handelGetAll);
router.post('/:model',handelPost);
router.get('/:model/:id',handelGetOne);
router.put('/:model/:id',handelUpdate);
router.delete('/:model/:id',handelDelete);

/**
 * Function handelGetAll
 * @param   req
 * @param   res
 * @param   next
 */

function handelGetAll(req,res,next){
  // console.log('hi');
  req.model.get()
    .then(results=>{
      let count = results.length;
      res.json({count,results});
    }).catch(next);
}
/**
 * Function handelGetOne
 * @param   req
 * @param   res
 * @param   next
 */
function handelGetOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

/**
 * Function handelPost
 * @param   req
 * @param   res
 * @param   next
 */
function handelPost(req,res,next){
  req.model.create(req.body)
    .then(results=>{
      res.json(results);
    }).catch(next);
}

/**
 * Function handelDelete
 * @param   req
 * @param   res
 * @param   next
 */
function handelDelete(req,res,next){
  let id = req.params.id;
  req.model.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

/**
 * Function handelUpdate
 * @param   req
 * @param   res
 * @param   next
 */
function handelUpdate(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
module.exports = router;