import '@vaadin/vaadin-tabs/vaadin-tabs.js'
import { getAuthorName } from './Authors.js'

export default class MessageRenderer extends HTMLElement {
  async connectedCallback() {
    const renderingOptions = [
      {
        name: 'Framed',
        renderer: (element) => {
          const authorNameArea = document.createElement('div')
          element.append(authorNameArea)
          authorNameArea.innerText = 'fdsfsd'+this.msg.value.author
          getAuthorName(this.msg.value.author).then(name => {
            console.log('got name',name)
            authorNameArea.innerHTML = `<div>${name}</div>`
          }).catch(console.log)
          const date = new Date(this.msg.value.timestamp)
          const dateArea = document.createElement('div')
          dateArea.innerHTML += `<i>${date.toLocaleString()}</i>`
          element.append(dateArea)
          const contentArea = document.createElement('pre')
          contentArea.innerText += JSON.stringify(this.msg.value.content, null, 2)
          element.append(contentArea)
        }
      },
      {
        name: 'Raw',
        renderer: (element) => {
          element.innerHTML += `<pre>${JSON.stringify(this.msg, null, 2)}</pre>`
          element.innerHTML += '<hr>'
        }
      }
    ]

    const outputArea = this.attachShadow({ mode: 'open' });
    const tabs = document.createElement('vaadin-tabs')
    tabs.selected = 0
    renderingOptions.forEach(entry => {
      const tab = document.createElement('vaadin-tab')
      tabs.append(tab)
      tab.innerText = entry.name
      tab.renderer = entry.renderer
    })
    outputArea.append(tabs)
    const tabContent = document.createElement('div')
    outputArea.append(tabContent)
    renderingOptions[tabs.selected].renderer(tabContent)
    tabs.addEventListener('selected-changed', event => {
      console.log(event.detail.value)
      tabContent.innerHTML = ''
      tabs.items[event.detail.value].renderer(tabContent)
    })

  }

  

}

customElements.define("message-renderer", MessageRenderer);