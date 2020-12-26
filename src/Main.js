import getMessageTypes from './MessageTypes.js'
import getAuthors from './Authors.js'
import '@vaadin/vaadin-combo-box'

root.innerHTML = `<h1>Scuttlebutt Feedviewer</h1>

<vaadin-combo-box class="typeSelector" label="type" clear-button-visible allow-custom-value></vaadin-combo-box>
<vaadin-combo-box class="authorSelector" label="author"  item-value-path="feedId" item-label-path="name"
      clear-button-visible allow-custom-value></vaadin-combo-box>

<button class="query">Query</button>

<div class="output"></div>
`
const typeSelector = root.getElementsByClassName('typeSelector')[0]
const authorSelector = root.getElementsByClassName('authorSelector')[0]
const outputArea = root.getElementsByClassName('output')[0]

//ensure all webomponents are defined
const undefinedElements = root.querySelectorAll(':not(:defined)')

const promises = [...undefinedElements].map(
  component => customElements.whenDefined(component.localName)
)

;(async () => { 
  await Promise.all(promises)

  typeSelector.items = []

  pull(
    getMessageTypes(),
    pull.drain(value => typeSelector.items = [...typeSelector.items, value])
  )

  authorSelector.items = []

  pull(
    getAuthors(),
    pull.drain(value => {
      console.log("value", value)
      authorSelector.items = [...authorSelector.items, value]
    })
  )


})()

