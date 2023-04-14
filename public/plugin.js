const runPlugin = (utils, data) => {
  console.log("My Plugn: runPlugin()");
  console.log({ utils, data });

  return {
    pluginInitialisation: (pluginUtils) => {
      console.log("My Plugn: pluginInitialisation()");
    },
  };
};
