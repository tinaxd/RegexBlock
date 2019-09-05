function redirectSite(tabId, url) {
  //tab.off('ready',redirectSite);
  browser.tabs.update(tabId, {url: url})
  console.log('Redirected')
}

function blockSite(tabId) {
  //console.log('Site blocked')
  redirectSite(tabId, browser.extension.getURL('blocked.html'))
}

function makeRegex(str) {
  const rawRegex = new RegExp(str)
  if (rawRegex.test('about:addons')) {
    return new RegExp('^https?:\\/\\/' + str)
  } else {
    return rawRegex
  }
}

browser.tabs.onUpdated.addListener((tabId, change, tab) => {
  const url = tab.url
  const urls = browser.storage.local.get('url')

  urls.then(
    (res) => {
      const patterns = res.url
      for (let pattern of patterns) {
        const regex = makeRegex(pattern)
        if (regex.test(url)) {
          blockSite(tabId)
          return
        }
      }
      //console.log('Site allowed')
    },

    (err) => {
      console.log(err)
    }
  )
})