# javascript
// ==UserScript==
// @name         Baidu
// @version      0.0
// @description  Baidu
// @author       Boyden
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
   var nav = document.getElementById("s_wrap");
   nav.parentNode.removeChild(nav);

   var title = document.getElementsByTagName("title");
   title[0].innerHTML="百度";
    
    var search = document.getElementById("su");
    search.value="搜索";
})();
