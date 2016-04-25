'use strict';

var dbPath = require('path').join(__dirname, '../data/sql.db')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath);

module.exports = db;
