// SamplePlugin
var SamplePlugin = (function() {
    var SamplePlugin = function () {
        this.pluginName = "SamplePlugin";
        this.version = "0.1";

        console.log('Loaded SamplePlugin - version ' + this.version);
        return this;
    };

    SamplePlugin.prototype = {
        pluginInitialisation : SamplePlugin_pluginInitialisation,
        addPlayerListeners : SamplePlugin_addPlayerListeners,
    };

    return SamplePlugin;
})();

var _greeting;
var _playerState;
var _name;

// SamplePlugin Class Methods
function SamplePlugin_pluginInitialisation(pluginUtils) {
    // get the player interface from the pluginUtils
    var playerInterface = pluginUtils.playerInterface;

    var container = document.createElement('div');
    container.id = 'sample_div';

    _greeting = document.createElement('div');
    _greeting.innerHTML = '<p>Hello, ' + _name + '. This is the SamplePlugin</p>';
    container.appendChild(_greeting);

    _playerState = document.createElement('span');
    _playerState.id = 'player_state';
    container.appendChild(_playerState);

    playerInterface.container.appendChild(container);
    this.addPlayerListeners(pluginUtils);
}

function SamplePlugin_addPlayerListeners(pluginUtils) {
    var playerInterface = pluginUtils.playerInterface;

    // in here we can bind to player events
    // see https://confluence.dev.bbc.co.uk/display/mp/SMP+Events

    playerInterface.addEventListener('pause', function(event) {
        _playerState.innerHTML = 'You are paused';
    });

    playerInterface.addEventListener('playing', function(event) {
        _playerState.innerHTML = 'You are playing';
    });

    // here we can listen to data being set in the page using setData
    playerInterface.addEventListener('setData', function(event) {
        if(event.data && event.data.name) {
            _name = event.data.name;
            _greeting.innerHTML = '<p>Nice to meet you, ' + _name + '</p>';
        }
    });
}

var runPlugin = function(utils, data) {
    var sp = new SamplePlugin();
    _name = data.name;

    // load css files, relative to the location of the plugin .js
    utils.loadCSS("SamplePlugin.css");
    return sp;
};
