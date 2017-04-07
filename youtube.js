var ytp = ytplayer;
var stream = ytp.config.args.url_encoded_fmt_stream_map + ytp.config.args.adaptive_fmts;
var regUrl = /[&|,]?url=([^&]+)/;
var regSig = /[&|,]?s=([^&]+)/;
var regQua = /[&|,]?quality[^=]*=([^&]+)/;
var url = [], sig = [], qua = [];
var matchUrl, matchSig, quality = undefined;
var videoTitle = document.title;
stream = stream.split(',');
for (var i = 0; i < stream.length; i++) {
	matchUrl = stream[i].match(regUrl);
	matchSig = stream[i].match(regSig);
	quality = stream[i].match(regQua);
	if (matchUrl&&matchSig&&quality) {
		url.push(matchUrl[1]);
		sig.push(matchSig[1]);
		qua.push(quality[1]);
	}
}
for (var i = 0; i < sig.length; i++) {
	sig[i] = decryptSignature(sig[i]);
	url[i] = decodeURIComponent(url[i]) + '&signature=' + sig[i];
	if (url[i].toLowerCase().indexOf('ratebypass')==-1) { // speed up download for dash
		url[i] = url[i] + '&ratebypass=yes';
	}
    if (url[i].toLowerCase().indexOf('http')==0) { // validate URL
    	url[i] = url[i] + '&title=' + videoTitle.replace('YouTube',qua[i]);
    }
}
function decryptSignature(sig) {
    function swap(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c;return a};//swap a[0] and a[b]
    function decode(sig, arr) { // encoded decryption
    	var sigA=sig.split('');
    	for (var i=0;i<arr.length;i++) {
    		var act=arr[i];
    		sigA=(act>0)?swap(sigA, act):((act==0)?sigA.reverse():sigA.slice(-act));
    	}
    	var result=sigA.join('');
    	return result;
    }
    
    if (sig==null) return '';    
    var arr=[6,0,-1,0];
    if (arr) {
    	var sig2=decode(sig, arr);
    	if (sig2) return sig2;
    }
    return sig; 
}