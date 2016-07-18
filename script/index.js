var TotalArticleNumber = 3;
var articles = [];
var converter = new showdown.Converter();
var re = /[^#][\w\u0800-\u9fa5]+/i;
var re1 = /#[\w\u0800-\u9fa5]+/i;

//開啟導航列
	document.getElementById('menu').addEventListener('click',function(){
		if(document.getElementById('menuContent').style.display!=='flex'){
		  document.getElementById('menuContent').style.display = 'flex';
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
	}

})

//紅色叉叉關閉文章
document.getElementById('closeBtn').addEventListener('click',function(){
	document.getElementById('realArticle').style.display = 'none';
	document.body.style.background = 'white';
})



//選單導航
document.getElementById('home').addEventListener('click',function(){
	document.body.style.display = 'none';
	 window.location.href ="./index.html";
})

document.getElementById('About').addEventListener('click',function(){
	document.body.style.display = 'none';
	 window.location.href ="http://www.w3schools.com";
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



//讀取資料夾內的文章到首頁
for(let i = TotalArticleNumber;i>0;i--){
 
    loadhtml('./article/test'+i+'.md',function(e){
	 sdf(i,e)
	 articles.push(e);

	 //讀取完md且append到DOM後的callback
	 if(articles.length==TotalArticleNumber){
	  	  Array.prototype.forEach.call(document.getElementsByClassName('title'),function(item){
			item.addEventListener('click',function(){
				if(document.getElementById('content')!==null){
					document.getElementById('realArticle').removeChild(document.getElementById('realArticle').childNodes[3]); 
				}
			  loadhtml('./article/test'+item.id+'.md',function(e){
			  	 var node3 = document.createElement("P");
			  	 node3.setAttribute('id','content')
			  	 node3.innerHTML = converter.makeHtml(e);
			  	 document.getElementById('realArticle').appendChild(node3);
			  	 document.getElementById('realArticle').style.display = 'block';
		         document.body.style.background = 'gray';
			  });
	        
			})
		  })

	  	}
	 })
	  		/*
	  		
	  		document.getElementById('realArticle').innerHTML =converter.makeHtml(e);
	  		*/
	  		
  };


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
	node3.innerHTML = converter.makeHtml(e.replace(re1,""));
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