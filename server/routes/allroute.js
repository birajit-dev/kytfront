const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const sessions = require('express-session');

const allController = require('../controller/allcontroller');
const WebController = require('../controller/WebController');


//KYT Router//
router.get('/', allController.homePage); // HOMEPAGE
router.get('/vdetails/:url', allController.videoDetails); // Video View URL
router.get('/horoscopedetails', WebController.horoscopeDetails); //Horoscope Details
router.get('/panchang', WebController.panchangPage); //
router.get('/videos', WebController.videosPage);
router.get('/blogs', WebController.blogsPage);
router.get('/horoscope', WebController.horoscopePage);
router.get('/horoscopedetails/:url', WebController.horoscopeDetails);
router.get('/vcategory/:category', WebController.cateVideos);








//ERROR//
router.get('/error/404', allController.Error);










module.exports = router;
