// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { method } = req;
  const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://bobkov.mesto.nomoreparties.co');
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  res.header('Access-Control-Allow-Origin', 'https://bobkov.mesto.nomoreparties.co');
  res.header('Access-Control-Allow-Methods', allowedMethods);
  res.header('Access-Control-Allow-Headers', requestHeaders);
  res.header('Access-Control-Allow-Credentials', true);
  next();
};
