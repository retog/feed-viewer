/* a webcomponent to chosse a message-type 
*/

import getMessageTypes from './MessageTypes.js'
import '@vaadin/vaadin-combo-box'

class TypeSelector extends HTMLElement {
  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML =`
    <vaadin-combo-box id="typeSelector" label="type" clear-button-visible allow-custom-value></vaadin-combo-box>
    `
    const typeSelector = shadowRoot.getElementById('typeSelector')
    
    const self = this

    typeSelector.addEventListener('change', (event) => {
       self.value = event.target.value;
    })

    await customElements.whenDefined('vaadin-combo-box')
    
    typeSelector.items = []

    pull(
      getMessageTypes(),
      pull.drain(value => typeSelector.items = [...typeSelector.items, value])
    )
  }
}

customElements.define("type-selector", TypeSelector);