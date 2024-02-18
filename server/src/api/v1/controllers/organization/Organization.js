const Organization = require("../../models/organization/Organization");
//
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const organizations = await Organization.findAll();
      if (organizations == "" || organizations == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available about organizations.",
        });
      }
      return res
        .status(200)
        .json({ status: 1, length: organizations.length, organizations });
    } catch (error) {
      console.log({ "catch error get organizations ": error });
    }
  },
};
