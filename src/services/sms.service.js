const httpStatus = require('http-status');
const twilio = require('twilio');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const client = twilio(config.twilio.accountSID, config.twilio.authToken);

/**
 * Send an OTP SMS
 * @param {string} phoneNumber
 * @param {number} otp
 * @returns {Promise<VerificationInstance>}
 */
const sendOtpSms = async (phoneNumber, otp) => {
  try {
    await client.messages.create({
      body: `Mã OTP của bạn là ${otp}. Sử dụng mã này để xác thực số điện thoại của bạn với BachHoaNgocDiep shop. Không chia sẻ mã này cho bất cứ ai!`,
      from: config.twilio.sender,
      to: `+84${phoneNumber.slice(1)}`,
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Gửi SMS không thành công!');
  }
};

/**
 * Send an OTP SMS
 * @param {string} phoneNumber
 * @param {string} code
 * @param {string} channel
 * @param {string} locale
 * @returns {Promise<VerificationCheckInstance>}
 */
const verifyOtp = async (phoneNumber, code, channel = 'sms', locale = 'vi') => {
  try {
    const checkVerification = await client.verify.v2
      .services(config.twilio.verifySID)
      .verificationChecks.create({ to: phoneNumber, code, channel, locale });
    return checkVerification;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Xác thực OTP không thành công!');
  }
};

module.exports = { sendOtpSms, verifyOtp };
