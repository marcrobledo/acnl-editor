/* Modded version of MarcFile.js for ACNL Editor */
function MarcFile(source, onLoad){	
	if(typeof source==='object' && source.files) /* get first file only if input with multiple files */
		source=source.files[0];


	var readFile=false;
	if(typeof source==='object' && source.name && source.size){ /* is file */
		if(typeof window.FileReader!=='function'){
			throw new Error('Incompatible Browser');
		}
		readFile=true;
		this.fileName=source.name;
		this.fileType=source.type;
		this.fileSize=source.size;


	}else if(typeof source==='number'){ /* is new empty file */
		this.fileName='file.bin';
		this.fileType='application/octet-stream';
		this.fileSize=source;

	}else{
		throw new Error('Invalid source');
	}


	this.littleEndian=false;
	this.offset=0;
	this._lastRead=null;

	if(readFile){
		this._fileReader=new FileReader();
		this._fileReader.marcFile=this;
		this._fileReader.addEventListener('load',function(){
			this.marcFile._u8array=new Uint8Array(this.result);
			this.marcFile._dataView=new DataView(this.result);

			if(onLoad)
				onLoad.call();
		},false);

		this._fileReader.readAsArrayBuffer(source);

	}else if(source>0){
		var ab=new ArrayBuffer(source);
		this._u8array=new Uint8Array(ab);
		this._dataView=new DataView(ab);

		if(onLoad)
			onLoad.call();
	}
}
MarcFile.prototype.save=function(){
	var blob;
	try{
		blob=new Blob([this._u8array], {type: this.fileType});
	}catch(e){
		//old browser, using BlobBuilder
		window.BlobBuilder=window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		if(e.name == 'TypeError' && window.BlobBuilder){
			var bb=new BlobBuilder();
			bb.append(this._u8array.buffer);
			blob=bb.getBlob(this.fileType);
		}else if(e.name=='InvalidStateError'){
			blob=new Blob([this._u8array.buffer],{type:this.fileType});
		}else{
			alert('Incompatible browser.');
		}
	}
	saveAs(blob, this.fileName)
}

MarcFile.prototype.readU8=function(offset){
	return this._u8array[offset]
}
MarcFile.prototype.readU16=function(offset){
	return (this._u8array[offset+1] << 8)+this._u8array[offset]
}
MarcFile.prototype.readU32=function(offset){
	return (this._u8array[offset+3] << 24)+(this._u8array[offset+2] << 16)+(this._u8array[offset+1] << 8)+this._u8array[offset]
}
MarcFile.prototype.readBytes=function(offset,nBytes){
	var bytes=new Array(nBytes);
	for(var i=0;i<nBytes;i++)
		bytes[i]=this._u8array[offset+i];
	return bytes
}

MarcFile.prototype.writeU8=function(offset,u8){
	this._u8array[offset]=u8
}
MarcFile.prototype.writeU16=function(offset,u16){
	this._u8array[offset]=u16 & 0x00ff;
	this._u8array[offset+1]=(u16 & 0xff00) >> 8;
}
MarcFile.prototype.writeU32=function(offset,u32){
	this._u8array[offset]=u32 & 0x000000ff;
	this._u8array[offset+1]=(u32 & 0x0000ff00) >> 8;
	this._u8array[offset+2]=(u32 & 0x00ff0000) >> 16;
	this._u8array[offset+3]=(u32 & 0xff000000) >> 24;
}




/* FileSaver.js (source: http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js)
 * A saveAs() FileSaver implementation.
 * 1.3.8
 * 2018-03-22 14:03:47
 *
 * By Eli Grey, https://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */
