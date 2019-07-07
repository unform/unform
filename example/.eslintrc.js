module.exports = {
  settings: {
    'import/resolver': {
      typescript: {}
    },
  },
  rules: {
    "jsx-a11y/label-has-associated-control": [ 2, {
      "labelComponents": ["label"],
      "labelAttributes": ["htmlFor"],
      "controlComponents": ["input"]
    }],
  }
};
