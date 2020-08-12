function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    // console.log('statusChangeCallback');
    // The current login status of the person.
    if (response.status === 'connected') {
        
        FB.api('/me',"GET",{ "fields": 'name,id,email' },function(response) {
            
            //不能在這邊抓token，這裡的response只有name,id,email，token是在FB.Login時的response裡面
            document.getElementById("name").innerHTML=response.name;
            document.getElementById("email").innerHTML=response.email;
        });
        
        FB.api(
            "/me/picture",
            {
                "redirect": false,
                "height": 200,
                "width": 200,
                "type": "normal"
            },function(response){
                document.getElementById("picture").innerHTML=`<img src="${response.data.url}">`;
            }
        );
    } else {
        // The person is not logged into your webpage or we are unable to tell. 
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
    }, {scope: 'public_profile,email'});
    //name,picture,id包含在public_profile裡面
    //scope要和FB.login放在一起，在登入時直接要求給予email權限
}
function logout() {
    FB.logout(function(response) {
    // Person is now logged out
        window.location.href=`../html/index.html`;
    });
}

//渲染商品頁
//從localStorage抓總商品數並顯示在右上角
let cartArray = JSON.parse(localStorage.getItem('cart'));
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
