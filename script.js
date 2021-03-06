//"matches":["<all_urls>"],

function getArticles() {
  let jsonArray = [];
  let articles = document.querySelectorAll('article');
  
  articles.forEach(function (article, index) {
    let price = article.querySelector('.cijena').innerText;
    let shipping = article.querySelector('.dostava-info').innerText;
    let title = article.querySelector('.innerbox a h5').innerText;
    let link = article.querySelector('.innerbox a').href;
    link += "/64"; // 64 je defaultni kanal (affiliate kod)
    let image = article.querySelector('.img-wrapper').style.getPropertyValue("background-image");
    image = image.replace("url(", '');
    image = image.replace(") no-repeat", '');
    image = image.replace(")", '');
    image = image.replace(/["']/g, "");
    let quantity = article.querySelector('.tag_kolicina');
    let oldPrice = article.querySelector('.cijena-stara');
    var obj = {
      "title": title,
      "price": price,
      "shippingPrice": shipping,
      "image": image,
      "link": link,
      "quantity": quantity != null? quantity.innerText : 'Na stanju',
      "oldPrice": oldPrice != null? oldPrice.innerText: null
    }
    jsonArray.push({obj});
    addArticles(obj);

  })
  document.querySelector('.filteri').innerHTML = `<h2>USPJESNO STE IZBRISALI STARE I DODALI NOVE ARTIKLE - EKSTENZIJA NAPRAVLJENA 24.11.2021.</h2><textarea readonly rows="15" cols="180" id="jsonData">${JSON.stringify(jsonArray)}</textarea>`;
}

document.querySelector('.filteri').innerHTML = "<h1 id='getJsonData' style='background: #00aeef;color: white;cursor:pointer;border-radius: 5px;text-align: center;padding: 8px;'>IZBRIŠI STARE I DODAJ NOVE ARTIKLE - KENAN MASLEŠA</h1>";
let getJsonDataButton = document.querySelector('#getJsonData');
getJsonDataButton.addEventListener('click', function () {
  deleteArticles();
})

function addArticles(data){
  fetch("https://ekupovina-803dd-default-rtdb.europe-west1.firebasedatabase.app/articles.json", {
    method: "POST", 
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });
}

function deleteArticles(){
  fetch("https://ekupovina-803dd-default-rtdb.europe-west1.firebasedatabase.app/articles.json", {
    method: "DELETE", 
  }).then(res => {
    console.log("Request complete! response:", res);
    getArticles();
  });
}