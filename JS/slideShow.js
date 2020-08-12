
let slidePic;
let slideStory;
var slideXhr = new XMLHttpRequest();
slideXhr.onreadystatechange = function () {
    if (slideXhr.readyState === 4){
        if (slideXhr.status === 200){
            var datas = JSON.parse(slideXhr.responseText);
            
            // console.log(datas.data[i].story);

            for (let i=0; i<datas.data.length; i++) {
                
                //取得picture
                slidePic = datas.data[i].picture;

                //取得內文
                slideStory = datas.data[i].story;
                slideStory = slideStory.replace(/\r\n/g,"<br/>");

                //render畫面
                var newDiv = document.createElement("div");
                newDiv.className = 'mySlides fade keyvisual';
                newDiv.style.backgroundImage = `url("https://api.appworks-school.tw/${slidePic}")`; 

                var innerDiv = document.createElement("div");
                innerDiv.className = "content";
                innerDiv.id="storyContent";

                newDiv.appendChild(innerDiv);
                document.getElementById("containerAJAX").appendChild(newDiv);
                
                //法ㄧ 較好較直觀
                innerDiv.innerHTML = slideStory;
                // console.log(innerDiv);

                //法二 要注意DOM有沒有被創造出來
                // document.getElementById('storyContent').innerHTML = slideStory;
                // console.log(document.getElementById('storyContent'));

                //圈圈數量
                var newCircle = document.createElement("span");
                newCircle.className = "circle dot";
                newCircle.onclick = function() {currentSlide(i)};

                document.getElementById("stepCircle").appendChild(newCircle);

            }
            //因為ajax抓資料為非同步，為了確保在頁面抓到slideshow資料後才開始執行頁面輪播
            showSlides(slideIndex);
            // setInterval(function(){nextSlides(slideIndex)},3000);
            setInterval(function(){
                //讓循環在012012之間跑，因為宣告slideIndex時=0，所以循環的下一個值要是1
                slideIndex=(slideIndex)%3;
                currentSlide(slideIndex);
            },10000);
        }
    } else if (slideXhr.status === 404){

    }
};
slideXhr.open('GET','https://api.appworks-school.tw/api/1.0/marketing/campaigns');
slideXhr.send();


//點擊下方圓圈跳轉下一頁動畫----------------------------------------
var slideIndex = 0;

// Thumbnail image controls
function currentSlide(n) {
    
    showSlides(n);
    // console.log(n);
    // console.log(slideIndex);
    slideIndex+=1;
}


function showSlides(m) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    //將所有頁面display:none
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    //將點擊頁display:block
    // console.log(slides);
    slides[m].style.display = "block";
    
    //將下方圓圈標記頁面
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[m].className += " active";

}



//參考：https://css-tricks.com/css-only-carousel/
//https://www.freecodecamp.org/news/how-to-create-a-slideshow/
//https://www.youtube.com/watch?v=4YQ4svkETS0
//https://www.w3schools.com/howto/howto_js_slideshow.asp