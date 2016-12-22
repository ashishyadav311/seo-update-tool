var config = require('services/config');
var query = require('services/query');

function getAllTemplateIds() {
    return query.getAllTemplateIds().then(function(response) {
        let url_category_id = {};
        for (var i in response) {
            for (var j in response[i]) {
                url_category_id[response[i]["id"]] = response[i]["name"];
            }
        }
        config.templatesMapping = url_category_id;
        return config.templatesMapping;
    }, function(error) {
        return error;
    })
}

function getBreadcrumbMapping(queryObj) {
    if (queryObj.id) {
        var id = queryObj.id
        return query.getAllMapping(parseInt(id)).then(function(response) {
            if (Object.keys(config.templatesMapping).length !== 0) {
                for (var i in response) {
                    response[i]["url_category_id"] = config.templatesMapping[response[i]["url_category_id"]];
                    response[i]["sub_url_category_id"] = config.templatesMapping[response[i]["sub_url_category_id"]];
                }
            }
            return response;
        }, function(error) {
            throw error;
        })
    } else {
        throw new Error("no id passed");
    }
}

module.exports = {
    getAllTemplateIds: getAllTemplateIds,
    getBreadcrumbMapping: getBreadcrumbMapping
}