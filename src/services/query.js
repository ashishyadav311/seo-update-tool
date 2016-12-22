var db = require('./db');

function getAllTemplateIds() {
    var query = 'Select id ,name  FROM url_categories;'
    return new Promise(function(reject, resolve) {
        db.executeQuery(query, '', function(error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getAllTemplateIds: getAllTemplateIds
}
