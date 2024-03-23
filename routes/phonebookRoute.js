const express = require('express');
const router = express.Router();
const phonebookController = require('../controllers/phonebookController');

module.exports = () => {
    router.get('/', phonebookController.getIndex);
    router.get('/Add', phonebookController.getAddIndex);
    router.get('/Update/:phone', phonebookController.getUpdateIndex);
    router.post('/Add', phonebookController.addController);
    router.post('/Update', phonebookController.updateController);
    router.post('/Delete', phonebookController.deleteController);

    return router;
}
