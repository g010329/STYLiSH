let ptID = location.search.substring(4,location.search.length);
let cartArray = JSON.parse(localStorage.getItem('cart'));
let calItemTotal=0;


function render(){
    cartArray = JSON.parse(localStorage.getItem('cart'));
    //渲染商品頁
    //從localStorage抓總商品數並顯示在右上角
    totalCount=0;
    if (cartArray==null){
        document.getElementById("cartCount").innerHTML='0';
    }else{
        for(let i=0; i<cartArray.length;i++){
            totalCount+=cartArray[i].count;
        }
        document.getElementById("cartCount").innerHTML=totalCount;
        document.getElementById("webCartTitle").innerHTML=`購物車 (${totalCount})`;
    }

    // console.log(cartArray);
    // console.log('render');
    let listBorder = document.querySelector(".listBorder");
    //重新渲染前先清空畫面
    listBorder.innerHTML="";
    calItemTotal=0;

    //如果localStorage裡沒有東西(第一次瀏覽網站)或cartArray沒有值，顯示購物車裡沒有商品
    let div_listItem = document.createElement("div");
    div_listItem.className = "nonListItem";
    div_listItem.innerHTML = "購物車裡沒有商品";
    listBorder.appendChild(div_listItem);

    if (cartArray.length >0){
        for(let i=0; i<cartArray.length; i++){
            // calItemTotal=0;
            listBorder.innerHTML="";
            let div_listItem = document.createElement("div");
            div_listItem.id = `listItem${i}`;
            div_listItem.className = "listItem";

            let div_listContent = document.createElement("div");
            div_listContent.className = "listContent";
            let div_col5 = document.createElement("div");
            div_col5.className = "col5";
            //將每個刪除鍵給予編號id
            div_col5.innerHTML = `<img id="delete${i}" src="../images/cart-remove.png">`;
            

            let div_col1 = document.createElement("div");
            div_col1.className = "col1";
            let div_col2 = document.createElement("div");
            div_col2.className = "col2";
            let div_col3 = document.createElement("div");
            div_col3.className = "col3";
            let div_col4 = document.createElement("div");
            div_col4.className = "col4";

            let div_row = document.createElement("div");
            div_row.className = "row";

            let div_pic = document.createElement("div");
            div_pic.className = "listPicDiv";
            let img_listPic = document.createElement("img");
            img_listPic.className = "listPic";
            img_listPic.src = `https://api.appworks-school.tw/assets/${cartArray[i].id}/main.jpg`;
            let div_orderInfos = document.createElement("div");
            div_orderInfos.className = "orderInfos";
            div_pic.appendChild(img_listPic);

            let div_itemTitle = document.createElement("div");
            div_itemTitle.innerHTML = `${cartArray[i].title}`;
            let div_orderInfo = document.createElement("div");
            div_orderInfo.className = "orderInfo";
            div_orderInfo.innerHTML = `${cartArray[i].id}`;
            let div_order = document.createElement("div");
            div_order.className = "order";
            let div_order2 = document.createElement("div");
            div_order2.className = "order";

            let span_infoTitle = document.createElement("span");
            span_infoTitle.className = "infoTitle";
            span_infoTitle.innerHTML = "顏色";
            let span_info = document.createElement("span");
            span_info.className = "info";
            span_info.innerHTML = `${cartArray[i].color_name}`;

            let span_infoTitle2 = document.createElement("span");
            span_infoTitle2.className = "infoTitle";
            span_infoTitle2.innerHTML = "尺寸";
            let span_info2 = document.createElement("span");
            span_info2.className = "info";
            span_info2.innerHTML = `${cartArray[i].size}`;

            let div_mobileHidden = document.createElement("div");
            div_mobileHidden.className = "mobileHidden";
            div_mobileHidden.innerHTML = '數量';
            let form_itemNum = document.createElement("form");
            form_itemNum.className = "itemNum";
            let selec_cartCount = document.createElement("select");
            selec_cartCount.className = "selectCountOp";
            // 在select上新增key值，裡面儲存價格，商品數量則用selectedIndex取得
            selec_cartCount.key = {"price":cartArray[i].price};
            
            for(let j=0; j<cartArray[i].stock; j++){
                let countOp = document.createElement("option");
                countOp.innerHTML = j+1;
                
                if (j+1 == cartArray[i].count){
                    countOp.selected="selected";
                }
                selec_cartCount.appendChild(countOp);
            }

            let col3MobileHidden = document.createElement("div");
            col3MobileHidden.className = "mobileHidden";
            col3MobileHidden.innerHTML = '單價'; 
            let div_itemPrice = document.createElement("div");
            div_itemPrice.className = "itemPrice";
            div_itemPrice.innerHTML = `NT.${cartArray[i].price}`;

            let col4MobileHidden = document.createElement("div");
            col4MobileHidden.className = "mobileHidden";
            col4MobileHidden.innerHTML = '小計';
            let div_itemTotal = document.createElement("div");
            //讓不同商品有不同編號id，下方在渲染總價時可以分別選取
            div_itemTotal.id = `itemTotal${i}`;
            div_itemTotal.className = "itemTotal";
            div_itemTotal.innerHTML = `NT.${cartArray[i].price*cartArray[i].count}`;
            
            div_col4.appendChild(col4MobileHidden);
            div_col4.appendChild(div_itemTotal);

            div_col3.appendChild(col3MobileHidden);
            div_col3.appendChild(div_itemPrice);

            form_itemNum.appendChild(selec_cartCount);
            div_col2.appendChild(div_mobileHidden);
            div_col2.appendChild(form_itemNum);

            div_order.appendChild(span_infoTitle);
            div_order.appendChild(span_info);
            div_order2.appendChild(span_infoTitle2);
            div_order2.appendChild(span_info2);

            div_orderInfos.appendChild(div_itemTitle);
            div_orderInfos.appendChild(div_orderInfo);
            div_orderInfos.appendChild(div_order);
            div_orderInfos.appendChild(div_order2);


            div_row.appendChild(div_pic);
            div_row.appendChild(div_orderInfos);
            div_col1.appendChild(div_row);

            div_listContent.appendChild(div_col1);
            div_listContent.appendChild(div_col2);
            div_listContent.appendChild(div_col3);
            div_listContent.appendChild(div_col4);

            div_listItem.appendChild(div_listContent);
            div_listItem.appendChild(div_col5);
            listBorder.appendChild(div_listItem);

            
            calItemTotal += cartArray[i].price*cartArray[i].count;
            // console.log(calItemTotal);
            document.getElementById("calItemTotal").innerHTML = calItemTotal;
            document.getElementById("payTotal").innerHTML = calItemTotal+parseInt(document.getElementById("payment").innerHTML);
            
        }

    }
    //清空最後一個品項時不會進入迴圈，此時套用初始值0
    if (calItemTotal == 0){
        document.getElementById("calItemTotal").innerHTML = 0;
        document.getElementById("payTotal").innerHTML = 0;
    }else{
        document.getElementById("calItemTotal").innerHTML = calItemTotal;
        document.getElementById("payTotal").innerHTML = calItemTotal+parseInt(document.getElementById("payment").innerHTML);
    }
    
    
    // 更改數量計算總價-------------------------------------------------------------------
    // console.log(e.target.options);
    // 一開始從DOM選取所有符合class是selectCountOp的select元素，往下找options會是一個HtmlCollection
    // 取得select上儲存價格的key值，商品數量則用selectedIndex取得
    // select要用change不能用click
    // 價格:e.target.key.price
    // 商品數量:e.target.options.selectedIndex+1
    // addEventListener要放在渲染函式裡，若放在外層，點擊重新渲染後的元素沒有監聽，功能會壞掉
    let selec_cartCount = document.querySelectorAll('.selectCountOp');
    for (let i=0; i<selec_cartCount.length; i++){
        selec_cartCount[i].addEventListener("change",function(e){
            // let price = e.target.key.price;
            let count = e.target.options.selectedIndex+1;
            cartArray[i].count = count;
            
            localStorage.setItem('cart',JSON.stringify(cartArray));
            // console.log(price);
            // console.log(cartArray[i].count);
            //因為邏輯無法更改訂單總價格，改用直接render
            // document.getElementById(`itemTotal${i}`).innerHTML = `NT.${price*cartArray[i].count}`;
            render();
            // document.getElementById("calItemTotal").innerHTML = '123';
        })
    }
    // 刪除該筆項目-------------------------------------------------------------------
    let delete_items = document.querySelectorAll('.col5>img');
    for (let i=0; i<delete_items.length; i++){
        delete_items[i].addEventListener("click",function(){
            cartArray = JSON.parse(localStorage.getItem('cart'));
            // console.log(i);
            // console.log(cartArray[i]);
            let deleteThisitem = cartArray.splice(i,1);
            // console.log(deleteThisitem);
            // console.log(cartArray);
            localStorage.setItem('cart',JSON.stringify(cartArray));
            render();  
            // console.log('click delete');
            alert("刪除商品"); 
        })
    }
}
render();
// console.log('first render');

