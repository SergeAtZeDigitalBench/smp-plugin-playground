/**
 * @description more on `PlayerInterface` methods at: https://confluence.dev.bbc.co.uk/display/mp/HTML5+API+Exposed
 * @typedef { Object } PlayerInterface player's container
 * @property {HTMLDivElement} container player container DOM node
 * @property {Node} _toucanPlayer `<smp-toucan-player />` node
 * @property {Function} addEventListener `(event:string, callback: (...args)=>void)=>void`
 * @property {Function} removeEventListener  `(event:string, callback: (...args)=>void)=>void`
 * @property {Function} dispatchEvent `({type:"myEvent", myData:any})=>void`
 *
 * @typedef { Object } SmpUtils SMP Utils object
 * @property {Function} getPluginList returns list of all plugins that have been loaded so far
 * @property {Function} loadCSS util to load CSS files `(path:string)=>void`
 * @property {PlayerInterface} playerInterface player interface
 * @property {Function} register Registers a plugin with a particular name, so that other plugins can tell if it has been loaded or not
 * @property {Function} relativeUrl resolve a url relative to the plugin
 *
 * @param {SmpUtils} utils SMP Utils object
 * @param {any} data data passed from player
 * @returns {undefined} procedure function to initialise plugin
 */
const runPlugin = (utils, data) => {
  console.log("Plugin script: ", { utils, data });

  return {
    /**
     * @param {SmpUtils} pluginUtils
     */
    pluginInitialisation: (pluginUtils) => {
      console.log("pluginInitialisation(pluginUtils): ", { pluginUtils });
    },
  };
};
