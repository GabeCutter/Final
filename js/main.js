var prevScrollpos = window.pageYOffset;
var reloads = 0;
var errorHandling = true;
var jsons = new Map([]);

window.onerror = function() {
    if(errorHandling === true) {
        setTimeout(function() {
            if(reloads < 4) {
                location.reload();
                reloads++;
            }
            else {
                console.log("More than 4 reloads required to load page correctly. Promise not returned within setTimeout time. TicketMaster website issue.");
            }
            console.log(reloads +" reloads. TicketMaster website issue.");
        }, 300);
    }
}

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } 
    else {
        document.getElementById("navbar").style.top = "-100%";
    }
    prevScrollpos = currentScrollPos;
}

function loadPage() {
    setTimeout(function() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 650);
}

function genNavBar(id) {
    $('#' +id).append(
        `
        <nav class="navbar navbar-expand-md navbar-dark" id="navbar">
            <a class="navbar-brand nav-link" href="../html/home.html">SC Ticketmaster</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../html/product-page1.html">Events Near Me</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../html/single-product-page1.html">Local Feature</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../html/single-product-page2.html">Regional Feature</a>
                    </li>
                </ul>
            </div>
        </nav>
        `
    );
}

function fetchData(fetchLink) {
    if(!jsons.has(fetchLink)) {
        fetch(fetchLink)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            jsons.set(fetchLink, data);
        })
    }
}

function fetchName(fetchLink, eventNumber) {
    if(jsons.has(fetchLink)) {
        return jsons.get(fetchLink)._embedded.events[eventNumber].name;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber].name;
    }
}

function fetchDate(fetchLink, eventNumber) {
    if(jsons.has(fetchLink)) {
        return jsons.get(fetchLink)._embedded.events[eventNumber].dates.start.localDate;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber].dates.start.localDate;
    }
}

function fetchVenue(fetchLink, eventNumber) {
    if(jsons.has(fetchLink)) {
        return jsons.get(fetchLink)._embedded.events[eventNumber]._embedded.venues[0].name;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber]._embedded.venues[0].name;
    }
}

function fetchImage(fetchLink, eventNumber) {
    if(jsons.has(fetchLink)) {
        return jsons.get(fetchLink)._embedded.events[eventNumber].images[2].url;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber].images[2].url;
    }
}

function fetchAttractionName(fetchLink, eventNumber, attractionNumber) {
    if(jsons.has(fetchLink)) {
        return jsons.get(fetchLink)._embedded.events[eventNumber]._embedded.attractions[attractionNumber].name;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber]._embedded.attractions[attractionNumber].name;
    }
}

function fetchAttractionImage(fetchLink, eventNumber, attractionNumber) {
    if(jsons.has(fetchLink)) {
        return jsons.get(fetchLink)._embedded.events[eventNumber]._embedded.attractions[attractionNumber].images[1].url;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber]._embedded.attractions[attractionNumber].images[1].url;
    }
}

function eventCard(id, fetchLink, eventNumber) {
    setTimeout(function() {
        $('#' +id).append( 
            `
            <div class="card border-dark p-3">
                <img class="card-img-top rounded" src=`+fetchImage(fetchLink, eventNumber)+`></img>
            
                <div class="card-body text-center">

                    <h4 class="card-title mb-2">`+fetchName(fetchLink, eventNumber)+`</h4><br>
                    <p class="card-text">`+fetchDate(fetchLink, eventNumber)+`<br><br>
                    `+fetchVenue(fetchLink, eventNumber)+`</p>
                </div>
            </div>
            `
        );
    }, 300);
}

function simpleEventMedia(id, fetchLink, eventNumber) {
    setTimeout(function() {
        $('#' +id).append( 
            `
            <div class="media bg-light p-3 mt-3 rounded">
                <img class="ml-3 mr-5 img-thumbnail rounded-circle" style="width: 10%;" src=`+fetchImage(fetchLink, eventNumber)+`></img>
                <div class="media-body">
                    <p class="card-text">`+fetchVenue(fetchLink, eventNumber)+`<br><br>
                    `+fetchDate(fetchLink, eventNumber)+`</p>
                </div>
            </div>
            `
        );
    }, 300);
}

function createImage(id, fetchLink, eventNumber) {
    setTimeout(function() {
        $('#' +id).append(
            `<img class="rounded img-fluid" src=`+fetchImage(fetchLink, eventNumber)+`></img>`
        )
    }, 300);
}

function createAttractionImage(id, fetchLink, eventNumber, attractionNumber) {
    setTimeout(function() {
        $('#' +id).append(
            `<img class="rounded img-fluid" src=`+fetchAttractionImage(fetchLink, eventNumber, attractionNumber)+`></img>`
        )
    }, 300);
}

function firstCarouselItem(id, fetchLink, eventNumber) {
    setTimeout(function() {
        $('#' +id).append( 
            `
            <div class="carousel-item active">
                <img class="img-fluid mx-auto d-block rounded" src=`+fetchImage(fetchLink, eventNumber)+`></img>
                <div class="carousel-caption">
                    <h3 class="card-title mb-2">`+fetchName(fetchLink, eventNumber)+`</h3>
                    <p>`+fetchVenue(fetchLink, eventNumber)+`</p>
                    <p>`+fetchDate(fetchLink, eventNumber)+`</p>
                </div>
            </div>
            `
        );
    }, 300);
}

function carouselItem(id, fetchLink, eventNumber) {
    setTimeout(function() {
        $('#' +id).append( 
            `
            <div class="carousel-item">
                <img class="img-fluid mx-auto d-block rounded" src=`+fetchImage(fetchLink, eventNumber)+`></img>
                <div class="carousel-caption">
                    <h3 class="card-title mb-2">`+fetchName(fetchLink, eventNumber)+`</h3>
                    <p>`+fetchVenue(fetchLink, eventNumber)+`</p>
                    <p>`+fetchDate(fetchLink, eventNumber)+`</p>
                </div>
            </div>
            `
        );
    }, 300);
}