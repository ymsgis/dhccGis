jQuery.extend({  
    browser: function()   
    {  
        var  
        rwebkit = /(webkit)\/([\w.]+)/,  
        ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,  
        rmsie = /(msie) ([\w.]+)/,  
        rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
        browser = {},  
        ua = window.navigator.userAgent,  
        browserMatch = uaMatch(ua,rwebkit,ropera,rmsie,rmozilla);
        if (browserMatch.browser) {  
            browser[browserMatch.browser] = true;  
            browser.msie = browserMatch.browser;  
            browser.version = browserMatch.version;  
        }
        return { browser: browser };  
    }
});  
    function uaMatch(ua,rwebkit,ropera,rmsie,rmozilla)   
    {  
       ua = ua.toLowerCase();  
     
       var match = rwebkit.exec(ua)  
                   || ropera.exec(ua)  
                   || rmsie.exec(ua)  
                   || ua.indexOf("compatible") < 0 && rmozilla.exec(ua)  
                   || [];  
     
       return {  
           browser : match[1] || "",  
           version : match[2] || "0"  
       };  
    }