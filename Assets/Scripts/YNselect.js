
class YesNoSelect extends HTMLElement {
    localShadow;
    active = false;
    constructor() {
        super();
        this.localShadow = this.attachShadow({ mode: "open" }); 
        
        this.localShadow.innerHTML = `
        <div id="div-cursor"></div>
        <style>
        div.text-display {
            position: relative;
            inset: 25% 0%;
            text-align: center;
            color: inherit;
            text-shadow: inherit;
            
        }
        div#div-cursor {
            position:absolute; width: 100%; height: 100%; cursor: pointer;
            z-index: ${this.style.zIndex + 1};
        }
        </style>
        <div class="text-display"></div> `;
        // const styleElem = document.createElement("style");
        // styleElem.textContent = `div.text-display {
        //     position: relative;
        //     inset: 25% 0%;
        //     text-align: center;
        //     color: inherit;
        //     text-shadow: inherit;
        //     cursor: pointer;
        // }`;
        // this.localShadow.appendChild(styleElem);

        // const divText = document.createElement("div");
        // divText.classList.add("text-display");
        // this.localShadow.appendChild(divText);

        // const divCursor = document.createElement("div");
        
        this.active = false;
        this.value = "off";
        this.addEventListener("click", eve => {
            this.active = !this.active;
            this.setAttribute("value", this.active ? "on" : "off");
            this.value = this.getAttribute("value");
        });
    }

    connectedCallback() {
        this.setAttribute("value", "off");
        this.setAttribute("show", "true");
        this.render(this.getAttribute("value"));
    }

    disconnectedCallback() {
    }
      
    adoptedCallback() {
    
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "value":
                if(Boolean(this.getAttribute("show"))) {
                    this.render(this.getAttribute("value"));
                }
            case "show":
                let textDisplay = this.localShadow.querySelector("div.text-display");
                if(Boolean(this.getAttribute("show"))) {
                    textDisplay.style.display = "";
                } else {
                    textDisplay.style += "display: none;";
                }
        }
    }

    static get observedAttributes() { return ["value","show"]; }

    get isActive() {
        return this.active;
    }

    render(text) {
        let textDiv = this.localShadow.querySelector("div.text-display");
        textDiv.innerHTML = String(text).replace(/"/g,"");
    }

}

customElements.define("yn-select", YesNoSelect);