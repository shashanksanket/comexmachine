'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "role" to table "users"
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2023-03-01T08:10:48.430Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "role",
        {
            "type": Sequelize.STRING,
            "field": "role",
            "allowNull": true
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
