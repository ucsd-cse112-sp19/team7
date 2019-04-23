class TestWebComponent extends HTMLElement {
    constructor() {
        super();

        var clicked = false;

        var body = document.createElement('body');

        this.appendChild(body);

        body.innerHTML = 'Click Me!';

        document.querySelector('test-er').addEventListener('click', function() {
            if (!clicked) {
                body.innerHTML = 'Clicked';
            }
            else {
                body.innerHTML = 'Unclicked';
            }

            clicked = !clicked;
        });
    }
}

window.customElements.define('test-er', TestWebComponent)