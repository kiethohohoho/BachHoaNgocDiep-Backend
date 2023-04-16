const { Op } = require('sequelize');
const _ = require('lodash');
const sequelize = require('../config/database');

const paginate = async (model, query) => {
  const { search = '', filter = {}, sort = '', order = '', page = 1, limit = 10 } = query;

  const orderField = order.split(',');
  const sortField = sort.split(',');

  const _order = sort
    ? sortField.map((sField, idx) => [sField, orderField[idx].toUpperCase()])
    : [];

  const _s = search
    ? {
        [Op.or]: [
          {
            Name: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('Name')),
              'LIKE',
              `%${search.toLowerCase()}%`
            ),
            Description: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('Description')),
              'LIKE',
              `%${search.toLowerCase()}%`
            ),
          },
        ],
      }
    : {};

  const _f = _.mapValues(filter, (f) => {
    const temp = _.mapValues(f, (e) => (e.length === 36 ? e : +e));
    return _.mapKeys(temp, (value, key) => Op[key]);
  });

  const where = {
    ..._f,
    ..._s,
  };

  // Calculate the offset based on the page and limit parameters
  const offset = (page - 1) * limit;

  // Query the database with the where, order, offset, and limit clauses
  const { count, rows } = await model.findAndCountAll({
    where,
    order: _order,
    offset,
    limit,
  });
  // Calculate the total number of pages based on the count and limit parameters
  const TotalPages = Math.ceil(count / limit);

  // Return the paginated results along with the total count and number of pages
  return {
    Data: rows,
    Pagination: {
      TotalCount: count,
      TotalPages,
      CurrentPage: page,
      Limit: limit,
    },
  };
};

module.exports = paginate;
