const mailBody = (
  code,
  userName,
  serviceName,
  shopName = 'Bách hoá Ngọc Diệp',
  shopAddress = 'Số nhà 245, đường 30/4, khu phố 1, phường 5, thị xã Cai Lậy, tỉnh Tiền Giang'
) => `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${shopName}</a>
  </div>
  <p style="font-size:1.1em">Xin chào <span style="font-weight:bold">${userName}</span>,</p>
  <p>Cảm ơn bạn đã sử dụng dịch vụ của ${shopName}. Hãy sử dụng mã OTP sau để hoàn tất thủ tục ${serviceName} của bạn. OTP có giá trị trong 5 phút</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
  <p style="font-size:0.9em;">Trân trọng,<br />${shopName}</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Cửa hàng tạp hóa ${shopName}</p>
    <p>${shopAddress}</p>
  </div>
</div>
</div>`;

module.exports = mailBody;
