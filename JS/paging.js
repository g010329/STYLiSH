let type='';
let firstRender=false;
var nextPage;
function loadMore(pageIndex,type){
    var paging = new XMLHttpRequest();
    paging.onreadystatechange = function () {
        if (paging.readyState === 4) {
            if (paging.status === 200) {
                
                var datas = JSON.parse(paging.responseText); 
                nextPage = datas.next_paging;
                // console.log(nextPage);
                // console.log(type);
                
                for (let i=0; i<datas.data.length; i++) {
                    var newA = document.createElement("a");
                    newA.className = 'product';
                    newA.href = `product.html?id=${datas.data[i].id}`;
                    var newImg = document.createElement("img");
                    newImg.src=`${datas.data[i].main_image}`;

                    //顏色
                    var colorsDiv = document.createElement("div");
                    colorsDiv.className = 'colors';
                    
                    for (let j=0; j<datas.data[i].colors.length; j++){
                        // console.log(datas.data[i].colors[j].code);
                        var color = document.createElement("div");
                        color.className = 'color';
                        color.style = `background-color:#${datas.data[i].colors[j].code}`;
                        colorsDiv.appendChild(color);
                    }
                    
                    //產品名
                    var nameDiv = document.createElement("div");
                    nameDiv.className = 'name';
                    var nameContent = document.createTextNode(`${datas.data[i].title}`);
                    nameDiv.appendChild(nameContent);
                    //價格
                    var priceDiv = document.createElement("div");
                    priceDiv.className = 'price';
                    var priceContent = document.createTextNode(`TWD.${datas.data[i].price}`);
                    priceDiv.appendChild(priceContent);
                    //將各標籤放入a標籤中
                    newA.appendChild(newImg);
                    newA.appendChild(colorsDiv);
                    newA.appendChild(nameDiv);
                    newA.appendChild(priceDiv);
                    document.getElementById("products").appendChild(newA);
                    
                    firstRender = false;
                    // console.log(i);
                }
            } else if (paging.status === 404) {
            }
        }
    };
    paging.open('GET', `https://api.appworks-school.tw/api/1.0/products/${type}?paging=${pageIndex}`);
    paging.send();
    firstRender = true;
}



var paging = new XMLHttpRequest();
paging.onreadystatechange = function () {
    if (paging.readyState === 4) {
        if (paging.status === 200) {
            var datas = JSON.parse(paging.responseText);
            nextPage = datas.next_paging;

        } else if (paging.status === 404){
        }
    }
};
paging.open('GET','https://api.appworks-school.tw/api/1.0/products/all');
paging.send();

// console.log(nextPage);
//nextPage一開始會抓不到值(極短瞬間)，因為ajax為非同步運作，當程式運行到此時ajax值還沒傳回來

    window.addEventListener('scroll',()=>{
        const body = document.querySelector('body');
        const scrollable = body.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        // console.log(scrolled);
        // Load next page AJAX
        //設置&&nextPage 當作停止點，不然傳undefined值進去時會被當作第一頁
        if (firstRender == false && nextPage){
            if (scrolled >= scrollable ){
                
                //console.log('滑到底部');
                loadMore(nextPage,type);
                // console.log(nextPage);
                
            }
        }
    });


