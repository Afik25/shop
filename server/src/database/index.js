const sequelize = require("sequelize");
const database = require("../config/database");
const connection = new sequelize(database);
//
// Admin
const Organization = require("../api/v1/models/organization/Organization");
const Entity = require("../api/v1/models/organization/Entity");
const Department = require("../api/v1/models/organization/Department");
const Service = require("../api/v1/models/organization/Service");
const Inscription = require("../api/v1/models/organization/Inscription");
const User = require("../api/v1/models/users/User");
const Login = require("../api/v1/models/users/Login");
const Permission = require("../api/v1/models/users/Permission");
const Role = require("../api/v1/models/users/Role");
const Module = require("../api/v1/models/settings/Module");
const Payment = require("../api/v1/models/subscription/Payment");
const Subscription = require("../api/v1/models/subscription/Subscription");
//
//
// Models connection links
//
Organization.init(connection);
Entity.init(connection);
Department.init(connection);
Service.init(connection);
Inscription.init(connection);
User.init(connection);
Login.init(connection);
Permission.init(connection);
Role.init(connection);
Module.init(connection);
Payment.init(connection);
Subscription.init(connection);
//

module.exports = connection;
