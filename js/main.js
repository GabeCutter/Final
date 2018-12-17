var prevScrollpos = window.pageYOffset;
var errors = 0;
var reloads = 0;
var jsons = new Map([]);

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
    this.onerror = function() {
        errors++;
    }
    whileLoop: while(errors > 0) {    //this loop isn't working... Goal is to reload the page only 3 times at max when a fetching error is present. Increasing setTimeout time stops the 'errors' variable from incrementing but not from errors being sent to the console. Set at 100 to see errors, 400-500 to be errorless.
        location.reload();
        reloads++;
        alert(reloads +" reloads and " +errors +" errors"); 
        errors = 0;
        this.onerror = function() {
            errors++;
        }
        if(reloads > 3) {
            break whileLoop;
        }
    }
    if(errors > 0) {
        alert(errors +" errors loading the page. Promise not returned within setTimeout time.");
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
        return jsons.get(fetchLink)._embedded.events[eventNumber].images[0].url;
    }
    else {
        fetchData(fetchLink);
        return jsons.get(fetchLink)._embedded.events[eventNumber].images[0].url;
    }
}

function eventCard(id, fetchLink, eventNumber) {
    fetchData(fetchLink);
    setTimeout(function() {
        $('#' +id).append( 
            `
            <div class="card border-dark p-3">
                <img class="card-img-top" src=`+fetchImage(fetchLink, eventNumber)+`></img>
            
                <div class="card-body text-center">

                    <h4 class="card-title mb-2">`+fetchName(fetchLink, eventNumber)+`</h4><br>
                    <p class="card-text">`+fetchDate(fetchLink, eventNumber)+`<br><br>
                    `+fetchVenue(fetchLink, eventNumber)+`
                    </p>
                </div>
            </div>
            `
        );
    }, 400);
}
