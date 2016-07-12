console.log(Pride)

Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

Pride.init({
  success: function() {
    console.log('success')
  },
  failure: function() {
    console.log('failure')
  }
})

console.log('hello world')
