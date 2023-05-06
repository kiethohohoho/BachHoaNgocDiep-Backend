const { NganLuong } = require('vn-payments');

const { TEST_CONFIG } = NganLuong;
const nganluong = new NganLuong({
  paymentGateway: TEST_CONFIG.paymentGateway,
  merchant: TEST_CONFIG.merchant,
  receiverEmail: TEST_CONFIG.receiverEmail,
  secureSecret: TEST_CONFIG.secureSecret,
});

const checkoutNganLuong = async (req, res) => {
  const { checkoutData } = res.locals;
  checkoutData.returnUrl = `http://${req.headers.host}/payment/nganluong/callback`;
  checkoutData.cancelUrl = `http://${req.headers.host}/`;
  checkoutData.orderInfo = 'Thanh toan giay adidas';
  checkoutData.locale = checkoutData.locale === 'en' ? 'en' : 'vi';
  checkoutData.paymentType = '1';
  checkoutData.totalItem = '1';

  const checkoutUrl = await nganluong.buildCheckoutUrl(checkoutData);
  res.locals.checkoutUrl = checkoutUrl;
  return checkoutUrl;
};

const callbackNganLuong = async (req, res) => {
  const { query } = req;

  const results = await nganluong.verifyReturnUrl(query);
  if (results) {
    res.locals.email = results.customerEmail;
    res.locals.orderId = results.transactionId || '';
    res.locals.price = results.amount;
    res.locals.isSucceed = results.isSuccess;
    res.locals.message = results.message;
  } else {
    res.locals.isSucceed = false;
  }
};

module.exports = { nganluong, checkoutNganLuong, callbackNganLuong };
