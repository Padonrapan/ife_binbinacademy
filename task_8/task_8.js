var traverseList=[];
var searchList=[];
var rootNode=document.getElementById("root");
var timer;
//遍历函数
function traverse(node){
    traverseList.push(node);
    for(var i=0;i<node.children.length;i++){
        traverse(node.children[i]);
    }
}
//重置函数
function reset(){
    var divs=document.getElementsByTagName("div");
    for(var i=0;i<divs.length;i++){
        divs[i].style.backgroundColor="#fff";
    }
    traverseList=[];
    searchList=[];
}
//搜索函数
var tag = true;//标记是否搜索到，搜索到为false
function search(node,content) {
    var equal = (node.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, "") === content);
    if (tag && !equal) {
        searchList.push(node);
        for(var i = 0;i < node.children.length; i++)
        {
            search(node.children[i], content);
        }
    }
    if(equal){
        searchList.push(node);
        tag=false;
        return;
    }
}
//按钮绑定
window.onload=function(){
    document.getElementById("traverse-btn").onclick=function(){
        reset();
        traverse(rootNode);
        render(traverseList,"traverseNode");
    }
    document.getElementById("search-btn").onclick=function(){
        var content=document.getElementById("search-text").value;
        if(content==""){
            alert("请输入要查询的节点");
        }
        else{
            reset();
            search(rootNode,content);
            if(tag==false){
                render(searchList,"searchNode");
            }//查询成功
            else{
                render(searchList,"noResult");
            }//无该搜索结果
        }
    }
}
//渲染函数
function render(resultList,result){
    var i=0;
    resultList[i].style.backgroundColor="#fec8b0";
    timer=setInterval(function(){
        i++;
        if(i<resultList.length){
            resultList[i-1].style.backgroundColor="#fff";
            resultList[i].style.backgroundColor="#fec8b0";
        }
        else if(result=="traverseNode"){
                clearInterval(timer);
                resultList[resultList.length-1].style.backgroundColor="#fff";
            }
        else if(result=="searchNode"){
                clearInterval(timer);
                resultList[resultList.length-1].style.backgroundColor="#593c7f";
            }
        else if(result=="noResult"){
                clearInterval(timer);
                resultList[resultList.length-1].style.backgroundColor="#fff";
                alert("未查询到该节点");
            }
    },500)
}