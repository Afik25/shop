const User = require("../../models/users/User");
const Role = require("../../models/users/Role");
const Login = require("../../models/users/Login");
const Permission = require("../../models/users/Permission");
const Module = require("../../models/settings/Module");
//
const { Op } = require("sequelize");

module.exports = {
  async getPermission(req, res) {
    try {
      const { user_id } = req.query;
      //
      const projects = await Project.findAll({});
      const modules = await Module.findAll({});
      const permissions = await Permission.findAll({
        where: { user_id: user_id },
      });
      //
      arr_projects = [];
      arr_modules = [];
      //
      const user_permissions = {
        projects: [],
      };

      for (let p = 0; p < permissions.length; p++) {
        for (let i = 0; i < modules.length; i++) {
          if (permissions[p].module_id === modules[i].id) {
            for (let j = 0; j < projects.length; j++) {
              if (modules[i].project_id === projects[j].id) {
                arr_modules.push({
                  module_id: modules[i].id,
                  title: modules[i].title,
                  permissions: {
                    write_action: permissions[p].write_action,
                    read_action: permissions[p].read_action,
                    update_action: permissions[p].update_action,
                    delete_action: permissions[p].delete_action,
                  },
                });
                user_permissions.projects.push({
                  project_id: projects[j].id,
                  project_title: projects[j].title,
                  modules: arr_modules,
                });
                // reinitialize arr_modules
                arr_modules = [];
              }
            }
          }
        }
      }

      return res.status(200).json({ user_permissions });
    } catch (error) {
      console.log({ "catch error on user get permissions ": error });
    }
  },
};