var saveAs=saveAs||function(c){"use strict";if(!(void 0===c||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=c.document,f=function(){return c.URL||c.webkitURL||c},s=t.createElementNS("http://www.w3.org/1999/xhtml","a"),d="download"in s,u=/constructor/i.test(c.HTMLElement)||c.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent),p=c.setImmediate||c.setTimeout,v=function(t){p(function(){throw t},0)},w=function(t){setTimeout(function(){"string"==typeof t?f().revokeObjectURL(t):t.remove()},4e4)},m=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},r=function(t,n,e){e||(t=m(t));var r,o=this,a="application/octet-stream"===t.type,i=function(){!function(t,e,n){for(var r=(e=[].concat(e)).length;r--;){var o=t["on"+e[r]];if("function"==typeof o)try{o.call(t,n||t)}catch(t){v(t)}}}(o,"writestart progress write writeend".split(" "))};if(o.readyState=o.INIT,d)return r=f().createObjectURL(t),void p(function(){var t,e;s.href=r,s.download=n,t=s,e=new MouseEvent("click"),t.dispatchEvent(e),i(),w(r),o.readyState=o.DONE},0);!function(){if((l||a&&u)&&c.FileReader){var e=new FileReader;return e.onloadend=function(){var t=l?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");c.open(t,"_blank")||(c.location.href=t),t=void 0,o.readyState=o.DONE,i()},e.readAsDataURL(t),o.readyState=o.INIT}r||(r=f().createObjectURL(t)),a?c.location.href=r:c.open(r,"_blank")||(c.location.href=r);o.readyState=o.DONE,i(),w(r)}()},e=r.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=m(t)),navigator.msSaveOrOpenBlob(t,e)}:(e.abort=function(){},e.readyState=e.INIT=0,e.WRITING=1,e.DONE=2,e.error=e.onwritestart=e.onprogress=e.onwrite=e.onabort=e.onerror=e.onwriteend=null,function(t,e,n){return new r(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this);






/* MarcDialogs.js */
MarcDialogs=function(){function e(e,t,n){a?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)}function t(){s&&(o?history.go(-1):(c.className="dialog-overlay",s.className=s.className.replace(/ active/g,""),s=null))}function n(e){for(var t=0;t<s.dialogElements.length;t++){var n=s.dialogElements[t];if("INPUT"===n.nodeName&&"hidden"!==n.type||"INPUT"!==n.nodeName)return n.focus(),!0}return!1}function l(){s&&(s.style.marginLeft="-"+s.offsetWidth/2+"px",s.style.marginTop="-"+s.offsetHeight/2-30+"px")}var a=/MSIE 8/.test(navigator.userAgent),o=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)&&"function"==typeof history.pushState,i=["Cancel","Accept"],s=null,c=document.createElement("div");c.className="dialog-overlay",c.style.position="fixed",c.style.top="0",c.style.left="0",c.style.width="100%",c.style.height="100%",c.style.zIndex=8e3,e(c,"click",t),e(window,"load",function(){document.body.appendChild(c),o&&history.replaceState({myDialog:!1},null,null)}),e(window,"resize",l),o&&e(window,"popstate",function(e){e.state.myDialog?(s=e.state.myDialog,MarcDialogs.open(e.state.myDialog)):e.state.myDialog===!1&&s&&(c.className="dialog-overlay",s.className=s.className.replace(/ active/g,""),s=null)}),e(document,"keydown",function(e){s&&(27==e.keyCode?(e.preventDefault?e.preventDefault():e.returnValue=!1,t()):9==e.keyCode&&s.dialogElements[s.dialogElements.length-1]==document.activeElement&&(e.preventDefault?e.preventDefault():e.returnValue=!1,n()))});var d=null,u=null,m=null;return{open:function(e){s&&(s.className=s.className.replace(/ active/g,"")),o&&(s?history.replaceState({myDialog:e},null,null):(console.log("a"),history.pushState({myDialog:e},null,null))),c.className="dialog-overlay active",s="string"==typeof e?document.getElementById("dialog-"+e):e,s.className+=" active",s.style.position="fixed",s.style.top="50%",s.style.left="50%",s.style.zIndex=8001,s.dialogElements||(s.dialogElements=s.querySelectorAll("input,textarea,select")),n(),l(s),l(s)},close:t,alert:function(t){if(!d){d=document.createElement("div"),d.id="dialog-quick-alert",d.className="dialog",d.msg=document.createElement("div"),d.msg.style.textAlign="center",d.appendChild(d.msg),d.buttons=document.createElement("div"),d.buttons.className="buttons";var n=document.createElement("input");n.type="button",n.className="button button-accept",n.value=i[1],e(n,"click",this.close),d.buttons.appendChild(n),d.appendChild(d.buttons),document.body.appendChild(d)}d.msg.innerHTML=t,MarcDialogs.open("quick-alert")},confirm:function(t,n){if(!u){u=document.createElement("div"),u.id="dialog-quick-confirm",u.className="dialog",u.msg=document.createElement("div"),u.msg.style.textAlign="center",u.appendChild(u.msg),u.buttons=document.createElement("div"),u.buttons.className="buttons";var l=document.createElement("input");l.type="button",l.className="button button-accept",l.value=i[1],e(l,"click",function(){m()}),u.buttons.appendChild(l);var a=document.createElement("input");a.type="button",a.className="button",a.value=i[0],e(a,"click",this.close),u.buttons.appendChild(a),u.appendChild(u.buttons),document.body.appendChild(u)}m=n,u.msg.innerHTML=t,MarcDialogs.open("quick-confirm")}}}();



/* MarcStringCleaner.js */
var _STR_CLEAN=['a',/[\xc0\xc1\xc2\xc4\xe0\xe1\xe2\xe4]/g,'e',/[\xc8\xc9\xca\xcb\xe8\xe9\xea\xeb]/g,'i',/[\xcc\xcd\xce\xcf\xec\xed\xee\xef]/g,'o',/[\xd2\xd3\xd4\xd6\xf2\xf3\xf4\xf6]/g,'u',/[\xd9\xda\xdb\xdc\xf9\xfa\xfb\xfc]/g,'n',/[\xd1\xf1]/g,'c',/[\xc7\xe7]/g,'ae',/[\xc6\xe6]/g,'and',/\x26/g,'euro',/\u20ac/g,'',/[^\w- ]/g,'_',/( |-)/g,'_',/_+/g,'',/^_|_$/g];
if(!String.prototype.clean)String.prototype.clean=function(){var s=this.toLowerCase();for(var i=0;i<_STR_CLEAN.length;i+=2)s=s.replace(_STR_CLEAN[i+1],_STR_CLEAN[i]);return s}