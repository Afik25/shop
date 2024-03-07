const Organization = require("../../models/organization/Organization");
const Entity = require("../../models/organization/Entity");
const Department = require("../../models/organization/Department");
const Service = require("../../models/organization/Service");
const Inscription = require("../../models/organization/Inscription");
const Role = require("../../models/users/Role");
const User = require("../../models/users/User");
const Module = require("../../models/settings/Module");
const Payment = require("../../models/subscription/Payment");
const Subscription = require("../../models/subscription/Subscription");
//
const { generateOTP } = require("../../../../utils/utils");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { v1: uuid } = require("uuid");

module.exports = {
  async create(req, res) {
    try {
      const { organization, country } = req.body;
      const { firstname, lastname, username, password, sys_role } = req.body;

      const check_username = await User.findOne({
        where: { username: username.toLowerCase() },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: "The username is not available!",
        });
      }

      var sys_id = uuid();
      const _organization = await Organization.create({
        name: organization.toLowerCase(),
        country: country,
        sys_id,
      });

      const _role = await Role.create({
        organization_id: _organization.id,
        title: "General Administrator",
      });

      var sys_id = uuid();
      const _entity = await Entity.create({
        organization_id: _organization.id,
        type: "main",
        sys_id,
      });

      var sys_id = uuid();
      const _department = await Department.create({
        entity_id: _entity.id,
        title: "general",
        sys_id,
      });

      var sys_id = uuid();
      const _service = await Service.create({
        department_id: _department.id,
        title: "general",
        sys_id,
      });

      var sys_id = uuid();
      const user = await User.create({
        service_id: _service.id,
        role_id: _role.id,
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        username: username.toLowerCase(),
        password,
        is_completed: false,
        sys_role,
        sys_id,
      });

      if (user) {
        return res.status(200).json({
          status: 1,
          message: `Registration process for ${organization.toUpperCase()} has started successfully.`,
          user,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Registration process for ${organization.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "Error on create inscription(registration) ": error });
    }
  },
  async complete(req, res) {
    try {
      const {
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      } = req.body;
      const {
        id,
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
      } = req.body;
      const {
        entity_id,
        orga_name,
        type,
        country,
        orga_phone,
        address,
        description,
      } = req.body;

      const getEntity = await Entity.findOne({ where: { id: entity_id } });
      const orgaId = getEntity.organization_id;

      await Organization.update(
        { name: orga_name, type, country, description },
        { where: { id: orgaId } }
      );

      await Entity.update(
        { telephone: orga_phone, address, status: 1 },
        { where: { id: entity_id } }
      );

      await User.update(
        {
          prename,
          name,
          gender,
          telephone,
          mail,
          birth,
          birth_location,
          status: 1,
        },
        { where: { id: id } }
      );

      const code = generateOTP(6);
      const inscription = await Inscription.create({
        organization_id: orgaId,
        dates,
        code,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      });

      if (inscription) {
        return res.status(200).json({
          status: 1,
          message: `The registration completion step 1 for ${orga_name.toUpperCase()} done.`,
          code,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Registration completion for ${orga_name.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "catch error create registration(completion) ": error });
    }
  },
  async activateCompletion(req, res) {
    try {
      const { id, dates, confirmation_code, is_completed } = req.body;

      const findInscription = await Inscription.findOne({
        where: { code: confirmation_code },
      });
      const organization_id = findInscription.organization_id;
      const inscrDates = findInscription.dates;
      const inscrStatus = findInscription.status;

      if (inscrStatus == 1) {
        return res.status(400).json({
          status: 0,
          message: "The confirmation code is already used!",
        });
      }

      var d1 = moment(dates);
      var d2 = moment(inscrDates);
      var duration = moment.duration(d1.diff(d2));
      var minutes = duration.asMinutes();
      const end_date = moment(dates).add("days", 30);

      if (minutes > 10) {
        return res.status(400).json({
          status: 0,
          message: "The confirmation code is experired!",
        });
      }

      if (findInscription) {
        const student = await User.update(
          { is_completed },
          { where: { id: id } }
        );

        const pay = await Payment.create({
          organization_id,
          dates_sub: dates,
          type_sub: "initial",
          package_sub: "Week",
          amount: 0.0,
          currency: "USD",
          reference_transaction: confirmation_code,
          transaction_status: "approved",
          pay_method: "initial",
          end_sub: end_date,
        });

        // const subs = await Subscription.create({
        //   module_id: ,
        //   payment_id: pay.id,
        // });

        return res.status(200).json({
          status: 1,
          message: "Account confirmed and activated successfully.",
          student,
        });
      }

      return res.status(400).json({
        status: 0,
        message: "Account confirmation failed.",
      });
    } catch (error) {
      console.log({ "catch error confirmation account ": error });
    }
  },
};
