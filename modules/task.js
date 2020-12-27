const template = document.createElement('template');

template.innerHTML = `
<style>
    .task-container {
        border: 1px solid #000;
        border-width: 1px 0;
        padding: 8px 0;
    }
    input {
        border: 0;
    }
</style>
<div class="task-container">
    <input placeholder="Unnamed Task" type="text"></input>
    <stop-watch></stop-watch>
    <button data-task-remove>Remove</button>
</div>
`;

class Task extends HTMLElement {
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('task-module', Task);