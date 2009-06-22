Titanium.UI.ready = function() {
  try {
    //Configure services
    var endpoint = 'http://noteorious.heroku.com';
    var services = {
      index: {
        getUrl: function() {
          return endpoint+'/notes.xml';
        },
        method: 'GET'
      }
    };
    
    //Initialize UI components
    Titanium.UI.setPropertyBackground();
    Titanium.UI.createGroupedView('create','button',[{title:'Fetch Notes'},{title:'Create New Note'}],function(index) {
      $("#new").slideDown();
		});
    
    //Set up forms and various other controls
    $("#cancel").live('click',function() {
      $("#new").slideUp();
    });
    
    $("add").live('click',function() {
      //add
    });    
    
    //Fetch initial data
    var xhr = Titanium.Network.createHTTPClient();
    var done = false;
    xhr.onreadystatechange = function() {
      try {
        if (this.readyState == 4 && !done) {
          done = true;
          var parser = new DOMParser();
          var doc = parser.parseFromString(this.responseText, "text/xml");
          $(doc).find("notes note content").each(function() {
            var node = $(this);
            $("#notes").append("<p>"+node.text()+"</p>");
          });
  			}
      }
      catch(e) {
        Titanium.API.debug(e);
      }
    };
    xhr.open(services.index.method,services.index.getUrl());
    xhr.send();
  }
  catch(e) {
    Titanium.API.debug(e);
  }
};