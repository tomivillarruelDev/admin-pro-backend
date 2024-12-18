/*
    Path: 'api/upload'
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnFile } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateJWT, fileUpload);

router.get('/:type/:img', returnFile);

module.exports = router;
