// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('modernizr');

if (! Modernizr.flexbox ||
  ! Modernizr.rgba) {
  alert('Unfortunately, your browser appears to be too old. ' +
    'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer. ' +
    'If you are using the latest Internet Explorer, you will need to turn off Compatibility Mode.');
}

require("index-" + __THEME__ + ".scss");
require("!style!css!highlight.js/styles/github.css");

var React = require('react');
var Router = require('react-router');

var rootPath = '/docs/' + ('grommet' === __THEME__ ? '' : __THEME__ + '/');

if (NODE_ENV === 'development') {
  rootPath = "/"; // webpack-dev-server
}

var routes = require('./routes')(rootPath);
var router = Router.create({routes: routes, location: Router.HistoryLocation});

router.run(function (Handler) {
  var element = document.getElementById('content');
  var locale = window.navigator.userLanguage || window.navigator.language;
  React.render(<Handler locales={locale} />, element);
  document.querySelectorAll('.docs')[0].scrollTop = 0;
});

document.body.classList.remove('loading');
