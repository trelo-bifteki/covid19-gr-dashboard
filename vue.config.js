const publicPath = process.env.NODE_ENV === 'production'
  ? '/covid-19/'
  : '/';

module.exports = {
  publicPath,
};
