const { Router } = require('express');

//Importamos los routers
const user = require('./user/user.js');

const operations = require('./operations/get.operations.js');
const postOperation = require('./operations/post.operations.js');
const putOperation = require('./operations/put.operations.js');
const delOperation = require('./operations/delete.operations.js');

const router = Router();

// Configuramos los routers
router.use('/users', user);

router.use('/operations', operations);
router.use('/operations', postOperation);
router.use('/operations', putOperation);
router.use('/operations', delOperation);


module.exports = router;