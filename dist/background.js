/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var robberURL = JSON.parse(localStorage.getItem('robber'));
var hostageURL = JSON.parse(localStorage.getItem('hostage'));

init();

function init() {
  if (!robberURL || !hostageURL) return;
  chrome.cookies.getAll({
    url: hostageURL
  }, function (cookies) {
    cookies && cookies.forEach(function (_ref) {
      var name = _ref.name,
          value = _ref.value;

      chrome.cookies.set({
        url: robberURL,
        name: name,
        value: value
      });
    });
  });
}

chrome.runtime.onMessage.addListener(function (req) {
  if (req.type === 'rob-hostage') {
    robberURL = req.robber;
    hostageURL = req.hostage;
  }
});

chrome.cookies.onChanged.addListener(function (info) {
  var cookie = info.cookie;
  if (cookie.domain === getDomain(hostageURL)) {
    var name = cookie.name;
    var value = cookie.value;

    chrome.cookies.get({
      url: robberURL,
      name: name
    }, function (targetCookie) {
      if (!targetCookie || targetCookie.value !== value) {
        chrome.cookies.set({
          url: robberURL,
          name: name,
          value: value
        });
        focusOrCreateTab(robberURL);
      }
    });
  }
});

function getDomain(url) {
  var reg = /https?:\/\/([^\/]+):?\d*\/?/;
  var resArr = reg.exec(url);

  return resArr && resArr[1];
}

function focusOrCreateTab(url) {
  chrome.windows.getAll({ "populate": true }, function (windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (getDomain(tab.url) === getDomain(url)) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, { "selected": true });
      chrome.tabs.reload(existing_tab.id);
    } else {
      chrome.tabs.create({ "url": url, "selected": true });
    }
  });
}
chrome.browserAction.onClicked.addListener(function (tab) {
  var manager_url = chrome.extension.getURL("settings.html");
  console.log(manager_url);
  focusOrCreateTab(manager_url);
});

/***/ })

/******/ });