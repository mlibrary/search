Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

function initPride() {
  Pride.init({
    success: function() {
      console.log('Pride loaded successfully.')
      loadPride()
    },
    failure: function() {
      console.log('Pride failed to load.')
    }
  })
}

initPride();

function loadPride() {
  var datastores = Pride.AllDatastores.array

  _.each(datastores, function(datastore) {
    var uid        = datastore.get('uid')
    var name       = datastore.get('metadata').name
    var short_desc = datastore.get('metadata').short_desc

    store.dispatch(addDatastore({
      uid: uid,
      name: name,
      short_desc: short_desc
    }))
  })
}
