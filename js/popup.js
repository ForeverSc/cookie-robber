document.addEventListener('DOMContentLoaded', function DOMContentLoaded(params) {
  const manageBtn = document.querySelector('#manage')
  manageBtn.addEventListener('click', function clickManage() {
    chrome.tabs.create({
      'url': chrome.extension.getURL("html/manager.html"),
      'selected': true
    })
  })
})