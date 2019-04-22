
class ShittyDraft extends HTMLElement {
    constructor() {
        super();
        
        //var newDraft = document.createElement('shitty-draft-leon')
        var body = document.createElement('body');
        // Add it to the page
        
        this.appendChild(body);
        // Output hello world
        body.innerHTML = 'Hello World! - Leon';
        // Attach event listeners
        document.querySelector('shitty-draft-leon').addEventListener('click', function() {
            body.innerHTML = 'Clicked';
            });
    }
}

window.customElements.define('shitty-draft-leon', ShittyDraft)

