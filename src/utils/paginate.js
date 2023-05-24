const { Op } = require('sequelize');
const _ = require('lodash');
const he = require('he');
const sequelize = require('../config/database');
const typeOf = require('./typeof');

const paginate = async (model, query, populateOptions = []) => {
  const {
    search = '',
    filter = {},
    sort = 'createdAt',
    order = 'asc',
    page = 1,
    limit = 10,
  } = query;

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

  let flag = false;
  const _f = _.mapValues(filter, (f) => {
    flag = false;
    const temp = _.mapValues(f, (e) => {
      if (typeOf(e) === 'Array') {
        flag = true;
      }
      return +e ? +e : e;
    });
    return _.mapKeys(temp, (value, key) => Op[flag ? 'in' : key]);
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
    include: populateOptions,
  });
  // Calculate the total number of pages based on the count and limit parameters
  const TotalPages = Math.ceil(count / limit);

  const responseRows = rows.map((a) => ({
    ...a.get({ plain: true }),
    ...(a.Description && { Description: he.decode(a.get({ plain: true }).Description) }),
  }));

  // Return the paginated results along with the total count and number of pages
  return {
    Data: responseRows,
    Pagination: {
      TotalCount: count,
      TotalPages,
      CurrentPage: page,
      Limit: limit,
    },
  };
};

module.exports = paginate;
