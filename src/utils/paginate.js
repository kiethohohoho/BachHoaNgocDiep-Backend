const { Op } = require('sequelize');
const _ = require('lodash');
const he = require('he');
const sequelize = require('../config/database');

const paginate = async (model, query, populateOptions = []) => {
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

  // const isNeedConvertToNumber = (value) =>
  //   value.length === 0 || value.length === 36 || value === 'undefined' || value === 'null';

  const _f = _.mapValues(filter, (f) => {
    const temp = _.mapValues(f, (e) => {
      return +e ? +e : e;
    });
    return _.mapKeys(temp, (value, key) => Op[key]);
  });

  const where = {
    ..._f,
    ..._s,
  };

  // Calculate the offset based on the page and limit parameters
  const offset = (page - 1) * limit;

  // console.log({
  //   where,
  //   order: _order,
  //   offset,
  //   limit,
  //   include: populateOptions,
  // });

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
    Description: he.decode(a.get({ plain: true }).Description),
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
