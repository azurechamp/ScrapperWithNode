var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

var url = "http://www.thedailystar.net";

router.get('/', function (req, res) {
	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var data = scrapeDataFromHtml(body);
			res.send(data);
		}
		return console.log(error);
	});
});

var scrapeDataFromHtml = function (html) {
	var data = {};
	
	var $ = cheerio.load(html);
	var sectionTitle = $('a', '.creem-box').first().text().trim();
	var heading = $('h2 > a', '.creem-box').text().trim();
	var imageSource = $('a > img', '.creem-box').attr("src");
	var description = $('.intro', '.creem-box').text().trim();
	var fullNewsLink = $('a', '.creem-box').eq(2).attr("href");

	data = {
		sectionTitle: sectionTitle,
		heading : heading,
		imageSource: imageSource,
		description: description,
		fullNewsLink : url + fullNewsLink
	};
	return data;
};


module.exports = router;