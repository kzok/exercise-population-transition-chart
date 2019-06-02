const {addParameters, configure} = require("@storybook/react");

addParameters({
  options: {
    hierarchySeparator: /\\|\//,
  },
});

const loadStories = () => {
  const req = require.context("../src/", true, /\.story\.tsx$/);
  req.keys().forEach(req);
};

configure(loadStories, module);
