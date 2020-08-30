class upcomingItems extends HTMLElement {


    set upcomingMovie(upcomingMovie){
        this._upcomingMovie = upcomingMovie;
        this.render()
    }

    render(){
        if(this._upcomingMovie.poster_path)
        return this.innerHTML = `<div class="card-items">
        <img src="${"https://image.tmdb.org/t/p/w500/" + this._upcomingMovie.poster_path}" alt="" class="" >
        <h5 class="judul">${this._upcomingMovie.title}</h5>
        <div>
        <button type="button" class="btn btn-dark btn-detail" data-toggle="modal" data-target="#movieDB" data-id="${this._upcomingMovie.id}">
        Show Detail
        </button>
        </div>
        `
    }
}

customElements.define("upcoming-items", upcomingItems);