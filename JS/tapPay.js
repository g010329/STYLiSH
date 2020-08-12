// Facebook Login
let token;
let checkoutApiToken;
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    // console.log('statusChangeCallback');
    // console.log(response);                   // The current login status of the person.
    // console.log(response.authResponse.accessToken);  
    //POST token:檢查如果是登入狀態，accessToken就會有值，將token POST給checkout API，在結帳時檢查是否有登入會員
    
    if (response.status === 'connected') {
        token = response.authResponse.accessToken;
        signInAPI(token);

        FB.api('/me',"GET",{ "fields": 'name,picture,id,email' },function(response) {
            // console.log(response);   
        });
        // Logged into your webpage and Facebook.
    } else {
        // The person is not logged into your webpage or we are unable to tell. 
    }
}
function signInAPI(res){
    let signInData = {
        "provider":"facebook",
        "access_token": res
    };
    let jsonSignInData = JSON.stringify(signInData);
    let signInRequestURL = 'https://api.appworks-school.tw/api/1.0/user/signin';
    let signInRequest = new XMLHttpRequest();
    signInRequest.open("POST", signInRequestURL);
    signInRequest.setRequestHeader("Content-Type", "application/json");
    signInRequest.send(jsonSignInData);
    signInRequest.onload = () => {
        if (signInRequest.readyState == 4) {
            //取得checkout api response的token
            checkoutApiToken = JSON.parse(signInRequest.response).data.access_token;
            
        }
    }     
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
    appId      : '592261011699303',
    cookie     : true,
    xfbml      : true,
    version    : 'v7.0'
    });
    
    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
    });   
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login() {
    FB.login(function(response) {
        statusChangeCallback(response);
        window.location.href=`../html/profilePage.html`;
    }, {scope: 'public_profile,email'});
    //name,picture,id包含在public_profile裡面
    //scope要和FB.login放在一起，在登入時直接要求給予email權限
}
function logout() {
    FB.logout(function(response) {
    // Person is now logged out
        
    });
}
// End of Facebook Login
    


let name;
let phone;
let address;
let time = 'anytime';
let list=[];
let number;

function getTime(value){
    time = value;
    // console.log(time);
}
function processFormData() {
    name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    address = document.getElementById("address").value;
}

TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');

TPDirect.card.setup({
    fields: {
        number: {
            // css selector
            element: '#card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: '#card-ccv',
            placeholder: '後三碼'
        }
    },
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.cvc': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
})

function onSubmit(event) {
    event.preventDefault()

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('輸入資料有誤')
        return
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            alert('輸入資料有誤')
            return
        }
        alert('訂購成功')
        
        //新增結帳後loading效果
        document.getElementById("loading").className = "loading";

        for(let i=0; i<cartArray.length; i++){
            let itemObj = {};
            let id = cartArray[i].id;
            let itemName = cartArray[i].title;
            let itemPrice = cartArray[i].price;
            let colorCode = cartArray[i].color;
            let colorName = cartArray[i].color_name;
            let size = cartArray[i].size;
            let qty = cartArray[i].count;
            itemObj = {
                "id": `${id}`,
                "name": itemName,
                "price": itemPrice,
                "color": {
                    "code": colorCode,
                    "name": colorName
                },
                "size": size,
                "qty":qty
            };
            // console.log(itemObj);
            list.push(itemObj);
        };
        // console.log(list);

        let data = {
            "prime":result.card.prime,
            "order": {
                "shipping": "delivery",
                "payment": "credit_card",
                "subtotal": parseInt(document.getElementById("calItemTotal").innerHTML),
                "freight": parseInt(document.getElementById("payment").innerHTML),
                "total": parseInt(document.getElementById("payTotal").innerHTML),
                "recipient": {
                    "name": name,
                    "phone": phone,
                    "email": "luke@gmail.com",
                    "address": address,
                    "time": time
                },
                "list": list
            }   
        };
        // console.log(cartArray);
        //POST JSON ------------------------------
        let jsonData = JSON.stringify(data);
        // console.log(jsonData);
        function postJSON(callback){
            let requestURL = 'https://api.appworks-school.tw/api/1.0/order/checkout';
            let request = new XMLHttpRequest();
            request.open("POST", requestURL);
            request.setRequestHeader("Content-Type", "application/json");
            if (checkoutApiToken != null){
                request.setRequestHeader("Authorization", `Bearer ${checkoutApiToken}`);
            }
            request.send(jsonData);
            // 使用callback 和 readyState==4 確保取得伺服器的number資料已經跑完
            // 使用 XMLHttpRequest 中的 onload：當資料全部跑完時才會觸發該事件!!
            request.onload = () => {
                if (request.readyState == 4) {
                    console.log(JSON.parse(request.response));
                    number = JSON.parse(request.response).data.number;
                    callback(number);
                }
            }
        }
        
        function getNum(res){
            // console.log(res);
            //將number存入要跳轉的網頁參數，並可在跳轉的html直接從網址取值來用
            window.location.href=`../html/thankyou.html?number=${res}`;  
        }
        
        postJSON(getNum);
        cartArray=[];
        localStorage.setItem('cart',JSON.stringify(cartArray));

        // send prime to your server, to pay with Pay by Prime API .
        // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    })
}

