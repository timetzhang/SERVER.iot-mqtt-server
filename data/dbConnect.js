/*
 * Name / 数据库连接
 * Author / T.T
 * Time / 2016-10-30
 */
const MongoClient = require("mongodb").MongoClient;
const config = require('./config');
const dbOptions = { useNewUrlParser: true };
module.exports = {
  find: function(query) {
    return new Promise(resolve => {
      MongoClient.connect(
        config.url,
        dbOptions,
        function(err, client) {
          //连接到表 site
          if (err) {
            resolve(err);
          } else {
            const db = client.db(config.database);
            var col = db.collection(query.collection);
            col
              .find(query.condition)
              .project(query.projection)
              .limit(query.limit)
              .skip(query.skip)
              .sort(query.sort)
              .toArray(function(err, result) {
                if (err) {
                  resolve(err);
                  return;
                }
                resolve(result);
                client.close();
              });
          }
        }
      );
    });
  },
  insert: function(query) {
    return new Promise(function(resolve) {
      MongoClient.connect(
        config.url,
        dbOptions,
        function(err, client) {
          if (err) {
            resolve(err);
          } else {
            const db = client.db(config.database);
            var col = db.collection(query.collection);
            col.insert(query.data, function(err, result) {
              if (err) {
                resolve(err);
                return;
              }
              resolve(result);
              client.close();
            });
          }
        }
      );
    });
  },
  update: function(query) {
    return new Promise(function(resolve) {
      MongoClient.connect(
        config.url,
        dbOptions,
        function(err, db) {
          if (err) {
            resolve(err);
          } else {
            const db = client.db(config.database);
            var col = db.collection(query.collection);
            col.update(query.condition, { $set: query.data }, function(
              err,
              result
            ) {
              if (err) {
                resolve(err);
                return;
              }
              resolve(result);
              db.close();
            });
          }
        }
      );
    });
  }
};