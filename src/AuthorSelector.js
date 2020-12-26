/* a webcomponent to chosse an Author
*/

import getAuthors from './Authors.js'
import '@vaadin/vaadin-combo-box'

class AuthorSelector extends HTMLElement {
  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML =`
    <vaadin-combo-box id="authorSelector" label="author"  item-value-path="feedId" item-label-path="name"
      clear-button-visible allow-custom-value></vaadin-combo-box>
    `
    const authorSelector = shadowRoot.getElementById('authorSelector')
    
    const self = this

    authorSelector.addEventListener('change', (event) => {
       self.value = event.target.value;
    })

    await customElements.whenDefined('vaadin-combo-box')
    
    authorSelector.items = []

    pull(
      getAuthors(),
      pull.drain(value => authorSelector.items = [...authorSelector.items, value])
    )
  }
}

customElements.define("author-selector", AuthorSelector);