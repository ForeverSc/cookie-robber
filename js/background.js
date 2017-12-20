let robberURL = JSON.parse(localStorage.getItem('robber'))
let hostageURL = JSON.parse(localStorage.getItem('hostage'))

init()

function init() {
  if (!robberURL || !hostageURL) return 
  chrome.cookies.getAll({
    url: hostageURL
  }, function (cookies) {
    cookies && cookies.forEach(({ name, value }) => {
      chrome.cookies.set({
        url: robberURL,
        name,
        value
      })
    })
  })
}

chrome.runtime.onMessage.addListener(function (req) {
  if (req.type === 'rob-hostage') {
    robberURL = req.robber
    hostageURL = req.hostage
  }
})

chrome.cookies.onChanged.addListener(function(info) {
  const cookie = info.cookie
  if (cookie.domain === getDomain(hostageURL)) {
    const name = cookie.name 
    const value = cookie.value
   
    chrome.cookies.get({
      url: robberURL,
      name
    }, function(targetCookie) {
      if (!targetCookie || targetCookie.value !== value) {
        chrome.cookies.set({
          url: robberURL,
          name,
          value
        })
        focusOrCreateTab(robberURL)
      }
    })
  }
})

function getDomain(url) {
  const reg = /https?:\/\/([^\/]+)\/?/
  const resArr = reg.exec(url)

  return resArr && resArr[1] 
}


function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
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
      chrome.tabs.update(existing_tab.id, {"selected":true});
      chrome.tabs.reload(existing_tab.id)
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}

