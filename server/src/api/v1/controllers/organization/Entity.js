const Entity = require("../../models/organization/Entity");
//
const { Op } = require("sequelize");

module.exports = {
  async create(req, res) {
    try {
      const { organization_id, type, telephone, address } = req.body;

      const entity = await Entity.create({
        organization_id,
        type,
        telephone,
        address,
      });

      if (entity) {
        return res.status(200).json({
          status: 1,
          message: "Extension saved successfully.",
          entity,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not saved. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error create extension : ": error });
    }
  },
  async get(req, res) {
    try {
      const _entities = await Entity.findAll();
      if (_entities == "" || _entities == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available about entities.",
        });
      }

      const entitiesSorted = _entities.sort(function (a, b) {
        if (a.updated_at < b.updated_at) {
          return -1;
        }
      });

      const entities = entitiesSorted.reverse();

      return res
        .status(200)
        .json({ status: 1, length: entities.length, entities });
    } catch (error) {
      console.log({ "catch error get entities ": error });
    }
  },
  async update(req, res) {
    try {
      const { telephone, address } = req.body;
      const { id } = req.params;

      const entity = await Entity.update(
        { telephone, address },
        { where: { id: id } }
      );

      if (entity) {
        return res.status(200).json({
          status: 1,
          message: "Extension updated.",
          entity,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update extension ": error });
    }
  },
  async enabled(req, res) {
    try {
      const { stat, id } = req.params;

      const entity = await Entity.update(
        { status: stat == 1 ? 0 : 1 },
        { where: { id: id } }
      );

      if (entity) {
        return res.status(200).json({
          status: 1,
          message: `Extension ${stat == 1 ? "Disabled" : "Enabled"}.`,
          entity,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update extension ": error });
    }
  },
};
