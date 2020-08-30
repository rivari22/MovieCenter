import "./upcoming-items.js";

class upcomingCard extends HTMLElement {

    connectedCallback(){
        this.setAttribute("class","movies-card");
    }

    set upcomingMovies(upcomingMovies) {
        this._upcomingMovies = upcomingMovies;
        this.render();
    }

    render(){
        this._upcomingMovies.forEach(results => {
            const upcomingItems = document.createElement("upcoming-items");
            upcomingItems.upcomingMovie = results;
            this.appendChild(upcomingItems);
        })
    }
}

customElements.define("upcoming-card", upcomingCard);