const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
    getCourses: (req, res, next) => {
        const options = {
            uri: 'https://www.ccny.cuny.edu/compsci/course-descriptions-syllabi-and-course-outcomes',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
        .then(($) => {
            var i;
            var courseNameList = [];
            var name = "";
            for (i = 0; i < 20; i++) {
                name = $('.field-items').eq(4).find('table').first().find('tbody').children().eq(i).children().first().text();
                name = name.substr(1, 9);
                courseNameList.push(name);
            }
            res.status(201).json({courseName : courseNameList});
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
