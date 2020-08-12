//渲染首頁

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            
            //從localStorage抓總商品數並顯示在右上角
            cartArray = JSON.parse(localStorage.getItem('cart'));
            // console.log(cartArray);
            totalCount=0;
            if (cartArray==null){
                document.getElementById("cartCount").innerHTML='0';
                document.getElementById("mobileCartCount").innerHTML='0';
            }else{
                 for(let i=0; i<cartArray.length;i++){
                    totalCount+=cartArray[i].count;
                }
                document.getElementById("cartCount").innerHTML=totalCount;
                document.getElementById("mobileCartCount").innerHTML=totalCount;
            }

            var datas = JSON.parse(xhr.responseText); 
            type = 'all';
            var productHTML = '';
            for (let i=0; i<datas.data.length; i++) {
                productHTML += `<a class="product" href="product.html?id=${datas.data[i].id}">`;
                productHTML += `<img src="${datas.data[i].main_image}">`;
                productHTML += '<div class="colors">';
                for (let j=0; j<datas.data[i].colors.length; j++){
                    productHTML += `<div class="color" style="background-color: #${datas.data[i].colors[j].code};"></div>`;
                }
                productHTML += '</div>';
                productHTML += `<div class="name">${datas.data[i].title}</div>`;
                productHTML += `<div class="price">TWD.${datas.data[i].price}</div>`;
                productHTML += '</a>';
            }
            document.getElementById('products').innerHTML = productHTML;

            
        } else if (xhr.status === 404) {
        }
    }
};
xhr.open('GET', 'https://api.appworks-school.tw/api/1.0/products/all');
function sendAll() {
    xhr.send();
}

// xhr.send();
let totalCount=0;
//傳入參數渲染不同分類
function sendAJAX(typeIn) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var datas = JSON.parse(xhr.responseText); 
                nextPage = datas.next_paging;
                type = typeIn;
                var productHTML = '';
                document.getElementById('products').innerHTML = productHTML;
                for (let i=0; i<datas.data.length; i++) {
                    productHTML += `<a class="product" href="product.html?id=${datas.data[i].id}">`;
                    productHTML += `<img src="${datas.data[i].main_image}">`;
                    productHTML += '<div class="colors">';
                    for (let j=0; j<datas.data[i].colors.length; j++){
                        productHTML += `<div class="color" style="background-color: #${datas.data[i].colors[j].code};"></div>`;
                    }
                    productHTML += '</div>';
                    productHTML += `<div class="name">${datas.data[i].title}</div>`;
                    productHTML += `<div class="price">TWD.${datas.data[i].price}</div>`;
                    productHTML += '</a>';

                    //從localStorage抓總商品數並顯示在右上角
                    cartArray = JSON.parse(localStorage.getItem('cart'));
                    // console.log(cartArray);
                    totalCount=0;
                    if (cartArray==null){
                        document.getElementById("cartCount").innerHTML='0';
                        document.getElementById("mobileCartCount").innerHTML='0';
                    }else{
                         for(let i=0; i<cartArray.length;i++){
                            totalCount+=cartArray[i].count;
                        }
                        document.getElementById("cartCount").innerHTML=totalCount;
                        document.getElementById("mobileCartCount").innerHTML=totalCount;
                    }
                }
                document.getElementById('products').innerHTML = productHTML;
            } else if (xhr.status === 404) {
            }
        }
    };
    xhr.open('GET', `https://api.appworks-school.tw/api/1.0/products/${typeIn}`);
    xhr.send();
}


//處理在商品頁時，點擊上方nav連結，會回到首頁，再從網址抓queryString，渲染女/男/配件分類
//這部分要寫在此檔案，因為是在處理首頁的layout(不能寫在productDetail.js)
let ptCategory = location.search.substring(6,location.search.length);

//設置在首頁頁面時,根據網址後方queryString渲染不同畫面
if (location.search === '' | ptCategory === 'all' ) {
    sendAll();
} else if (ptCategory === 'women') {
    sendAJAX('women');
} else if (ptCategory === 'men') {
    sendAJAX('men');
} else if (ptCategory === 'accessories') {
    sendAJAX('accessories');
} else {
}
