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
      },
      create: {
        getUrl: function() {
          return endpoint+'/notes.xml';
        },
        method: 'POST'
      },
      destroy: {
        getUrl: function(id) {
          return endpoint+'/notes/'+id+'.xml?_method=delete';
        },
        method: 'POST'
      }
    };
    
    //Get all notes and append
    function doIndex() {
      //Clear out container and show laoder if it is hidden
      $("#list").html('');
      $(".indicator").show();
      
      //Fetch initial data
      var xhr = Titanium.Network.createHTTPClient();
      var done = false;
      xhr.onreadystatechange = function() {
        try {
          if (this.readyState == 4 && !done) {
            done = true;
            $(".indicator").hide();
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.responseText, "text/xml");
            $(doc).find("notes note").each(function() {
              var node = $(this);
              var html = "<li><img class='deleter' src='delete.png'/>";
              html += "<input type='hidden' name='id' value='"+node.find("id").text()+"'></input>";
              html += node.find("content").text()+"</li>";
              $("#list").append(html);
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
    
    //add a new note from the text field
    function doAdd() {
      try {
        var content = $("#note").val();
        $("#note").val('');
        var xhr1 = Titanium.Network.createHTTPClient();
        var done = false;
        xhr1.onreadystatechange = function() {
          try {
            if (this.readyState == 4 && !done) {
              done = true;
              doIndex();
      			}
          }
          catch(e) {
            Titanium.API.debug(e);
          }
        };
        xhr1.open(services.create.method,services.create.getUrl()+"?note[content]="+encodeURI(content));
        xhr1.send();
      }
      catch (e) {
        Titanium.API.debug(e);
      }
    }
    
    function doDelete(id) {
      try {
        var xhr2 = Titanium.Network.createHTTPClient();
        var done = false;
        xhr2.onreadystatechange = function() {
          try {
            if (this.readyState == 4 && !done) {
              done = true;
              doIndex();
      			}
          }
          catch(e) {
            Titanium.API.debug(e);
          }
        };
        xhr2.open(services.destroy.method,services.destroy.getUrl(id));
        xhr2.send();
      }
      catch (e) {
        Titanium.API.debug(e);
      }
    }
    
    //Initialize UI components
    Titanium.UI.setPropertyBackground();
    Titanium.UI.createGroupedView('create','button',[{title:'Refresh Notes'}],function(index) {
      doIndex()
		});
    
    //Set up forms and various other controls
    $("#cancel").click(function() {
      $("#note").val('');
    });
    
    $("#add").click(function() {
      Titanium.API.debug('adding...');
      doAdd();
    });
    
    $(".deleter").live("click",function() {
      doDelete($(this).siblings("input").val());
    });
    
    //Do an initial request for notes
    doIndex();
  }
  catch(e) {
    Titanium.API.debug(e);
  }
};