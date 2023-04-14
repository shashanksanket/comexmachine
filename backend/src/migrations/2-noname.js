'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "aprrovalStatus" on table "machinerequests"
 * changeColumn "requestedBy" on table "machinerequests"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-02-13T10:07:34.071Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "machinerequests",
            "aprrovalStatus",
            {
                "type": Sequelize.STRING,
                "field": "aprrovalStatus",
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "machinerequests",
            "requestedBy",
            {
                "type": Sequelize.STRING,
                "field": "requestedBy",
                "allowNull": true
            }
        ]
    }
];

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
