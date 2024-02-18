const Payment = require("../../models/subscription/Payment");
//
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const payments = await Payment.findAll();
      if (payments == "" || payments == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available about payments.",
        });
      }
      return res
        .status(200)
        .json({ status: 1, length: payments.length, payments });
    } catch (error) {
      console.log({ "catch error get payments ": error });
    }
  },
};
