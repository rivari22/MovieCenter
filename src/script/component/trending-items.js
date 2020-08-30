class trendingItems extends HTMLElement {
    
    constructor(){
        super();
    }

    set trendings(trendings) {
        this._trendings = trendings;
        this.render();
    }

    render(){
        this.innerHTML = `<div class="card-items trending">
        <img src="${"https://image.tmdb.org/t/p/w500/" + this._trendings.poster_path}" alt="" class="" >
        <h5 class="judul">${this._trendings.title}</h5>
        <div>
        <button type="button" class="btn btn-dark btn-detail" data-toggle="modal" data-target="#movieDB" data-id="${this._trendings.id}">
        Show Detail
        </button>
        </div>
        `;
    }
}

customElements.define("trending-items", trendingItems);