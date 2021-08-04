const { Router } = require('express');

//Importamos los routers
const getUser = require('./user/get.user.js');
const postUser = require('./user/post.user.js');
const putUser = require('./user/put.user.js');
const delUser = require('./user/delete.user.js');

const operations = require('./operations/get.operations.js');
const postOperation = require('./operations/post.operations.js');
const putOperation = require('./operations/put.operations.js');
const delOperation = require('./operations/delete.operations.js');

const router = Router();

// Configuramos los routers
router.use('/users', getUser);
router.use('/users', postUser);
router.use('/users', putUser);
router.use('/users', delUser);

router.use('/operations', operations);
router.use('/operations', postOperation);
router.use('/operations', putOperation);
router.use('/operations', delOperation);


module.exports = router;