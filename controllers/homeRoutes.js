const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('WELCOME HOME (SANITARIUM)');
});

module.exports = router;
