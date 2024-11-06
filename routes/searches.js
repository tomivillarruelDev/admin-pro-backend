/*
    Path: api/all
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getResults,
    getCollectionsResults,
} = require('../controllers/searches');

const router = Router();

router.get('/:search', validateJWT, getResults);

router.get('/collection/:table/:search', validateJWT, getCollectionsResults);

module.exports = router;
