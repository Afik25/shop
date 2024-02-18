const Module = require("../../models/settings/Module");
const Permission = require("../../models/users/Permission");
const Role = require("../../models/users/Role");
const User = require("../../models/users/User");
const { Op } = require("sequelize");

const { generatePassword } = require("../../../../utils/utils");

module.exports = {
  async create(req, res) {
    try {
      const {
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        role_id,
        username,
      } = req.body;

      const thumbnails = req?.file?.filename || "";

      const phone = telephone || null;
      if (phone) {
        const check_phone = await User.findOne({
          where: {
            telephone: {
              [Op.like]: `%${telephone.toString()}%`,
            },
          },
        });
        if (check_phone) {
          return res
            .status(400)
            .json({ status: 0, message: "The phone number is already used!" });
        }
      }

      const email = mail || null;
      if (email) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already used!" });
        }
      }

      const check_username = await User.findOne({
        where: { username: username },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: `The username ${username} is already used!`,
        });
      }
      const password = generatePassword(6);
      const user = await User.create({
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        role_id,
        username,
        password,
        thumbnails,
        path_to: "/user",
        is_completed: false,
      });

      if (user) {
        return res.status(200).json({
          status: 1,
          password,
          message: `The registration of ${
            prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
          } ${name.toUpperCase()} has been successfully done.`,
          user,
        });
      }
      return res.status(400).json({
        status: 0,
        message: `The registration of ${
          prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
        } ${name.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "catch error create User : ": error });
    }
  },
  async get(req, res) {
    try {
      const users = await User.findAll();
      if (users == "" || users == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available.",
        });
      }

      return res.status(200).json({ status: 1, length: users.length, users });
    } catch (error) {
      console.log({ "catch error get Users ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const user = await User.findAll({ where: { id: key } });
      if (!user) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `No information available.`,
        });
      }

      return res.status(200).json({ status: 1, length: user.length, user });
    } catch (error) {
      console.log({ "catch error get User by key ": error });
    }
  },
  async update(req, res) {
    try {
      const {
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        role,
        username,
        password,
      } = req.body;
      const { id } = req.params;

      const thumbnails = req?.file?.filename || "";

      const phone = telephone || null;
      if (phone) {
        const check_phone = await User.findOne({
          where: { telephone: telephone },
        });
        if (check_phone) {
          return res.status(400).json({
            status: 0,
            message: "The phone number is already used!",
          });
        }
      }

      const email = mail || null;
      if (email) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already used!" });
        }
      }

      const check_username = await User.findOne({
        where: { username: username },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: `The username ${username} is already used!`,
        });
      }

      const user = await User.update(
        {
          prename,
          name,
          gender,
          telephone,
          mail,
          birth,
          birth_location,
          role,
          username,
          password,
          thumbnails,
        },
        { where: { id: id } }
      );

      if (user) {
        return res.status(200).json({
          status: 1,
          message: `The update of ${
            prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
          } ${name.toUpperCase()} has been successfully done.`,
          user,
        });
      }
      return res.status(400).json({
        status: 0,
        message: `The update of ${
          prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
        } ${name.toUpperCase()} failed.`,
        user,
      });
    } catch (error) {
      console.log({ "catch error update User ": error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ status: 1, message: "The user has been deleted." });
    } catch (error) {
      console.log({ "catch error delete User ": error });
    }
  },
  async rootConfigure(req, res) {
    try {
      // Initial configurations
      //
      const prename = "Afik";
      const name = "Foundation";
      const gender = "Male";
      const telephone = "+243 977202072";
      const mail = "admin@af.org";
      const birth = "2020-05-25";
      const birth_location = "Kinshasa - DRC";
      const username = "admin";
      const password = "root@1";
      const thumbnails = req?.file?.filename || "";
      const path_to = "/user";
      const is_completed = true;

      const email = mail || null;
      if (email) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(200)
            .json({ status: 1, message: "The root is already configured." });
        } else {
          //
          // Role
          const title = "Administrator";
          const sys_role = "admin";
          //
          const role = await Role.create({
            title,
            sys_role,
          });
          //
          //
          // Project
          const pr_title = "Afik Foundation";
          const pr_sector = "Technology";
          const pr_version = "Official";
          const pr_description =
            "Afik Foundation is a tech Startup that aim to develop the tools based on technology and AI in order to help the society in their daily tasks.";
          //
          const proj = await Project.create({
            title: pr_title,
            sector: pr_sector,
            version: pr_version,
            description: pr_description,
          });
          //
          // Modules
          const project_id = proj.id;
          const mod_title = "Users management";
          const mod_description =
            "This module aim to manage the users based on the role and permission of writting, reading, updating and removing.";
          //
          const modul = await Module.create({
            project_id,
            title: mod_title,
            description: mod_description,
          });
          //
          const user = await User.create({
            prename,
            name,
            gender,
            telephone,
            mail,
            birth,
            birth_location,
            role_id: role.id,
            username,
            password,
            thumbnails,
            path_to,
            is_completed,
          });

          if (user) {
            const perm = await Permission.create({
              user_id: user.id,
              module_id: modul.id,
              write_action: true,
              read_action: true,
              update_action: true,
              delete_action: true,
            });

            if (perm) {
              return res.status(200).json({
                status: 1,
                message: "The root setup process have successfully done.",
                user,
              });
            }
          }
          //
        }
      }

      return res.status(400).json({
        status: 0,
        message: "The root setup process have failed.",
        user,
      });
    } catch (error) {
      console.log({ "catch error root configure process ": error });
    }
  },
};
