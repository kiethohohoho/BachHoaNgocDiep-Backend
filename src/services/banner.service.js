/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Banner, Image } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

/**
 * Query for banners
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryBanners = async (query) => {
  const banners = await paginate(Banner, query);
  return banners;
};

/**
 * Query for one banner by Id
 * @param {Object} params - Request params
 * @returns {Promise<QueryResult>}
 */
const queryBannerById = async (bannerId) => {
  const banner = await Banner.findByPk(bannerId, {
    include: [],
  });
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner không tồn tại!');
  }
  const images = await Image.findAll({
    where: { BannerId: bannerId },
  });
  banner.Images = images;
  return banner;
};

/**
 * Change record value and save
 * @param {Banner} banner - banner record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveBanner = async (banner, body) => {
  const { title, description, redirecturl, images } = body;
  if (title) {
    banner.Title = title;
  }
  if (description) {
    banner.Description = description;
  }
  if (redirecturl) {
    banner.RedirectUrl = redirecturl;
  }
  if (images) {
    await Promise.all(
      images.map((img) =>
        Image.update(
          { BannerId: banner.Id },
          {
            where: {
              Id: img.Id,
            },
          }
        )
      )
    );
  }
  await banner.save();
};

/**
 * Destroy a record
 * @param {Banner} banner - banner record
 * @returns {Promise<DestroyResult>}
 */
const destroyBanner = async (banner) => {
  await banner.destroy();
};

/**
 * Create one banner
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneBanner = async (body) => {
  const { title, description, redirecturl, images } = body;

  if (title) {
    const existBanner = await Banner.findOne({
      where: { Title: title },
    });
    if (existBanner) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Banner này đã tồn tại!');
    }
  }

  const newBanner = await Banner.create({
    Title: title,
    Description: description,
    ImageURL: images[0].OriginalImageUrl,
    RedirectUrl: redirecturl,
  });

  await Promise.all(
    images.map((img) =>
      Image.update(
        { BannerId: newBanner.Id },
        {
          where: {
            Id: img.Id,
          },
        }
      )
    )
  );
  return newBanner.get({ plain: true });
};

module.exports = {
  queryBanners,
  queryBannerById,
  saveBanner,
  destroyBanner,
  createOneBanner,
};
