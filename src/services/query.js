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

function getAllMapping(id) {
    var query = 'select * from url_category_breadcrum_mapping where url_category_id = ?;'
    return new Promise(function(resolve, reject) {
        db.executeQuery(query, [id], function(error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getAllTemplateIds: getAllTemplateIds,
    getAllMapping: getAllMapping
}
