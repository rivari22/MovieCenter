import "./trending-items.js";

class trendingCard extends HTMLElement {
    constructor(){
        super();
        this.setAttribute("class","movies-card");
    }

    set trending(trending){
        this._trending = trending;
        this.render();
    }

    render() {
            this.innerHTML = ``;
            this._trending.forEach(results => {
                const trendingItems = document.createElement("trending-items");
                trendingItems.trendings = results;
                this.appendChild(trendingItems);
            })      
    }
}

customElements.define("trending-card", trendingCard);