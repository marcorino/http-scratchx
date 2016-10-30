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
    // stop waiting
    // ext.wait_random = function(callback) {
    //     wait = Math.random();
    //     console.log('Waiting for ' + wait + ' seconds');
    //     window.setTimeout(function() {
    //         callback();
    //     }, wait*1000);
    // };

    var createCORSRequest = function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        return xhr;
    }

    var output = '';
    var url_beginning = 'https://www.eventbriteapi.com/v3/events/20789736662?token=WFGW7FS5KX72BLBLZUXN';

    ext.make_call_temp = function(callback) {
        // var fullNameRequest = new XMLHttpRequest();
        
        // fullNameRequest.onreadystatechange = function() {
        //     if (fullNameRequest.readyState === XMLHttpRequest.DONE) {
        //         var fullNameText = fullNameRequest.responseText;
        //         try {
        //             fullNameText = JSON.Parse(fullNameText);
        //             output = fullNameText.name.text;
        //             callback(output);
        //             output = '';
        //         } catch (e) {
        //             callback('error');
        //         }
        //     }
        // }

        xhr.onload = function() {
            var responseText = xhr.responseText;
            console.log(responseText);
            callback(responseText);
            // process the response.
        };

        xhr.onerror = function() {
            console.log('There was an error!');
            callback('There was an error!');
        };


        var xhr = createCORSRequest('GET', url_beginning);
        if (!xhr) {
            callback('CORS not supported');
        }

        // fullNameRequest.open("GET", url_beginning);
        // fullNameRequest.send();
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            //['w', 'wait for random time', 'wait_random'],
            ['R', 'Event name', 'make_call_temp']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});