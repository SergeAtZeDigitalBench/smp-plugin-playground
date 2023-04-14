const runPlugin = (utils, data) => {
  console.log("Plugin script: ", { utils, data });

  return {
    pluginInitialisation: (pluginUtils) => {
      console.log("pluginInitialisation(pluginUtils): ", { pluginUtils });
    },
  };
};
