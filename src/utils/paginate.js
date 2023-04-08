const { Op } = require('sequelize');

const paginate = async (model, query) => {
  const { search, filter, sort, order, page = 1, limit = 10 } = query;

  // Build the order clause for the sort and order parameters
  const orderClause = [];

  // Calculate the offset based on the page and limit parameters
  const offset = (page - 1) * limit;

  // Build the where clause for the search and filter parameters
  let whereClause = {};
  if (filter) {
    const filters = Object.entries(filter || {}).map((val) => {
      const fieldName = val[0];
      const operator = Object.keys(val[1])[0];
      const value = Object.values(val[1])[0];
      return { fieldName, operator, value };
    });
    whereClause = filters.reduce((where, fil) => {
      const { fieldName, operator, value } = fil;
      if (where[Op.and] === undefined) {
        // eslint-disable-next-line no-param-reassign
        where[Op.and] = [];
      }
      // eslint-disable-next-line no-param-reassign
      where[Op.and].push({ [fieldName]: { [Op[operator]]: value } });
      return where;
    }, {});
  }

  if (search) {
    whereClause[Op.or] = [
      { Name: { [Op.iLike]: `%${search}%` } },
      { Description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (sort) {
    const sortFields = sort.split(',');
    const sortOrders = (order || '').split(',');
    sortFields.forEach((field, index) => {
      orderClause.push([field.trim(), sortOrders[index] === 'desc' ? 'DESC' : 'ASC']);
    });
  }
  console.log({
    where: whereClause,
    order: orderClause,
    offset,
    limit,
  });

  // Query the database with the where, order, offset, and limit clauses
  const { count, rows } = await model.findAndCountAll({
    where: whereClause,
    order: orderClause,
    offset,
    limit,
  });

  // Calculate the total number of pages based on the count and limit parameters
  const totalPages = Math.ceil(count / limit);

  // Return the paginated results along with the total count and number of pages
  return {
    data: rows,
    pagination: {
      totalCount: count,
      totalPages,
      currentPage: page,
      limit,
    },
  };
};

module.exports = paginate;
