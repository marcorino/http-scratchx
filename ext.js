(function(ext) {
    
    var tk = 'VREEDFANZJDDZDR3JCWVH52BWKGWY6KJSEIKDXBNZORPYQZYM2';

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

    ext.make_call_temp = function(callback) {
        var url = 'https://www.eventbriteapi.com/v3/events/20789736662?token=WFGW7FS5KX72BLBLZUXN';
        $.ajax({
              url: url,
              dataType: 'jsonp',
              success: function(data) {
                  name = data.name;
                  callback(name);
              }
        });
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            //['w', 'wait for random time', 'wait_random'],
            ['R', 'current temperature in city %s', 'make_call_temp']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});