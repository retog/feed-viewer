import './MessageRenderer.js'
import './TypeSelector.js'
import './AuthorSelector'
import '@vaadin/vaadin-text-field/vaadin-number-field.js'

root.innerHTML = `
<h1>Scuttlebutt Feedviewer</h1>

<type-selector></type-selector>
<author-selector></author-selector>

<vaadin-number-field label="limit" value="20" min="1" 
step="10" has-controls></vaadin-number-field>

<button class="query">Query</button>

<div class="output"></div>
`
const typeSelector = root.getElementsByTagName('type-selector')[0]
const authorSelector = root.getElementsByTagName('author-selector')[0]
const limitSelector = root.getElementsByTagName('vaadin-number-field')[0]
const outputArea = root.getElementsByClassName('output')[0]
const queryButton = root.getElementsByClassName('query')[0]

queryButton.addEventListener('click', function (event) {
  const typeFilter = typeSelector.value !== '' ? typeSelector.value : undefined
  const authorFilter = authorSelector.value !== '' ? authorSelector.value : undefined
  const limit = limitSelector.value !== '' ? Number.parseInt(limitSelector.value) : undefined
  outputArea.innerHTML = `<div id="header">
  type: ${typeFilter ? typeFilter : '<i>all types</i>'}, author: ${authorFilter ? authorFilter : '<i>any author</i>'},
  limit: ${limit}
  </div>`

  const opts = {
    limit,
    reverse: true,
    query: [
      {
        $filter: {
          value: {
            author: authorFilter,
            content: {
              type: typeFilter
            }
          },
          timestamp: { $gt: 0 } // a hack that forces ordering by timestamp
        }
      }
    ]
  }

  pull(
    sbot.query.read(opts),
    pull.drain(msg => {
      const messageRenderer = document.createElement('message-renderer')
      messageRenderer.msg = msg
      outputArea.append(messageRenderer)
    })
  )


})


