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
  const typeFilter = typeSelector.value !== '' ? typeSelector.value : undefined
  const authorFilter = authorSelector.value !== '' ? authorSelector.value : undefined
  outputArea.innerHTML = `<div id="header">
  type: ${typeFilter ? typeFilter : '<i>all types</i>'}, author: ${authorFilter ? authorFilter : '<i>any author</i>'}
  </div>`

  const opts = {
    limit: 100,
    reverse: true,
    query: [
      {
        $filter: {
          value: {
            author: authorFilter,
            content: {
              type: typeFilter
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


