(function () {
    // retrieve all products
    var count = document.querySelector("span.search-result-available-count").innerText;
    var x = new XMLHttpRequest;
    x.open("POST","https://www.muscleandstrength.com/store/promos/index/filter",false);
    x.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    x.send("filter=%7B%22order%22%3A%22sort_order+desc%2Csales_ranking+asc%22%2C%22brandfilter%22%3A%5B%5D%2C%22categoryfilter%22%3A%5B%5D%2C%22classfilter%22%3A%5B%5D%2C%22limit%22%3A"+count+"%2C%22offset%22%3A0%7D");
    // replace body content with received data
    document.body.innerHTML = JSON.parse(x.responseText).content;
    // create table for output
    var addCell = function(htmlContent) {
        var cell = row.insertCell(-1);
        cell.innerHTML = htmlContent;
    };
    var table = document.createElement("table");
    document.body.appendChild(table);
    table.style = 'margin:10px;'
    // add table header and body
    var tHead = table.createTHead();
    var row = tHead.insertRow(-1);
    ["#","Product","Price","Rating","Reviews"].forEach(addCell);
    var tBody = document.createElement("tbody");
    table.appendChild(tBody);
    // parse each product
    var products = document.querySelectorAll("div.product-info");
    for (var i = 0; i < products.length; i++) {
        // add row
        row = tBody.insertRow(-1);
        addCell(i+1);
        // parse name
        var m = products[i].querySelector("a.product-name").innerText.trim();
        addCell(m);
        // parse price
        var m = products[i].querySelector("div.price").innerText.trim();
        addCell(m);
        // parse rating
        var m = products[i].querySelector("div.rating").style.width;
        addCell(m);
        // parse reviews
        var m = products[i].querySelector("span.review-count").innerText.replace(/\D/g,"");
        addCell(m);
    }
    // remove unnecessary content
    document.querySelector("div.promo-products").remove();
})();
