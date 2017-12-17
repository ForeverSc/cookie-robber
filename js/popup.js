function createTab(url) {
  chrome.tabs.create({
    'url': chrome.extension.getURL(url),
    'selected': true
  })
}

document.addEventListener('DOMContentLoaded', function DOMContentLoaded(params) {
  const manageBtn = document.querySelector('#manage')
  const bindBtn = document.querySelector('#bind')

  // manageBtn.addEventListener('click', function clickManage() {
  //   createTab('html/manager.html')
  // })
  bindBtn.addEventListener('click', function clickBind() {
    createTab('html/bind.html')
  })

})