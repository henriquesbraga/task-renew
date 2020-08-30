const { Router } = require('express');
const {save} = require('./controllers/usernameController');
const {signin} = require('./config/auth');
const {getTasks, insert, remove, toggleTask} = require('./controllers/tasksController');
const pass = require('./config/passport')();

const router = Router();

router.post('/signup', save);
router.post('/signin', signin);

router.get('/tasks', pass.authenticate(), getTasks );
router.post('/tasks', pass.authenticate(), insert);
router.delete('/tasks/:id', pass.authenticate(), remove);
router.put('/tasks/:id/toggle', pass.authenticate(), toggleTask);

module.exports = router;
