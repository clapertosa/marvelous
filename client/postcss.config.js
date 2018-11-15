module.exports = ctx => {
  const plugins = {
    autoprefixer: {
      ...ctx.options.autoprefixer,
      browsers: ["> 1%", "last 2 versions"]
    }
  };
  plugins["postcss-nested"] = {};
  return { plugins };
};
