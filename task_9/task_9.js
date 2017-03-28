var traverseList=[];//存放遍历结果
var searchList=[];//存放搜索结果
var timer;
var divs=document.getElementsByTagName("div");
var rootNode=document.getElementById("root");

//遍历函数
function traverse(node){
    if(node) {
        traverseList.push(node);
        for (var i = 0; i < node.children.length; i++) {
            traverse(node.children[i]);
        }
    }
}

//搜索函数
var tag=true;//标记是否搜索到，搜索到为false
function searchText(node,content){
   var equal = (node.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, "") === content);
   if(!equal&&tag){
       searchList.push(node);
       for(var i=0;i<node.children.length;i++){
           searchText(node.children[i],content);
       }
   }
   else if(equal){
       searchList.push(node);
       tag=false;
       return;
   }
}
//初始化函数
function reset(){
    for(var i=0;i<divs.length;i++){
        divs[i].style.backgroundColor="#fff";
    }
    clearInterval(timer);
    traverseList=[];
    searchList=[];
}

//绑定按钮事件
window.onload=function(){
    //遍历树事件
    document.getElementById("traverse-btn").onclick=function(){
        reset();
        traverse(rootNode);
        render(traverseList,"traverseNode");
    }
    //搜索树事件
    document.getElementById("search-btn").onclick=function(){
        var content=document.getElementById("search-text").value;
        if(content==""){
            alert("请输入要查询的节点");
        }
        else {
            reset();
            searchText(rootNode, content);
            if (tag==false) {
                render(searchList, "searchNode");
            }//查询成功
            else {
                render(searchList, "noResult");
            }//无该搜索结果
        }
    }
    //点击相应的节点显示颜色变化
    var selectDiv;//存放选中的节点;
    for(var i=0;i<divs.length;i++){
        divs[i].onclick=function(e){
            reset();
            this.style.backgroundColor="#fef9d1";
            e.stopPropagation();//阻止事件冒泡
            selectDiv=this;
        }
    }
    //删除选中节点
    document.getElementById("delete-btn").onclick=function(){
        if(selectDiv==undefined){
            alert("请选中要删除的节点");
        }
        else{
            var parent=selectDiv.parentNode;
            parent.removeChild(selectDiv);
        }
    }
    //在选中节点下增加子节点
    document.getElementById("insert-btn").onclick=function(){
        var content=document.getElementById("insert-text").value;
        if(content==null){
            alert("请输入要插入的节点内容");
        }
        else{
            var newDiv=document.createElement("div");
            newDiv.innerHTML=content;
            selectDiv.appendChild(newDiv);
        }
    }
}

//渲染函数
function render(resultDiv,result){
    var i=0;
    resultDiv[i].style.backgroundColor="#fec8b0";
    timer=setInterval(function(){
        i++;
        if(i<resultDiv.length){
            resultDiv[i-1].style.backgroundColor="#fff";
            resultDiv[i].style.backgroundColor="#fec8b0";
        }
        else if(result=="searchNode"){
            clearInterval(timer);
            resultDiv[resultDiv.length-1].style.backgroundColor="#593c7f";
        }
        else if(result=="traverseNode"){
            clearInterval(timer);
            resultDiv[resultDiv.length-1].style.backgroundColor="#fff";
        }
        else if(result=="noResult"){
            clearInterval(timer);
            resultDiv[resultDiv.length-1].style.backgroundColor="#fff";
            alert("没有查询到该节点");
        }
    },500)
}


