var TotalArticleNumber = 4;
var articles = [];
var converter = new showdown.Converter();
var re = /[^#][\w\u0800-\u9fa5]+/i;
var re1 = /#[\w\u0800-\u9fa5]+/i;
var re2 = /[\s\S]*大綱:[\s\S]*\.\.\./g;

//開啟導航列
	document.getElementById('menu').addEventListener('click',function(){
		if(document.getElementById('menuContent').style.display!=='flex'){
		  document.getElementById('menuContent').style.display = 'inline-flex';
		  document.getElementById('menu').style.display = 'none';
	    }else{
	      document.getElementById('menuContent').style.display = 'none';
	    }
	})

//點選文章外，關閉文章	
window.addEventListener('click',function(e){
	if(e.target.id!=='menu'&&e.target.innerHTML!=='選單'){
		document.getElementById('menuContent').style.display = 'none';
		document.getElementById('menu').style.display = 'block';
	}

	if(e.target.id!=='realArticle'&&e.target.nodeName!=='H1'&&e.target.nodeName!=='P'&&e.target.parentNode.id!=='realArticle'&&e.target.parentNode.className!=='language-js'){
		document.getElementById('realArticle').style.display = 'none';
		document.body.style.background = 'white';
		if(window.location.pathname!=='/'&&window.location.pathname!=='/index.html'&&window.location.pathname!=='/about.html'&&window.location.pathname!=='/archive.html'){
		window.history.go(-1);
	    }
	}

})




//選單導航
document.getElementById('home').addEventListener('click',function(){
	document.body.style.display = 'none';
	 window.location.href ="./index.html";
})
document.getElementById('About').addEventListener('click',function(){
	document.body.style.display = 'none';
	 window.location.href ="./about.html";
})
document.getElementById('Archive').addEventListener('click',function(){
	document.body.style.display = 'none';
	 window.location.href ="./archive.html";
})
document.getElementById('Github').addEventListener('click',function(){
	 window.open("https://github.com/EasonWang01");
})

//因document.getElementsByClassName返回的是類陣列，不是陣列，所以沒有foreach方法
Array.prototype.forEach.call(document.getElementsByClassName('openArticle'),function(item){
	item.addEventListener('click',function(){
		document.getElementById('realArticle').style.display = 'block';
		document.body.style.background = 'gray';
	})
})



//Ajax讀取頁面
function loadhtml(url,callback) {
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      if( xhttp.status == 200){
        var  response =  xhttp.responseText;
     //將response訊息傳入callback
        (callback)(response);

      }
   };
  };
  xhttp.open("GET", url, true);
  xhttp.send();
};
var step = function(i){

	if(i>1){
		document.getElementById('articleContent').style.display ='none'; //讀取文章完才顯示文章
	}

   if( i > 0 ) {

document.getElementById('myBar').style.width = 'calc(100%/'+i+')';
   	console.log(i)
	loadhtml('./article/test'+i+'.html',function(e){
	 sdf(i,e)//讀取資料夾內的文章到首頁
	 articles.push(e);

	 //讀取完md且append到DOM後的callback
	 if(articles.length==TotalArticleNumber){//設了一個array來把讀完的文章放進去
	 	document.getElementById('myProgress').style.display ='none';
	 	document.getElementById('articleContent').style.display ='block'; //讀取文章完才顯示文章
	  	  Array.prototype.forEach.call(document.getElementsByClassName('title'),function(item){
			item.addEventListener('click',function(){
				
				if(document.getElementById('content')!==null){
					
					document.getElementById('realArticle').innerHTML = "";
				
				}
			  loadhtml('./article/test'+item.id+'.html',function(e){
			  	 var node3 = document.createElement("P");
			  	 var node4 = document.createElement("div");
			  	 var node5 = document.createElement("script");

			  	 node3.setAttribute('id','content');
			  	 node4.setAttribute('id','disqus_thread');
			  	 node5.setAttribute('id','disqus_threadScript');
                 node5.innerHTML = ` (function() { var d = document, s = d.createElement('script'); s.src = '//yicheng01blog.disqus.com/embed.js';s.setAttribute('data-timestamp', +new Date());(d.head || d.body).appendChild(s);})();`;
			  	 node3.innerHTML = converter.makeHtml(e);

			  	 document.getElementById('realArticle').appendChild(node3);
                 document.getElementById('realArticle').appendChild(node4);
				 document.getElementById('realArticle').appendChild(node5);
			  	 document.getElementById('realArticle').style.display = 'block';
		         document.body.style.background = 'gray';
		         })
			  history.pushState({ page: "article/test"+item.id },"", "article/test"+item.id+'.html');
			  });
	        
			})
		

	  	}
	  		step(i-1);
	 })


   }
};

step(TotalArticleNumber);



//讀取資料夾內的文章到首頁
function sdf(i,e){

	var node = document.createElement("DIV"); 
	var node1 = document.createElement("A");
	var node2 = document.createElement("H1"); 
	var node3 = document.createElement("P"); 
	var node4 = document.createElement("P");
	node.setAttribute('class','articleInner');
	node1.setAttribute('class','openArticle');
	node2.setAttribute('class','title');
	node2.setAttribute('id',i);
	node2.innerHTML = e.match(re);
	var md1 = e.replace(re1,"");
	var md2 = md1.match(re2);
	node3.innerHTML = md2;
	node1.appendChild(node2);
	node1.appendChild(node3);
	node.appendChild(node1);


	document.getElementById('articleContent').appendChild(node);


}
/*
sdf().then(function(){
	console.log(document.getElementById('1'))




})


*/
