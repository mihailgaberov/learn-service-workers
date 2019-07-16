(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _mockAPI = require("./mockAPI");

var TIME_BEFORE_REMOVING_IMG = 3000;
var TIME_FOR_UPDATING_CLOCK = 1000;

function renderSeconds(element) {
  setInterval(function () {
    element.innerText = new Date().toTimeString().substr(0, 9);
  }, TIME_FOR_UPDATING_CLOCK);
}

function renderImage(srcUrl) {
  var img = document.createElement('img');
  img.src = srcUrl;
  document.body.appendChild(img);
  setTimeout(function () {
    document.body.removeChild(img);
  }, TIME_BEFORE_REMOVING_IMG);
} // Start timer when load the page


window.onload = function () {
  renderSeconds(document.getElementById('time'));
};

var btnFetch = document.getElementById('fetch-btn');
btnFetch.addEventListener('click', function () {
  var isServiceWorkingOn = document.getElementById('switcher-on').checked === true;

  if (isServiceWorkingOn) {
    navigator.serviceWorker.controller.postMessage('FETCH_IMAGE');
  } else {
    for (var i = 0; i < 100000; i++) {
      console.log('Blocking main thread.');
    }

    renderImage((0, _mockAPI.loadImageSync)());
  }
}); // Message from Service Worker

navigator.serviceWorker.addEventListener('message', function (event) {
  var srcUrl = event.data;
  renderImage(srcUrl);
});

},{"./mockAPI":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImageSync = loadImageSync;
var DELAY = 5000;

function loadImageSync() {
  var request = new XMLHttpRequest();
  request.open('GET', '/assets/big_image_10mb.jpg', false); // `false` makes the request synchronous

  request.send(null);

  if (request.status === 200) {
    return request.responseURL;
  }
}

},{}]},{},[1,2]);
