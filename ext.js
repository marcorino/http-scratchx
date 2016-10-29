(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    // ext.wait_random = function(callback) {
    //     wait = Math.random();
    //     console.log('Waiting for ' + wait + ' seconds');
    //     window.setTimeout(function() {
    //         callback();
    //     }, wait*1000);
    // };

    ext.make_call_temp = function(location, callback) {
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            //['w', 'wait for random time', 'wait_random'],
            ['R', 'current temperature in city %s', 'make_call_temp', 'Boston, MA']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});