'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "stocks", deps: []
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2023-04-28T04:13:47.413Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "stocks",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "Title": {
                "type": Sequelize.STRING,
                "field": "Title",
                "allowNull": false
            },
            "Description": {
                "type": Sequelize.STRING,
                "field": "Description",
                "allowNull": false
            },
            "Rate": {
                "type": Sequelize.STRING,
                "field": "Rate",
                "allowNull": false
            },
            "location": {
                "type": Sequelize.STRING,
                "field": "location",
                "allowNull": false
            },
            "condition": {
                "type": Sequelize.STRING,
                "field": "condition",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
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
