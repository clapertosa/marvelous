module.exports = ctx => {
  const plugins = {
    autoprefixer: {
      ...ctx.options.autoprefixer
    }
  };
  plugins["postcss-nested"] = {};
  return { plugins };
};
