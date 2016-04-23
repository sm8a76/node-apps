module.exports = function(key, body){
      var len = key.length;
      var index = body.indexOf(key);
      var businessData = '';    

      if(index > -1){
          //console.log("INDEX: " + index);          
          var startIndex = index + len;
          var found = false;
          var i = startIndex - 1;
          var rawValue = '';

          while(!found){
              rawValue = rawValue + body.toString().charAt(i);
              if(rawValue.lastIndexOf('</b>') > -1){
                  found = true;
              } else {
                  i = i + 1;
              }
          }

          //console.log("HTML Data: " + rawValue); 

          if(found){
              var begin = rawValue.indexOf("<b>");
              var end = rawValue.indexOf("</b>");
              //console.log("begin: " + begin); 
              //console.log("end: " + end); 

              if(begin > -1 && end > -1){
                  var data = rawValue.substr(begin + 3, end - (begin + 3));
                  
                  begin = data.indexOf("<small>");
                  end = data.indexOf("</small>");
                  
                  if(begin > -1 && end > -1){
                      data = data.substr(begin + 7, end - (begin + 7));
                  } 
                  
                  begin = data.indexOf("<span");
                  end = data.indexOf("</span>");                  
                  
                  if(begin > -1 && end > -1){
                      data = data.substr(begin + 29, end - (begin + 29));
                  }                   
                  
                  businessData = data;
                  
              }

              //console.log("Business Data:" + businessData); 
          }
      }
    
      return businessData;

}

