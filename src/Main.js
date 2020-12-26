import './TypeSelector.js'
import './AuthorSelector'

root.innerHTML = `
<h1>Scuttlebutt Feedviewer</h1>

<type-selector></type-selector>
<author-selector></author-selector>

<button class="query">Query</button>

<div class="output"></div>
`
const typeSelector = root.getElementsByTagName('type-selector')[0]
const authorSelector = root.getElementsByTagName('author-selector')[0]
const outputArea = root.getElementsByClassName('output')[0]
const queryButton = root.getElementsByClassName('query')[0]

queryButton.addEventListener('click', function (event) {
  outputArea.innerHTML = `<div id="header">
  type: ${typeSelector.value}, author: ${authorSelector.value}
  </div>`

  const opts = {
    limit: 100,
    reverse: true,
    query: [
      {
        $filter: {
          value: {
            author: authorSelector.value,
            content: {
              type: typeSelector.value 
            }
          }
        }
      }
    ]
  }

  function prettyPrint(msg) {
    outputArea.innerHTML += `<pre>${JSON.stringify(msg, null, 2)}</pre>`
    outputArea.innerHTML += '<hr>'
    // this just print the full object out as a string that's been nicely indented
    // with each level of nesting
  }

  pull(
    sbot.query.read(opts),
    pull.drain(prettyPrint)
  )


})


