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
    jsonArray.push({
      "title": title,
      "price": price,
      "shippingPrice": shipping,
      "image": image,
      "link": link,
      "quantity": quantity != null? quantity.innerText : 'Na stanju',
      "oldPrice": oldPrice != null? oldPrice.innerText: null
    });
  })
  document.querySelector('.filteri').innerHTML = `<h1>JSON DATA - EKSTENZIJA NAPRAVLJENA 24.11.2021.</h1><textarea readonly rows="15" cols="180" id="jsonData">${JSON.stringify(jsonArray)}</textarea>`;
  
  deleteArticles();
  setTimeout(function(){
    addArticles(jsonArray);
  }, 1000)
}

document.querySelector('.filteri').innerHTML = "<h1 id='getJsonData' style='background: #00aeef;color: white;cursor:pointer;border-radius: 5px;text-align: center;padding: 8px;'>GET JSON DATA - KENAN MASLEŠA</h1>";
let getJsonDataButton = document.querySelector('#getJsonData');
getJsonDataButton.addEventListener('click', function () {
  getArticles();
})

function addArticles(data){
  fetch("https://ekupovina-803dd-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "POST", 
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });
}

function deleteArticles(){
  fetch("https://ekupovina-803dd-default-rtdb.europe-west1.firebasedatabase.app/.json", {
    method: "DELETE", 
  }).then(res => {
    console.log("Request complete! response:", res);
  });
}