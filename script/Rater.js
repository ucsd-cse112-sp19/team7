class Rater extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: "open"});
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    var author = document.createElement("p");
    var info = document.createElement("p");

    var authortext = "Author: " + this.getAttribute("author");
    var text = "Description: " + this.getAttribute("des");
    info.textContent = text;
    author.textContent = authortext;
    var imgUrl;
    if(this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "background.jpg";
    }
    var img = document.createElement("img");
    img.src = imgUrl;
    img.height="300";

    const slider = document.createElement("div");
    const item1 = document.createElement("span");
    const star1 = document.createElement("img");
    const item2 = document.createElement("span");
    const star2 = document.createElement("img");
    const item3 = document.createElement("span");
    const star3 = document.createElement("img");
    const item4 = document.createElement("span");
    const star4 = document.createElement("img");
    const item5 = document.createElement("span");
    const star5 = document.createElement("img");
    star1.src="star.png";
    star1.height="20";
    star2.src="star.png";
    star2.height="20";
    star3.src="star.png";
    star3.height="20";
    star4.src="star.png";
    star4.height="20";
    star5.src="star.png";
    star5.height="20";
    const ratertext = document.createElement("p");
    var ratetext = "";
    ratertext.textContent = ratetext;

    item1.appendChild(star1);
    slider.appendChild(item1);
    item2.appendChild(star2);
    slider.appendChild(item2);
    item3.appendChild(star3);
    slider.appendChild(item3);
    item4.appendChild(star4);
    slider.appendChild(item4);
    item5.appendChild(star5);
    slider.appendChild(item5);
    slider.appendChild(ratertext);

    star1.addEventListener("click", function() {
      star1.src="starclicked.png";
      star2.src="star.png";
      star3.src="star.png";
      star4.src="star.png";
      star5.src="star.png";
      ratetext = "Nah";
      ratertext.textContent = ratetext;
    });
    star2.addEventListener("click", function() {
      star1.src="starclicked.png";
      star2.src="starclicked.png";
      star3.src="star.png";
      star4.src="star.png";
      star5.src="star.png";
      ratetext = "Hmm";
      ratertext.textContent = ratetext;
    });
    star3.addEventListener("click", function() {
      star1.src="starclicked.png";
      star2.src="starclicked.png";
      star3.src="starclicked.png";
      star4.src="star.png";
      star5.src="star.png";
      ratetext = "OK";
      ratertext.textContent = ratetext;
    });
    star4.addEventListener("click", function() {
      star1.src="starclicked.png";
      star2.src="starclicked.png";
      star3.src="starclicked.png";
      star4.src="starclicked.png";
      star5.src="star.png";
      ratetext = "Wow!";
      ratertext.textContent = ratetext;
    });
    star5.addEventListener("click", function() {
      star1.src="starclicked.png";
      star2.src="starclicked.png";
      star3.src="starclicked.png";
      star4.src="starclicked.png";
      star5.src="starclicked.png";
      ratetext = "Bang!";
      ratertext.textContent = ratetext;
    });


    shadow.appendChild(wrapper);
    wrapper.appendChild(img);
    wrapper.appendChild(author);
    author.setAttribute("id","author");
    wrapper.appendChild(info);
    info.setAttribute("id","info");
    wrapper.appendChild(slider);

  }
}
  
customElements.define("rater-r", Rater);
