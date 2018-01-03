import storage from '../util/storage'
import cookies from '../api/cookies'
import runtime from '../api/runtime'
import browserAction from '../api/browserAction'
import { getDomain, focusOrCreateTab } from '../util/helper'
import Bindings from '../class/Bindings'

const bindings = new Bindings()

init()

async function init() {
  if (bindings.isEmpty()) return

  const all = bindings.get()
  all.forEach((binding) => {
    bindCookies(binding)
  })
}

async function bindCookies({ local, online }) {
  const resCookies = await cookies.getAll({ url: online }) || []
  
  resCookies.forEach(({ name, value })=> {
    cookies.set({
      url: local,
      name,
      value
    })
  })
}

runtime.onMessage = function ({ type, binding }) {
  if (type === 'update') {
    bindings.update(binding)
  }
}

cookies.onChanged = function({ cookie, cause }) {
  if (cause !== 'explicit') return
  const { domain, name, value } = cookie
  const all = bindings.get()

  all.forEach((binding) => {
    cookieChange(domain, name, value, binding)
  })
}

async function cookieChange(domain, name, value, { local, online, bind}) {
  if (bind && domain === getDomain(online)) {
    const targetCookie = await cookies.get({
      url: local,
      name
    })

    cookies.set({
      url: local,
      name,
      value
    }, (cookie) => {
      focusOrCreateTab(local)
    })
  }
}

browserAction.onClicked = function(tab) {
  const url = chrome.extension.getURL("settings.html");
  focusOrCreateTab(url);
}
