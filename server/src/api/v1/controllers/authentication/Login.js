const Organization = require("../../models/organization/Organization");
const Entity = require("../../models/organization/Entity");
const Department = require("../../models/organization/Department");
const Service = require("../../models/organization/Service");
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");
const Login = require("../../models/users/Login");
//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");

module.exports = {
  async login(req, res) {
    try {
      const {
        username,
        password,
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [
            { username: username.toLowerCase() },
            {
              telephone: {
                [Op.like]: `%${username}%`,
              },
            },
            { mail: username.toLowerCase() },
          ],
        },
      });

      if (!user) {
        return res.status(400).json({
          status: 0,
          isLogged: false,
          message: "The Username or/and password is/are wrong.",
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          status: 0,
          isLogged: false,
          message: "The username or/and Password is/are wrong.",
        });
      }
      const user_id = user.id;
      //
      const role = await Role.findOne({ where: { id: user.role_id } });
      const service = await Service.findOne({
        where: { id: user.service_id },
      });
      const department = await Department.findOne({
        where: { id: service.department_id },
      });
      const entity = await Entity.findOne({
        where: { id: department.entity_id },
      });
      const organization = await Organization.findOne({
        where: { id: entity.organization_id },
      });
      //
      const refreshToken = jwt.sign(
        {
          userInfo: {
            organization: organization,
            entity: entity,
            department: department,
            service: service,
            role: role,
            user_id: user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            telephone: user.telephone,
            mail: user.mail,
            birth: user.birth,
            birth_location: user.birth_location,
            sys_role: user.sys_role,
            sys_id: user.sys_id,
            thumbnails: user.thumbnails,
            is_completed: user.is_completed,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      //
      const login = await Login.create({
        user_id,
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
        refresh_token: refreshToken,
      });
      //
      const accessToken = jwt.sign(
        {
          userInfo: {
            organization: organization,
            entity: entity,
            department: department,
            service: service,
            role: role,
            user_id: user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            telephone: user.telephone,
            mail: user.mail,
            birth: user.birth,
            birth_location: user.birth_location,
            sys_role: user.sys_role,
            sys_id: user.sys_id,
            thumbnails: user.thumbnails,
            is_completed: user.is_completed,
            login: login.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: 1,
        isLogged: true,
        message: "Connexion successfully!",
        accessToken,
        sys_role: user.sys_role,
      });
    } catch (error) {
      console.log({ "Error login user ": error });
    }
  },
  async refreshToken(req, res) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(401);
      console.log({ "Cookies verify ": cookies.jwt });

      const refreshToken = cookies?.jwt;
      const connected = await Login.findOne({
        where: { refresh_token: refreshToken },
      });

      console.log({ "connected user verify ": connected });

      if (!connected) {
        return res.status(400).json({
          status: 0,
          isLogged: false,
          message: "This connexion doesn't exists. Unknown token.",
        });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          console.log({ "connected user verify ": decoded.userInfo });
          if (err || connected.user_id !== decoded.userInfo.user_id)
            return res.sendStatus(403);

          const accessToken = jwt.sign(
            {
              userInfo: {
                entity_id: decoded.userInfo.entity_id,
                user_id: decoded.userInfo.user_id,
                prename: decoded.userInfo.prename,
                name: decoded.userInfo.name,
                gender: decoded.userInfo.gender,
                telephone: decoded.userInfo.telephone,
                mail: decoded.userInfo.mail,
                birth: decoded.userInfo.birth,
                birth_location: decoded.userInfo.birth_location,
                role: decoded.userInfo.role,
                sys_role: decoded.userInfo.sys_role,
                thumbnails: decoded.userInfo.thumbnails,
                is_completed: decoded.userInfo.is_completed,
                login: decoded.userInfo.login,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30min" }
          );

          const sys_role = decoded.userInfo.sys_role;
          res.status(200).json({ sys_role, accessToken });
        }
      );
    } catch (error) {
      console.log({ "catch error refresh token ": error });
    }
  },
  async logout(req, res) {
    try {
      const cookies = req.cookies;

      console.log({ "cookies jwt": cookies.jwt });

      if (!cookies?.jwt) return res.sendStatus(204); //No content
      const refreshToken = cookies.jwt;

      //It refreshToken id database ?
      const connected = await Login.findOne({
        where: { refresh_token: refreshToken },
      });

      if (connected) {
        // Desactivate or Delete refreshToken in database

        const logout = await Login.update(
          { connection_status: 0 },
          { where: { refresh_token: refreshToken } }
        );

        //
        // res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        //return res.sendStatus(204);
        return res.status(204).json({
          status: 0,
          isLogged: false,
          message: "Déconnexion réussie!",
          logout,
        });
      }
    } catch (error) {
      console.log({ "catch error logout ": error });
    }
  },
  async verifyAccount(req, res) {
    try {
      const { phone } = req.params;

      const user = await User.findOne({ where: { telephone: phone } });

      if (!user) {
        return res.status(400).json({
          status: 0,
          message: "Ce numéro renseigné n'est pas reconnu.",
        });
      }
      return res
        .status(200)
        .json({ status: 1, message: "Numéro reconnu.", user });
    } catch (error) {
      console.log({ "catch error verify account ": error });
    }
  },
  async restorePassword(req, res) {
    try {
      const { password } = req.body;
      const { user_id } = req.params;
      const passwordUpdated = await User.update({ password }, { id: user_id });

      if (passwordUpdated) {
        return res.status(201).json({
          status: 1,
          message: "Votre mot de passe a bien été réinitialisé.",
          passwordUpdated,
        });
      }
    } catch (error) {
      console.log({ "catch error restore password ": error });
    }
  },
};

// const permissions = await Permission.findOne({
//     where: { user_id: user.id },
//   });

//   const modules = await Module.findAll();

//   const projects = await Project.findAll();

//   var permissions_modules = {};

//   for (let i = 0; i < projects.length; i++) {
//     // const element = projects[i];

//     for (let j = 0; j < modules.length; j++) {
//       // const element = modules[j];

//       if (projects[i].id == modules[j].project_id) {
//         for (let k = 0; k < permissions.length; k++) {
//           // const element = permissions[k];

//           if (modules[j].id == permissions[k].module_id) {
//             permissions_modules[projects[i]] = {
//               module: modules[j].title,
//               white: permissions[k].write_action,
//               read: permissions[k].read_action,
//               update: permissions[k].update_action,
//               delete: permissions[k].delete_action,
//             };
//           }
//         }
//       }
//     }
//   }
//   //
