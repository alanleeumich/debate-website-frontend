var UserProfile = (function() {
    var username = "";
    var password = ""


    var getUsername = function() {
      return username;    // Or pull this from cookie/localStorage
    };
  
    var setUsername = function(name) {
      username = name;     
      // Also set this in cookie/localStorage
    };

    var getPassword = function() {
        return password;    // Or pull this from cookie/localStorage
      };
    
      var setPassword = function(name) {
        password = name;     
        // Also set this in cookie/localStorage
      };
    
  
    return {
        getUsername: getUsername,
        setUsername: setUsername,
        getPassword: getPassword,
        setPassword: setPassword
    }
  
  })();
  
  export default UserProfile;