function sendSearchResult() {
    var ptSearch = new XMLHttpRequest();
    ptSearch.onreadystatechange = function () {
        if (ptSearch.readyState === 4) {
            if (ptSearch.status === 200) {
                var datas = JSON.parse(ptSearch.responseText);
                
                nextPage='';
                
                var productHTML = '';
                for (let i=0; i<datas.data.length; i++) {
                    productHTML += '<a class="product" href="">';
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
            } else if (ptSearch.status === 404){
            }
        }
    };
    //一開始html裡web,mobile搜尋的input id相同，所以當document.getElementById時，會只抓到手機的input value。
    //當改成getElementsByTagName時，因為總共有兩個input值，會undefined抓不到值
    //最後改成在html檔案裡，將web,mobile的搜尋input改為不同id，並且設定當視窗寬度window.innerWidth>切點時，抓取網頁版的value
    if(window.innerWidth>1024){
        ptSearch.open('GET',`https://api.appworks-school.tw/api/1.0/products/search?keyword=${document.getElementById("searchPt").value}`);
    }else{
        ptSearch.open('GET',`https://api.appworks-school.tw/api/1.0/products/search?keyword=${document.getElementById("searchPt2").value}`);
    }
    
    ptSearch.send();
}


