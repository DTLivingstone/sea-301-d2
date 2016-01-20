(function(module) {
  var repos = {};

  repos.all = [];

  // TODO: Refactor this ajax call into a get request to the proxy end point provided by server.js.
  // repos.requestRepos = function(callback) {
  //   $.ajax({
  //     url: 'https://api.github.com/users/DTLivingstone/repos' +
  //           '?per_page=100' +
  //           '&sort=updated',
  //     type: 'GET',
  //     headers: { 'Authorization': 'token ' + githubToken },
  //     success: function(data, message, xhr) {
  //       repos.all = data;
  //     }
  //   }).done(callback);
  // };

  // replace this with a $.get () call
  // repos.requestRepos = function(callback) {
  //  $.ajax({
  //    url: '/github/users/DTLivingstone/repos' +
  //          '?per_page=100' + '&sort=updated',
  //    type: 'GET',
  //    success: function(data, message, xhr) {
  //      repos.all = data;
  //    }
  //  }).done(callback);
  // };

  repos.requestRepos = function(callback) {
    $.get("/github/users/DTLivingstone/repos?per_page=100&sort=updated")
    .done(function(data, message, xhr) {
      repos.all = data;
      callback();
    })
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
