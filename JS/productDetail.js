// 抓取當前網址
let ptID = location.search.substring(4,location.search.length);
// console.log(location.href);

let details;
let currentColorName;

let currentColor;
let lastColor='';

let currentSize;
let lastSize='';

let quanty=0;

// cart
let submitCount;
let totalCount=0;
let cartArray = [];
document.getElementById("displayBeforeAJAX").className="displayBeforeAJAX";

let xhrD = new XMLHttpRequest();
xhrD.onreadystatechange = function () {
    if (xhrD.readyState === 4) {
        if (xhrD.status === 200) {
            details = JSON.parse(xhrD.responseText);
            // console.log(details.data);
            //渲染商品頁
            
            //從localStorage抓總商品數並顯示在右上角
            cartArray = JSON.parse(localStorage.getItem('cart'));
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

            document.getElementById('main_image').innerHTML = `<img src="${details.data.main_image}" alt="">`;
            document.getElementById('ptTitle').innerHTML = `${details.data.title}`;  
            document.getElementById('pId').innerHTML = `${details.data.id}`;  
            document.getElementById('ptPrice').innerHTML = `TWD.${details.data.price}`;
            for (let i=0; i<details.data.colors.length; i++){
                let dColor = document.createElement("div");
                dColor.className = 'product_color';
                dColor.id = `color_${i}`;
                dColor.style = `background-color:#${details.data.colors[i].code}`;
                document.getElementById("pColors").appendChild(dColor);
            }
            for (let i=0; i<details.data.sizes.length; i++){
                let dSize = document.createElement("div");
                dSize.className = 'product_size';
                dSize.id =`size_${i}`;
                // console.log(details.data.sizes[i]);
                dSize.innerHTML = `${details.data.sizes[i]}`;
                document.getElementById("pSizes").appendChild(dSize);
            }
            document.getElementById('note').innerHTML = `*${details.data.note}`;
            document.getElementById('texture').innerHTML = `${details.data.texture}`; 
            document.getElementById('description').innerHTML = `${details.data.description.replace(/\r\n/g,"<br/>")}`;
            document.getElementById('place1').innerHTML = `素材產地/${details.data.place}`;
            document.getElementById('place2').innerHTML = `加工產地/${details.data.place}`;

            for (let i=0; i<details.data.images.length; i++){
                let dstory = document.createElement("div");
                dstory.innerHTML = `${details.data.story}`;
                dstory.className = "dstory";
                let dimages = document.createElement("img");
                dimages.className = "detailPic";
                dimages.src = `${details.data.images[i]}`;
                document.getElementById("storyAndPic").appendChild(dstory);
                document.getElementById("storyAndPic").appendChild(dimages);
            }
            //渲染後把displayBeforeAJAX的畫面用class清掉
            document.getElementById("displayBeforeAJAX").classList.remove("displayBeforeAJAX");
            
            // -------顏色選項------------------
            for (let i=0; i<details.data.colors.length; i++){
                let btn = document.getElementById(`color_${i}`);
                // console.log(`btn取值:${btn.id.substring(6,btn.id.length)}`);

                btn.addEventListener("click",function(){
                    //設置每次點擊後都將畫面產品數歸零
                    document.getElementById('count').innerHTML =0;
                    lastColor.className = ' product_color';
                    currentColor = details.data.colors[i].code;
                    currentColorName = details.data.colors[i].name;
                    //api抓取所選取的顏色
                    btn.className += ' outLine';
                    lastColor = btn;

                    if (currentColor ==='undefind' || currentSize ==='undefind'){
                        // console.log('not select yet');
                
                    }else{
                        searchQuanty(currentColor,currentSize);
                        // console.log(quanty);
                    }
                })
                lastColor.className = ' product_color';
            }
            // --------尺寸選項---------------------
            for (let i=0; i<details.data.sizes.length; i++){
                let btn = document.getElementById(`size_${i}`);

                btn.addEventListener("click",function(){
                    //設置每次點擊後都將畫面產品數歸零
                    document.getElementById('count').innerHTML =0;
                    lastSize.className = ' product_size';
                    //較複雜做法
                    // currentSize = i;
                    //api抓取所選取的尺寸
                    // console.log(details.data.sizes[currentSize]);
                    
                    // 縮寫做法
                    currentSize = details.data.sizes[i];
                    // console.log(currentSize);

                    btn.className += ' productSizeClick';
                    lastSize = btn;

                    if (currentColor ==='undefind' || currentSize ==='undefind'){
                        // console.log('not select yet');
                    }else{
                        searchQuanty(currentColor,currentSize);
                        // console.log(quanty);
                    }
                })
                lastSize.className = ' product_size';
            }
            
            //利用所選取顏色尺寸，在api variants陣列中搜尋位置以取得商品庫存
            function searchQuanty(searchColor,searchSize){
                for (let i=0; i<details.data.variants.length; i++){
                    if(searchColor === details.data.variants[i].color_code && searchSize === details.data.variants[i].size){
                        return quanty = details.data.variants[i].stock;  
                    }
                }
            }

            // Shopping Cart/ Local Storage
            // 建立一個array來存放每次加入的object 
            cartBtn = document.getElementById("cartBtn");
            
            cartBtn.addEventListener("click",function(){
                cartArray = JSON.parse(localStorage.getItem('cart'));
                //
                if (cartArray == null){
                    cartArray =[];
                }
                console.log(cartArray);
                submitCount = parseInt(document.getElementById("count").innerHTML);
                let cartObj = {"title":details.data.title,"id":details.data.id,"color":currentColor,"color_name":currentColorName,"size":currentSize,"price":details.data.price,"count":submitCount,"stock":quanty};
                
                for (let i =0; i<cartArray.length; i++){
                    if (cartObj.color === cartArray[i].color && cartObj.size === cartArray[i].size){

                        // console.log('111');
                        cartArray[i].count = submitCount;
                        totalCount = 0;
                        for(let i=0;i<cartArray.length;i++){
                            
                            totalCount+=cartArray[i].count;
                        }
                        document.getElementById("cartCount").innerHTML = totalCount;
                        document.getElementById("mobileCartCount").innerHTML=totalCount;
                        localStorage.setItem('cart',JSON.stringify(cartArray));
                        return (cartArray);
                    }
                }
                cartArray.push(cartObj);
                totalCount = 0;
                for (let i=0; i<cartArray.length; i++){
                    // console.log(cartArray[i].count);
                    totalCount+=cartArray[i].count;
                    // console.log(`164totalCount: ${totalCount}`);
                }
                document.getElementById("cartCount").innerHTML = totalCount;
                document.getElementById("mobileCartCount").innerHTML = totalCount;

                localStorage.setItem('cart',JSON.stringify(cartArray));
                
            })
            


        } else if (xhrD.status === 404){
        }
    }
};
xhrD.open('GET',`https://api.appworks-school.tw/api/1.0/products/details?id=${ptID}`);
xhrD.send();

// 注意程式時間上的順序，因為AJAX非同步
// 要確保動作在AJAX取得資料後才執行的話，可將不同功能的寫成不同function，再到JAX裡呼叫

// 商品顏色尺寸數量＿點擊事件函式
// 需宣告為全域變數: AJAX所得資料、現在所選取的顏色尺寸數量(current_color)
// (並對current_color用addEventListener，在click時可以assign新值)---------------

let num = document.getElementById("count");
function decrement(){
    if(quanty!=0){
        
        if (num.innerHTML == 0){
            num.innerHTML = 0;
        } else {
            num.innerHTML = parseInt(num.innerHTML)-1;
        } 
    }else{
        num.innerHTML=0;
    } 
}
function increment(){
    if(quanty!=0){
        if (num.innerHTML == quanty){
            num.innerHTML = quanty;
        } else{
            num.innerHTML = parseInt(num.innerHTML)+1;
        }
    }else{
        num.innerHTML=0;
    } 
}

