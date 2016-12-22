'use strict';
let mongoClient = require('mongodb').MongoClient,
    mongo = {};

function _connect(callback) {
    mongoClient.connect(process.env.MONGO_DB_URL, (err, db) => {
        if (err) {
            callback(err);
        } else {
            callback(null, db);
        }
    })
}

mongo.insert = function(collection, document) {
    return new Promise((resolve, reject) => {
        _connect((err, db) => {
            if(!err){
                db.collection(collection).insertOne(document, (err, result) => {
                    if (err) {
                        console.error(`Error inserting a document: ${err}`);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    db.close();
                });    
            }else{
                reject(err);
            }
            
        });
    });
}

mongo.find = function(collection, query = {}, options = {limit:10}) {
    return new Promise((resolve, reject) => {
        _connect((err, db) => {
            if(!err){
                let cursor = db.collection(collection).find(query).sort({'timestamp':-1}).limit(options.limit);
                let count = cursor.count();
                count.then((result) => {
                    let finalResult = [];
                    if (result == 0) {
                        resolve(finalResult);
                    } else {
                        cursor.each((err, doc) => {
                            if (err) {
                                console.error(`error finding document --> ${err} --> ${query}`);
                                reject(err);
                            } else {
                                if (doc) {
                                    finalResult.push(doc); 
                                }else{
                                    db.close();
                                    resolve(finalResult);
                                }
                            }
                        });
                    }
                },(err)=>{
                    reject(err);
                });
            }else{
                reject(err);
            }
        });
    });
}



mongo.replace = function(collection, filter, document, options = { upsert: true }) {
    return new Promise((resolve, reject) => {
        _connect((err, db) => {
            if(!err){
                db.collection(collection).replaceOne(filter, document, options, (err, result) => {
                    if (err) {
                        console.error(`error finding document --> ${err} --> ${query}`);
                        reject(err);
                    } else {
                        db.close();
                        resolve(result);
                    }
                });
            }else{
                reject(err);
            }
        });
    });
}

mongo.test = function() {
    _connect((err, db) => {
        if (err) {
            console.error(`Mongo error --> ${err}`);
        } else {
            console.info(`Mongo connection successful`);
            db.close();
        }
    });
}

module.exports = mongo;