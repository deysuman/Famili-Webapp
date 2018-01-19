import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

//window.autosize = !function(e,t){"use strict";"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.autosize=t()}(this,function(){function e(e){function t(){let t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),e.style.wordWrap="break-word";let i=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=i,n="none"!==t.maxHeight?parseFloat(t.maxHeight):!1,r="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),o()}function o(){let t=e.style.height,o=document.documentElement.scrollTop,i=document.body.scrollTop;e.style.height="auto";let s=e.scrollHeight+r;if(n!==!1&&s>n?(s=n,"scroll"!==e.style.overflowY&&(e.style.overflowY="scroll")):"hidden"!==e.style.overflowY&&(e.style.overflowY="hidden"),e.style.height=s+"px",document.documentElement.scrollTop=o,document.body.scrollTop=i,t!==e.style.height){let d=document.createEvent("Event");d.initEvent("autosize.resized",!0,!1),e.dispatchEvent(d)}}if(e&&e.nodeName&&"DIV"===e.nodeName&&!e.hasAttribute("data-autosize-on")){let n,r;"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",o),window.addEventListener("resize",o),e.addEventListener("input",o),e.addEventListener("autosize.update",o),e.addEventListener("autosize.destroy",function(t){window.removeEventListener("resize",o),e.removeEventListener("input",o),e.removeEventListener("keyup",o),e.removeEventListener("autosize.destroy"),Object.keys(t).forEach(function(o){e.style[o]=t[o]}),e.removeAttribute("data-autosize-on")}.bind(e,{height:e.style.height,overflow:e.style.overflow,overflowY:e.style.overflowY,wordWrap:e.style.wordWrap,resize:e.style.resize})),e.setAttribute("data-autosize-on",!0),e.style.overflow="hidden",e.style.overflowY="hidden",t()}}return"function"!=typeof window.getComputedStyle?function(e){return e}:function(t){return t&&t.length?Array.prototype.forEach.call(t,e):t&&t.nodeName&&e(t),t}});

(function($) {
	$.fn.hashtags = function() {
		$(this).wrap('<div class="jqueryHashtags"><div class="highlighter"></div></div>').unwrap().before('<div class="highlighter"></div>').wrap('<div class="typehead"></div></div>');
		$(this).addClass("theSelector");
		//autosize($(this));

		/*$(this).on("keyup keydown", function() {
			let str = $("#editable-boss").text();
			$(this).parent().parent().find(".highlighter").css("width",$(this).css("width"));
			str = str.replace(/\n/g, '<br>');
			if(!str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?#([a-zA-Z0-9]+)/g) && !str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?@([a-zA-Z0-9]+)/g) && !str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?#([\u0600-\u06FF]+)/g) && !str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?@([\u0600-\u06FF]+)/g)) {
                if(!str.match(/#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))#/gi)) { //arabic support
					str = str.replace(/#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))/gi,'<span class="hashtag">#$1</span>');
				}else{
					str = str.replace(/#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))/gi,'<span class="hashtag">#$1</span>');
				}

			}
			$(this).parent().parent().find(".highlighter").html(str);
		});
		*/

		$(this).parent().prev().on('click', function() {
			$(this).parent().find(".theSelector").focus();
		});

  	};
})(jQuery);