
// Check if there is a lat/lon previously logged on page load
if(sessionStorage.lat && sessionStorage.lon){   
    var lat = Number(sessionStorage.getItem('lat'));
    var lon = Number(sessionStorage.getItem('lon'));
}
else
{
    sessionStorage.setItem('geoStatus', 'uninitialized');    
}



function Geo(){
    this.lat = lat;
    this.lon = lon;
    // check if we have geo already 
    this.hasGeo = (typeof(lat) === 'number') ? true : false; 
}


Geo.prototype = {

    constructor: Geo,

    /* ------------------------------------------------------------------------ *  
        !geo.location
            - checks if the browser has a navigator object 
            - get and set geolocation (scope and sessionStorage) or fail
    * ------------------------------------------------------------------------ */
    location: function() 
    {
        var self = this;
        this.ready = function(){}
        this.result = false;

        if("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) 
            {
                sessionStorage.lat = position.coords.latitude; 
                sessionStorage.lon = position.coords.longitude; 

                self.lat = position.coords.latitude;
                self.lon = position.coords.longitude;
                this.lat = position.coords.latitude;
                this.lon = position.coords.longitude;
                
                if ( typeof(self.lat) == 'number' )
                { 
                    self.hasGeo = true;
                    sessionStorage.setItem('geoStatus', 'success');    
                    sessionStorage.setItem('geoFail', null);
                } 

                self.ready();

            }, this.fail );

        }
        else
        {
            // pass err object to match native html geo errors
            var err = { code: 'browser' }
            this.fail(err);
        }
        return this;

    },

    /* ------------------------------------------------------------------------ *  
        !geo.fail
    * ------------------------------------------------------------------------ */
    fail: function(err) 
    {
        if(err){   
            this.hasGeo = false;
            switch(err.code) { 
                case 1: 
                    console.log("User permission denied! Error code 1: PERMISSION_DENIED"); 
                    sessionStorage.setItem('geoStatus', 'PERMISSION_DENIED');            
                break; 
                case 2: 
                    console.log("Position not available! Error code 2: POSITION_UNAVAILABLE"); 
                    sessionStorage.setItem('geoStatus', 'POSITION_UNAVAILABLE');
                break; 
                case 3: 
                    console.log("Location retrieval timed out! Error code 3: TIMEOUT"); 
                    sessionStorage.setItem('geoStatus', 'TIMEOUT');
                break; 
                case 'browser':  
                    console.log("No geolocation in navigator object! Error code 'Browser': LEGACY_BROWSER"); 
                    sessionStorage.setItem('geoFail', 'LEGACY_BROWSER');
                break;
                default: 
                    console.log("Unknown error: " + err.message); 
                    sessionStorage.setItem('geoFail', 'UNKNOWN_ERROR');
                break; 
            }
            this.hasGeo = false;
        }
        else
        {
            this.status(); // if called without err argument give status
        }
    
    },

    /* ------------------------------------------------------------------------ *  
        !status
            logs lat and lon (from scope Geo.lat & Geo.lon)
            logs out geolocation error (Geo.fail)
            logs out status message (Geo.status)
    * ------------------------------------------------------------------------ */
    status: function (){
        if(this.lat == 'number' && this.lon == 'number'){
            console.log('Latitude: ' + this.lat + '<br/>Longitude: ' + this.lon );
        } 
        else if(sessionStorage.getItem('geoFail') != null)
        {
            console.log( 'Status: ' + sessionStorage.getItem('geoFail') );        
        }else
        {
            console.log( 'Status: ' + sessionStorage.getItem('geoStatus') );
        }
    }

}


// Testing 

// New class instance
var geo = new Geo();

// fire up geolocation
geo.location();

// geo.ready only fires once geolocation's position object is available'
// otherwise you might be trying to use position data before user allows access
geo.ready = function () {

    // check hasGeo before trying to use .lat and .lon
    if ( geo.hasGeo ){ 

        console.log('Lat: ' + geo.lat);
        console.log('Lon: ' + geo.lon);
    }

}

    	var h2 = document.querySelector('.geo');
    	var latitude = document.createElement('P');
    		latitude.className = 'latitude';
    	var longitude = document.createElement('P');
    		longitude.className = 'longitude';

    	h2.appendChild(latitude);
    	h2.appendChild(longitude);

    	latitude.textContent = geo.lat;
    	longitude.textContent = geo.lon;

        console.log('Lat: ' + geo.lat);
        console.log('Lon: ' + geo.lon);
    }

}
