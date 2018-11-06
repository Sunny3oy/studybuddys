const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

module.exports = {
    getCourses: (req, res, next) => {
        const url = 'https://www.coursicle.com/ccnycuny/#title=csc';
        puppeteer
        .launch()
        .then(function(browser) {
            return browser.newPage();
        })
        .then(function(page) {
            return page.goto(url).then(function() {
                return page.content();
            });
        })
        .then(function(html) {
            var htmlString = "";
            var courseIDList = [];
            var courseNameList = [];
            htmlString = html;
            var i = 0;
            while(1){
                var startPos = htmlString.indexOf("<center>");
                if(startPos == -1) break;
                startPos = startPos + 8;
                htmlString = htmlString.slice(startPos);
                var lastPos = htmlString.indexOf("</center>");
                var text = htmlString.slice(0, lastPos);
                if(text == "AAAD 298-001") break;
                if(i % 2) courseNameList.push(text);
                else courseIDList.push(text);
                i = i + 1;
            }
            res.status(201).json({
                courseID : courseIDList,
                courseName : courseNameList
            });
        })
        .catch(function(err) {
            //handle error
        });
    }
}
