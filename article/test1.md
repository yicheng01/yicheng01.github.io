
#產生git_lock無法commit之解決辦法

<p style="color:gray;">2016.06.54 </p>

通常會發生在add或commit到一半時終止，而產生此問題，

原因是git會產生index.lock來避免git執行時出錯

只要將index.lock刪除即可

以下為windows處理方法
<pre class="prettyprint"><code class="language-js">

cd .git
del index.lock

</code></pre>


於Linux之處理方法
<pre class="prettyprint"><code class="language-js">

rm -f ./.git/index.lock

</code></pre>

