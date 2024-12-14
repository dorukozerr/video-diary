const babelConfig = (api) => {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ]
  };
};

export default babelConfig;
