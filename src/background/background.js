import cookies from '../api/cookies'
import runtime from '../api/runtime'
import browserAction from '../api/browserAction'
import { getDomain, focusOrCreateTab, getBindings } from '../util/helper'

init()

function init () {
  startListenBrowserAction()
  syncAllBindings()
  startWatchCookies()
  startListenMsg()
}

/**
 * 同步所有绑定，将线上的cookie拷贝至开发环境
 */
function syncAllBindings () {
  const all = getBindings()

  if (!all) return

  all.forEach(robCookies)
}

/**
 * 开始监听Cookies的变化
 */
function startWatchCookies () {
  cookies.onChanged = function ({ cookie, cause }) {
    if (cause !== 'explicit') return

    const all = getBindings()

    if (!all) return

    all.forEach((binding) => {
      syncCookieChange(cookie, binding)
    })
  }
}
/**
 * 同步Cookie的变化，更新本地开发域的cookie
 * @param {Object} cookie 变化的cookie
 * @param {Binding} binding 绑定对象
 */
async function syncCookieChange ({ domain, name, value }, { local, online, bind }) {
  if (bind && domain === getDomain(online)) {
    cookies.set({
      url: local,
      name,
      value
    }, (cookie) => {
      focusOrCreateTab(local)
    })
  }
}

/**
 * 开始监听msg
 */
function startListenMsg () {
  runtime.onMessage = async function ({ type, binding }) {
    if (type === 'update') {
      robCookies(binding)
    }
  }
}

/**
 * 将线上环境的cookie复制到开发环境中
 * @param {Binding} 绑定对象
 */
async function robCookies ({ local, online, bind }) {
  if (!bind) return

  const onlineCookies = await cookies.getAll({ url: online })

  if (!onlineCookies) return

  onlineCookies.forEach(({ name, value }) => {
    cookies.set({
      url: local,
      name,
      value
    })
  })
}

/**
 * 开始监听浏览器事件
 */
function startListenBrowserAction () {
  browserAction.onClicked = function (tab) {
    const url = chrome.extension.getURL('settings.html')

    focusOrCreateTab(url)
  }
}
