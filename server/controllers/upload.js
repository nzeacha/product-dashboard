var multer = require('multer');

var storage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './reports');
        },
        filename: function (req, file, callback) {
            var id = (req.session.user.id === undefined) ? '' + parseInt(Math.random() * 1000) : req.session.user.id;
            callback(null, id + '-' + Date.now() + "-" + file.originalname);
        }
    })
}).single('reportFile');

module.exports = storage;