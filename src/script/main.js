import "./component/trending-card.js";
import "./component/upcoming-card.js";
import "jquery";

function main(){
    
    const baseURL = `https://api.themoviedb.org/3/movie/`;
    const apiKey = "cda73d16c09783e0351883918402d1d7";

    const getNowPlaying = async () => {
        try {
            const response = await fetch (`${baseURL}now_playing?api_key=${apiKey}`);
            const responseJson = await response.json();
            if (responseJson.error){
                showResponseMsg(responseJson.msg)
            } else {
                renderNowPlaying(responseJson.results)
            }
        } catch {
            showResponseMsg(error)
        }
    }
    getNowPlaying();

    const getPopular = async () => {
        try {
            const response = await fetch(`${baseURL}popular?api_key=${apiKey}&page=1`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMsg(responseJson.msg);
            } else {
                renderAllPopular(responseJson.results);
            }
        } catch {
            showResponseMsg(error);
        }
    };
    getPopular();

    const getTrending = async () => {
        try {
            const response = await fetch(`${baseURL}top_rated?api_key=${apiKey}`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMsg(responseJson.msg);
            } else {
                renderAllTrending(responseJson.results);
            }
        } catch {
            showResponseMsg(error);
        }
    }
    getTrending();

    const getUpcoming = async () => {
        try {
            const response = await fetch(`${baseURL}upcoming?api_key=${apiKey}`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMsg(responseJson.msg);
            } else {
                renderUpcoming(responseJson.results);
            }
        } catch {
            showResponseMsg(error);
        }
    }
    getUpcoming();


    const renderAllMovieSearch = (results) => {
        const searchMovieItem = document.querySelector(".result-search");
        searchMovieItem.innerHTML = `<h3 class="titleSearchValue"> Search Result "${inputValue.value}" <h3>`;
        results.forEach(popular => {
            if(popular.poster_path){
                const template = `
                <div class="card-items">
                <img src="${"https://image.tmdb.org/t/p/w500/" + popular.poster_path}" alt="" class="" >
                <h4 class="judul">${popular.title}</h4>
                <div>
                    <button type="button" class="btn btn-dark btn-detail" data-toggle="modal" data-target="#movieDB" data-id="${popular.id}">
                    Show Detail
                    </button>
                    </div>`;
                searchMovieItem.innerHTML += `${template}`;
            }
        });
        btnFunction();
    }
    
    const renderAllPopular = (results) => {
        const popularItems = document.querySelector(".popular-card");
        popularItems.innerHTML = ``;
        results.forEach(popular => {
                popularItems.innerHTML += `<div class="card-items">
                <img src="${"https://image.tmdb.org/t/p/w500/" + popular.poster_path}" alt="" class="" >
                <h5 class="judul">${popular.title}</h5>
                    <button type="button" class="btn btn-dark btn-detail" data-toggle="modal" data-target="#movieDB" data-id="${popular.id}">
                    Show Detail
                    </button>
                </div>`;
        });
        btnFunction();
    }

    const btnFunction = () => {
        const btnDetail = document.querySelectorAll(".btn-detail");
        const modals = document.querySelector(".modal-body");
        modals.innerHTML = ``;
        btnDetail.forEach(btnAll => {
            btnAll.addEventListener("click", function(){
                const movieId = this.dataset.id;
                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cda73d16c09783e0351883918402d1d7&language=en-US
                `).then(response => response.json()).then(detail => {
                    modals.innerHTML = `<div class="card mb-3">
                                        <img src="${"https://image.tmdb.org/t/p/w500/" + detail.backdrop_path}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title" style="color: black">${detail.title}</h5>
                                        <p class="card-text">${detail.overview}</p>
                                        <p class="card-text"><small class="text-muted">Release date: ${detail.release_date}
                                        <br> Rating: ${detail.vote_average} / 10</small></p>
                                        </div>
                                    </div>` 
                })
            })
        })
    }

    const showResponseMsg = (msg = "Check your Internet") => {
        alert(msg);
    }
    
    //trending movies render
    const renderAllTrending = (results) => {
        const trendingCard = document.querySelector("trending-card");
        trendingCard.trending = results;
        btnFunction();
    }

    //Upcoming movies render
    const renderUpcoming = (results) => {
        const upcomingCard = document.querySelector("upcoming-card");
        upcomingCard.upcomingMovies = results;
        btnFunction();
    }
    
    //now playing movies render
    const renderNowPlaying = (results) => {
        const nowPlaying = document.querySelector("#carouselExampleCaptions");
        results.splice(3, 17); //splice untuk menghapus array dgn parameter (index, jumlah)     
        nowPlaying.innerHTML =  `
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="${"https://image.tmdb.org/t/p/w500/" + results[0].poster_path}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="${"https://image.tmdb.org/t/p/w500/" + results[1].poster_path}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="${"https://image.tmdb.org/t/p/w500/" + results[2].poster_path}" class="d-block w-100" alt="...">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>`;
    }


        const inputValue = document.querySelector("#input");
        const btn = document.querySelector(".button");
        btn.addEventListener("click", function(evt){
            evt.preventDefault();
            const value = inputValue.value;
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`)
                .then(data => data.json())
                .then((data) => {            
                    const movies = data.results;
                    renderAllMovieSearch(movies);
                    })
                .catch(error => error);
        })

    }

export default main;