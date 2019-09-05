function saveOptions(e) {
  e.preventDefault()
  try {
    browser.storage.local.set({
      url: readUrls()
    })
  } catch(e) {
    document.querySelector('#errorMsg').innerHTML = e.message
  }
}

function restoreOptions() {
  const urls = browser.storage.local.get('url')
  urls.then(
    (res) => {
      document.querySelector('#urls').value = res.url.join('\n')
    },
    (err) => {
      console.log(`Error: ${err}`)
    }
  )
}

function readUrls() {
  const input = document.querySelector('#urls').value
  const urls = input.split('\n')
  console.log(input)
  for (let [index, val] of urls.entries()) {
    if (!isRegexValid(val)) {
      throw Error(`Regex error at line ${index+1}`)
    }
  }
  console.log('Regex all OK')
  return urls
}

function isRegexValid(regex) {
  var valid = true
  try {
    new RegExp(regex)
  } catch(e) {
    valid = false
  }
  return valid
}

document.addEventListener("DOMContentLoaded", restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)