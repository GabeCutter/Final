Gabe Cutter
2018 Code Apprentice Final Project
12/3/18 --> --/--/--

API LINKS*******

https://developer-acct.ticketmaster.com/user/12380/apps
https://developer.ticketmaster.com/products-and-docs/apis/getting-started/
https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2

*******


BUGS*******

Problems with product pages when fetching. Check main.js

*******


SPARE CODE FOR EMERGENCY*******

//fetchData('https://app.ticketmaster.com/discovery/v2/events.json?size=2&keyword=hootie&sort=date,asc&apikey=hGAKCnOnFTxtq810ogkSO1aYRXuP2ROk', '1', 'name').then(data => console.log(data));

/*
fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=2&keyword=hootie&sort=date,asc&apikey=hGAKCnOnFTxtq810ogkSO1aYRXuP2ROk')
.then(function(res) {
    return res.json();
})
.then(function(data) {
    var output = '<h2>Name: </h2>'
    data._embedded.events.forEach(function(events) {
        //console.log(events.name);
        output += events.dates.start.localDate +" ";
    });
    document.getElementById('name').innerHTML = output;
});
*/

//`
        //<div class="card">
        //    <img class="card-img-top" src=`+fetchData(fetchLink, eventNumber, 'images[5].url') +`></img>
        `
            <div class="card-body>
                <h4 class="card-title">`+fetchData(fetchLink, eventNumber, 'name')+`</h4>`+
        //        <p class="card-text">`+fetchData(fetchLink, eventNumber, 'dates.start.localDate')+`<br>
        //        `+fetchData(fetchLink, eventNumber, '_embedded.venues[0].name')+`
        //        </p>
        
            `</div>`
        //</div>

*******