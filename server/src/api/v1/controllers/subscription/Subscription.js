const Subscription = require("../../models/subscription/Subscription");
//
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const subscriptions = await Subscription.findAll();
      if (subscriptions == "" || subscriptions == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available about subscriptions.",
        });
      }
      return res
        .status(200)
        .json({ status: 1, length: subscriptions.length, subscriptions });
    } catch (error) {
      console.log({ "catch error get subscriptions ": error });
    }
  },
};
