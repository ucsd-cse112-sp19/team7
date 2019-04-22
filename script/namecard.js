// by Oscar Huang 
// demo simple web component for cse112
// implements a simple name card compenent
// takes attribute: name, position, email, major, color
//  ex: <name-card name="Chunan (Oscar) Huang" img="./img.jpg" position="Quality Assurance" email="chh179@ucsd.edu" major="BS: Computer Engineering" ></name-card>
class nameCard extends HTMLElement {
    constructor() {
        super();

        /* ---- header part ---- */
        var header = document.createElement("div");
        header.insertAdjacentHTML('afterbegin', 
            `<head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
            </head>`);

        /* ---- body part ---- */
        var body = document.createElement("body");

        // whole name card
        var card = document.createElement("div");
        card.style.width = "570px";
        card.style.minWidth = "500px";
        // color of card
        if(!this.getAttribute('color') ){
          card.style.background = "#cbe1ef"; //default color
        }
        else{
          card.style.background = this.getAttribute('color') ;
        }
        card.style.borderStyle = "double";
        card.style.borderWidth = "5px";

        // container of name card
        var container = document.createElement("div");
        container.className = "container";
        container.style.marginBottom = "15px";
    
        // name 
        var h1 = document.createElement("h1");
        if(!this.getAttribute('name') ){
          h1.textContent = "YOUR NAME";
        }
        else{
          h1.textContent = this.getAttribute('name') ;
        }
        
        // row under name; it has two part
        var row = document.createElement("div");
        row.className = "row";
        // left part
        var col1 = document.createElement("figure");
        col1.className = "col-sm-3";
        col1.style.minWidth = "300px";
        const img = document.createElement('img');
        img.src = this.getAttribute('img'); 
        //img.style.width = "230px";
        img.style.height = "280px";
        img.style.borderStyle = "dashed";
        img.style.borderWidth = "3px";
        col1.appendChild(img);
        // right part
        var col2 = document.createElement("figure");
        col2.className = "col-sm-3";
        // text in the right-part
        var pos = document.createElement('h3');
        pos.textContent = "POSITION:";
        var pos_info = document.createElement('h4');
        pos_info.textContent = this.getAttribute('position');
        var email = document.createElement('h3');
        email.textContent = "EMAIL:";
        var email_info = document.createElement('h4');
        email_info.textContent = this.getAttribute('email');
        var major = document.createElement('h3');
        major.textContent = "MAJOR:";
        var major_info = document.createElement('h4');
        major_info.textContent = this.getAttribute('major');
        // append to right-part
        col2.appendChild(pos);
        col2.appendChild(pos_info);
        col2.appendChild(email);
        col2.appendChild(email_info);
        col2.appendChild(major);
        col2.appendChild(major_info);

        // append left/right parts to row
        row.appendChild(col1);
        row.appendChild(col2);
        // assemble
        container.appendChild(h1);
        container.appendChild(document.createElement("br"));
        container.appendChild(row);
        card.appendChild(container);
        body.appendChild(card);

        // combine header and body
        var file = document.createElement("div");
        file.appendChild(header);
        file.appendChild(body);

        
        //file.appendChild(p);

        // to shadow DOM
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(file);
        shadowRoot.appendChild(document.createElement('br'));
        
    }
}

customElements.define('name-card', nameCard);
