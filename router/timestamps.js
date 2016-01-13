var express = require('express'),
    router = express.Router(),
    Msg = require('../helper/msg');
    
router.use(function (req, res, next) {
	console.log('Receive connection.');
	next();
});

router.get('/', function (req, res) {
	res.json({ message: "This is a timestamp API in node!"});
})
    
router.route('/:ts').get( function (req, res) {
	Msg.interpretTime(req.params.ts, function (err, time) {
		if (err) {
			return res.send(err);
		}
		res.json(time);
	});
});

module.exports = router;
    