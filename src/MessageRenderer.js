export default class MessageRenderer extends HTMLElement {
  async connectedCallback() {
    const outputArea = this.attachShadow({ mode: 'open' });
    outputArea.innerHTML += `<pre>${JSON.stringify(this.msg, null, 2)}</pre>`
    outputArea.innerHTML += '<hr>'
    // this just print the full object out as a string that's been nicely indented
    // with each level of nesting
  }
}

customElements.define("message-renderer", MessageRenderer);