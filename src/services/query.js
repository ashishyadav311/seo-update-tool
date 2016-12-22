var db = require('./db');

function getAllTemplateIds() {
    var query = 'Select id ,name  FROM url_categories;'
    return new Promise(function(resolve, reject) {
        db.executeQuery(query, '', function(error, result) {
            console.log(error,'######', result);
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
