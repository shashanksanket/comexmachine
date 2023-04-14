'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "machines", deps: [users]
 * createTable "machinerequests", deps: [machines]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-02-13T10:00:10.404Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "allowNull": false
                },
                "location": {
                    "type": Sequelize.STRING,
                    "field": "location",
                    "allowNull": false
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
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
    },
    {
        fn: "createTable",
        params: [
            "machines",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "location": {
                    "type": Sequelize.STRING,
                    "field": "location",
                    "allowNull": false
                },
                "owner": {
                    "type": Sequelize.STRING,
                    "field": "owner",
                    "allowNull": false
                },
                "rate": {
                    "type": Sequelize.INTEGER,
                    "field": "rate",
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
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "machinerequests",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "requestedBy": {
                    "type": Sequelize.STRING,
                    "field": "requestedBy",
                    "allowNull": false
                },
                "aprrovalStatus": {
                    "type": Sequelize.STRING,
                    "field": "aprrovalStatus",
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
                },
                "machineId": {
                    "type": Sequelize.INTEGER,
                    "field": "machineId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "machines",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
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
