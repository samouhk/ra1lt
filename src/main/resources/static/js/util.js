 (function($) {
    if (!$.setCookie) {
        $.extend({
            setCookie: function(c_name, value, exdays) {
                try {
                    if (!c_name) return false;
                    var exdate = new Date();
                    exdate.setDate(exdate.getDate() + exdays);
                    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
                    document.cookie = c_name + "=" + c_value;
                }
                catch(err) {
                    return '';
                };
                return '';
            }
        });
    };
    if (!$.getCookie) {
        $.extend({
            getCookie: function(c_name) {
                try {
                    var i, x, y,
                        ARRcookies = document.cookie.split(";");
                    for (i = 0; i < ARRcookies.length; i++) {
                        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
                        x = x.replace(/^\s+|\s+$/g,"");
                        if (x == c_name) return unescape(y);
                    };
                }
                catch(err) {
                    return '';
                };
                return '';
            }
        });
    };
})(jQuery);

  function setCommonDomainCookie(name,value)
  {
	  var path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",1)) ;
	  if(System.isDebug=='1')
		document.cookie = name+"="+value+"; path="+path;
	  else
	  {
		var domain = window.location.hostname ;
		domain = domain.substring(domain.indexOf(".", 0),domain.length) ;
		document.cookie = name+"="+value+"; secure; path="+path +";domain=" + domain;
	  }
  }
  
//  function set_cookie(name,value)
//  {	
//	var path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",1)) ;
//	if(System.isDebug=='1')
//		document.cookie = name+"="+value+"; path="+path;
//	else
//		document.cookie = name+"="+value+"; secure; path="+path;
//  }
//
//  function get_cookie(name)
//  {
//	var result = $.getCookie(name);
//	return result ;
//  }
  
  // Cookies
  function set_cookie(name, value) {
      var date = new Date();
      date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();               
      document.cookie = name + "=" + value + expires + "; path=/";
  }

  function get_cookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  }
   
  function loadFont() 
  {
	  var maFontSize = get_cookie("fontSize_cookie") ; //0,1
	  if(maFontSize=='')
	  {
		  var fontFromAM = get_cookie("FONT_SIZE") ; //Medium,Large,Extra
		  if('Large'==fontFromAM || 'Extra'==fontFromAM)
		  {
			  set_cookie("fontSize_cookie",1) ;
			  fontSize = "Large" ;
			  changeFont(1) ;
		  }  
		  else
		  {
			  set_cookie("fontSize_cookie",0) ;
			  fontSize = "Medium" ;
			  changeFont(0) ;
		  }
	  }
	  else
	  {
		  if(maFontSize=="1")
			  fontSize = "Large" ;
		  else
			  fontSize = "Medium" ;
		  changeFont(maFontSize) ;
	  }
  }
  
  function writeFont(f)//0,1
  {
	  set_cookie("fontSize_cookie",f) ;
	  $('#fontSizeHidden').val(f) ;
	  if(f==1)
		  fontSize = "Large" ;
	  else
		  fontSize = "Medium";
	  changeFont(f) ;
	  resetSession() ;
	  hideLeftPanelOnly() ;
	  
	  if(global_isMobile)
		  showLeft = false ;
	  else{
		  if(isFixMenuForDesktop)
			  showLeft = true ;
		  else
			  showLeft = false ;
	  }
	  
	  $('html, body').animate({ scrollTop: 0 }, 0);
	  setFontIcon(f) ;
	  addFontAndColorToUrlWithSelectorPrefix(fontSize, $('body'));
	  if(withCustomizeFontUpDown=='Y')
		  customizeFontUpDown() ;
  }
  
  function setFontIcon(f)//0,1
  {
   	if(f=="0")
  	{
  		$('#samllLink').hide();
  		$('#samllImg').show();
  		$('#largeLink').show();
  		$('#largeImg').hide();		
  	}
  	else
  	{
  		$('#samllLink').show();
  		$('#samllImg').hide();
  		$('#largeLink').hide();
  		$('#largeImg').show();		
  	}
  }

  var extendSesssionTimeoutId = -1 ;
  
  function extendSession()
  {	  	  
	  $.get("../../common/session/extend.xhtml", "", function(){},"json");
	  if(countCycle>0)
	  {		  
		  extendSesssionTimeoutId = setTimeout("extendSession()",SCTRL_GWTF_SESSIONUPDINTERVAL) ;
		  countCycle-- ;
	  }
  }
  
  function resetSession()
  {
	  if(extendSesssionTimeoutId>=0) clearTimeout(extendSesssionTimeoutId);
	  countCycle = 1 ;	  
	  extendSesssionTimeoutId = setTimeout("extendSession()",SCTRL_GWTF_SESSIONUPDINTERVAL) ;
  }
  
  function drawlangIcon()
  {
	 /*if(colorThemeCode=='B')
	 {
		 if(localeCode=='tc')
		 {
			 $('.engIcon').attr("src","../../images/mygovhk/common/menu/bw/langEN.png") ;
			 $('.tcIcon').attr("src","../../images/mygovhk/common/menu/bw/langTC_on.png") ;
			 $('.scIcon').attr("src","../../images/mygovhk/common/menu/bw/langSC.png") ;			 
		 }
		 else if(localeCode=='sc')
		 {
			 $('.engIcon').attr("src","../../images/mygovhk/common/menu/bw/langEN.png") ;
			 $('.tcIcon').attr("src","../../images/mygovhk/common/menu/bw/langTC.png") ;
			 $('.scIcon').attr("src","../../images/mygovhk/common/menu/bw/langSC_on.png") ;			 
		 }
		 else
		 {
			 $('.engIcon').attr("src","../../images/mygovhk/common/menu/bw/langEN_on.png") ;
			 $('.tcIcon').attr("src","../../images/mygovhk/common/menu/bw/langTC.png") ;
			 $('.scIcon').attr("src","../../images/mygovhk/common/menu/bw/langSC.png") ;			 
		 }
	 }
	 else
	 {*/
		 if(localeCode=='tc')
		 {
			 $('.engIcon').attr("src","../../images/mygovhk/common/menu/langEN.png") ;
			 $('.tcIcon').attr("src","../../images/mygovhk/common/menu/langTC_on.png") ;
			 $('.scIcon').attr("src","../../images/mygovhk/common/menu/langSC.png") ;			 
		 }
		 else if(localeCode=='sc')
		 {
			 $('.engIcon').attr("src","../../images/mygovhk/common/menu/langEN.png") ;
			 $('.tcIcon').attr("src","../../images/mygovhk/common/menu/langTC.png") ;
			 $('.scIcon').attr("src","../../images/mygovhk/common/menu/langSC_on.png") ;			 
		 }
		 else
		 {
			 $('.engIcon').attr("src","../../images/mygovhk/common/menu/langEN_on.png") ;
			 $('.tcIcon').attr("src","../../images/mygovhk/common/menu/langTC.png") ;
			 $('.scIcon').attr("src","../../images/mygovhk/common/menu/langSC.png") ;			 
		 }		 
	 //}
  }
  
  function changeFont(f) 
  {	
	 var styleSheetName = "fontSmall" ;	 //default
	 var removeSheetName = "fontMedium" ; //default
	 if(f==1) 
	 {
		 styleSheetName = "fontMedium" ;
		 removeSheetName = "fontSmall" ;
	 }
	 
	 if(typeof localeCode !== 'undefined')
	 {
		 if(localeCode!='en')
		 {
			 styleSheetName+="_Chinese" ;
			 removeSheetName+="_Chinese" ;
		 }
	 }
	 /*$('link[id*=font][title]').each(
			function(i){
				this.disabled = this.getAttribute('id')!=styleSheetName ;						
			}
	 );*/
	 if(isIE8()) 
	 { 
	    var style = document.createElement("link") ;
	    style.setAttribute("type","text/css") ;
	    style.setAttribute("rel","stylesheet") ;
	    style.setAttribute("href","../../../css/font/"+styleSheetName+".css?" + MAVersion) ;
	    jQuery("head")[0].appendChild(style) ;		
	    $("LINK[href*='../../../css/font/"+removeSheetName+".css?"+MAVersion+"']").remove();
	 }
	 else
	 {
		var $link = $("<link>").attr("href","../../../css/font/"+styleSheetName+".css?" + MAVersion)
							   .attr("rel","stylesheet")
							   .attr("type","text/css") ;
		$("head").append($link);
		$("LINK[href*='../../../css/font/"+removeSheetName+".css?"+MAVersion+"']").remove();
	 }
	 
  }
  
  function changeJTA(id)
  {
	 if(id=='')
	 {
		 $('#jumpActionLink').attr("href", "#jtc") ;
	 	 $('#jta_div').removeClass("access").addClass("hidden") ;
	 }
	 else
	 {
		 $('#jumpActionLink').attr("href", "#"+id) ;
	 	 $('#jta_div').removeClass("hidden").addClass("access") ;
	 }
  }	 
  
  
  function changeSubJTE(id)
  {
	  if(id=='')
		  changeJTE(false) ;
	  else 
	  {
		 $('#jumpErrorMsgLink').attr("href", "#"+id) ;
		 if(offjte!='Y')
	 	 	 $('#jte_div').removeClass("hidden").addClass("access") ;	  
	  }
  }
  
  function changeJTE(show)
  {
	 if(show)
	 {
		 $('#jumpErrorMsgLink').attr("href", "#jte") ;
		 if(offjte!='Y')
	 	 	 $('#jte_div').removeClass("hidden").addClass("access") ;
	 }
	 else
	 {
		 $('#jumpErrorMsgLink').attr("href", "#jtc") ;
		 if(offjte!='Y')
	 	 	 $('#jte_div').removeClass("access").addClass("hidden") ;
	 }
  }
  
  function setNumericAndMaxLength(event,element){
	  var chr;
	  if(event.which == null){
		  chr = String.fromCharCode(event.keyCode);
	  }else if(event.which != 0 && event.charCode != 0){
		  chr = String.fromCharCode(event.which);
	  }else{
		  chr = null;
	  }
	  if(!((+chr)+'' === chr+'') && chr != null){
		  event.preventDefault();
	  }
  }
  
  function isIE(){
	  var rv = -1;
	  var ua = navigator.userAgent;
	  var re = new RegExp("Trident\/([0-9]{1,}[\.0-9]{0,})");
	  if (re.exec(ua) != null) {
		  rv = parseFloat(RegExp.$1);
	  }  
	  return rv;
  }

  function isIE8()
  {
	  return (isIE() == 4);
  }

  function isIPAD()
  {
	  var result = navigator.userAgent.match(/(iPad);/i) ;
	  return !(result==null || result=='') ;	  
  }

  function isIOS()
  {
	  var result = navigator.userAgent.match(/(iPad|iPhone|iPod|iPod touch);/i) ;
	  return !(result==null || result=='') ;	  
  }
  
  function isIOS7()
  {
	  var result = navigator.userAgent.match(/(iPad|iPhone|iPod|iPod touch);.*CPU.*OS 7_\d/i) ;
	  return !(result==null || result=='') ;
  }
  
  function isMobile(){
	  return (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent) ; 
  }
  function isAndroid(){
	  return (/android/).test(navigator.userAgent.toLowerCase()) ; 
  }
  function isChrome(){
	  return (/chrome/).test(navigator.userAgent.toLowerCase()) ; 
  }
 
//  function setupTootipByID(id)
//  {
//		$('#'+id+"_help").click(function(){	
//			tooltipshowing = true ;
//			var target = this.id ;
//			currentToolTipsId = $('#'+target).attr('href') ;
//			$(currentToolTipsId).toggle() ;
//		});
//	  
//		$('#'+id).bind('keydown',function(event){
//			var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
//			if (keycode == 13 || keycode == 32){
//				var target = this.id ;
//				$($('#'+target).attr('href')).toggle() ;
//			}
//		});
//
//  }
  
  var currentToolTipsId = "" ;
  
  function setupTooltip()
  {
	  $(document).on("click", ".tooltipWithDiv", function(event){
			var target = this.id ;
			$currentToolTipsId = $($('#'+target).attr('href'));
			$currentToolTipsId.toggle();
			setTimeout(function(){$currentToolTipsId.focus();},500);
			return false;
	  });
//	  $(document).on("keydown", ".tooltipWithDiv", function(event){
//		  	var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
//			if (keycode == 13 || keycode == 32){
//				var target = this.id ;
//				$($('#'+target).attr('href')).toggle() ;
//			}
//	  });
//	  
//	  $('body').click(function(event) {
//		  var $target = $(event.target);
//		  if(!$target.is(".helpPublicOptIcon, .tooltipWithDivTextFont, .tooltipWithDivTextFont > a")){
//				  $('.tooltipWithDivText').hide() ;
//		  }
//	  });
  }
  
  function toggleCheckBoxWithHidden(thisid,hiddenId)
  {
	var id = $('#'+thisid+' span:first-child').attr('id');
	hiddenId = "#"+hiddenId;
	if($('#'+id).hasClass("checkbox-on"))
	{
		$(hiddenId).val("false");
		$('#'+id).addClass("checkbox-off").removeClass("checkbox-on");
	} else{
		$(hiddenId).val("true");
		$('#'+id).addClass("checkbox-on").removeClass("checkbox-off");
	}	  
  }
  
  
  function toggleRadioButtonWithHidden(thisid,hiddenId,GroupName)
  {
	var id = $('#'+thisid+' span:first-child').attr('id');
	hiddenId = "#"+hiddenId;
	$(hiddenId).val(thisid);
	$("[id^="+GroupName+"]").addClass("radio-off").removeClass("radio-on");
	$('#'+id).removeClass("radio-off").addClass("radio-on");	  	  
  }

  /*function popAlert(alertLink,foucsButton)
  {
  	$("#"+alertLink).click();
  	changeJTA(foucsButton) ;
  }

  function closeAlert(alertPanel,focusBtnId)
  {
  	$('#'+alertPanel).popup("close");
  	changeJTA(focusBtnId) ;
  }	*/		

  function popAlert2(alertPanel,foucsButton)
  {
	center(alertPanel) ;
	$("#"+alertPanel).removeClass("ui-hidden");
	$("#home").hide() ;
	$("#mainPanel").css({
		//'height' : $(window).height()
		'height' : $(document).height()
	}) ;	
	if(foucsButton!=''){
		changeJTA(foucsButton) ;
	}
	setTimeout(function(){
		$("#" + alertPanel + "_dialog").focus();
	},1000);
  }

  function closeAlert2(alertPanel,focusBtnId)
  {
	$("#"+alertPanel).addClass("ui-hidden");
	$("#mainPanel").css({
		'height' : ''			
	}) ;	
	$("#home").show() ;  	
  	changeJTA(focusBtnId) ;
  }			  
  
  function showLeftPanelOnly()
  {
	  /*if(isMobile())	
	  {		  
		$("#homepanel").css({
			'width' : $(window).width() - $('#leftpanel').width()			
		}) ;
	  }*/
	  if(global_isMobile || (!global_isMobile && !isFixMenuForDesktop))
	  {
		  $("#leftpanel").css({'height' : $('#homepanel').height()}) ;
		  $("#homepanel").css({
				'margin-left' : $('#leftpanel').width()			
		  }) ;	  
		  $('#leftpanel').show() ;
  	  }
  }
  
  function hideLeftPanelOnly()
  {
	if(global_isMobile || (!global_isMobile && !isFixMenuForDesktop))
	{
	  $("#leftpanel").css({'height' : $('#homepanel').height()}) ;
	  $("#homepanel").css({
		  'margin-left' : 0 			
	  }) ;	  
	  $('#leftpanel').hide() ;
  	}
  }
  
  function showLoading()
  {
	  $('.ui-loader-background').show() ;
  }
  
  function hideLoading()
  {
	  $('.ui-loader-background').hide() ;
  }

  function loadXMLDoc(url) {
  	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp = new XMLHttpRequest();
  	} else { // code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	xmlhttp.open("GET", url, false);
  	xmlhttp.send();
  	return xmlhttp.responseText;
  }

  function loadXmlDom(xml) {
  	if (window.DOMParser) {
  		parser = new DOMParser();
  		return parser.parseFromString(xml, "text/xml");
  	} else // Internet Explorer
  	{
  		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  		xmlDoc.async = "false";
  		xmlDoc.loadXML(xml);
  		return xmlDoc;
  	}
  }

  function forwardClick(id)
  {
  	var obj = document.getElementById(id) ;	
  	$(obj).click() ;
  }

  
  //parse date e.g. 2010-07-09T23:02:00+08:00
  function parseIsoDate(dateStr) {
  	if(dateStr.length <10) return null;
  	var d = dateStr.substring(0,10).split('-');	
  	for(var i in d) { 
  		d[i]=parseInt(d[i]);
  	};
  	d[1] = d[1] -1;//month;
  	var t = dateStr.substring(11,19).split(':');
  	return new Date(d[0],d[1],d[2],t[0],t[1],t[2]);
  }
  
  
  function getPageVar (sVar) {
	  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  
  function externalToNewWindow(){
	  $('body').find('a[href!="#"][rel="external"], a[href!="#"][target="_blank"]').each(function() {
		   if($(this).attr("rel")=="external")
			   $(this).attr("rel", "");
		   if($(this).attr("target")=="_blank")
			   $(this).attr("target", "");
	       $(this).click(function(event) {
	           event.preventDefault ? event.preventDefault() : event.returnValue = false;
			   if(event.stopPropagation){ event.stopPropagation(); }
	    	   var tempHref = this.href.toLowerCase() ;
	    	   var title = '' ;
	    	   if(tempHref.indexOf("http")==0)
	    	   {
	    		   title = tempHref.substring(tempHref.indexOf("//")+2,tempHref.length) ;
	    		   if(title.indexOf("/")>-1)
	    			   title = title.substring(0,title.indexOf("/")) ;
	    	   }
	    	   else
	    	   {
	    		   if(tempHref.indexOf("/")>-1)	        		   
	    			   title = tempHref.substring(0,tempHref.indexOf("/")) ;
	    		   else
	    			   title = tempHref ;
	    	   }
			   //title = title.replace(/\./g,"_");
			   //title = title.replace(/\:/g,"_");
	           windowOpen_checkPop(this.href, title,'menubar=no,scrollbars=yes,status=yes,toolbar=no,resizable=yes');
	       });
	  });
  }
  
  function windowOpen_checkPop_withOption(url,title){
	  windowOpen_checkPop(url,title,'menubar=no,scrollbars=yes,status=yes,toolbar=no,resizable=yes');	  
  }
  
  function windowOpen_checkPop(url,title,option)
  {
	try{
		title = title.replace(/[\:\.\,\ \-\~\!\@\#\%\/\^\&\*\+\<\>]/g, "_");
	}catch(e)
	{
		title = "" ;
	}   
	var myPopup = window.open(url,title,option) ;
	if(!myPopup)
	{
		hideLoading() ;
		alert(popupAlert);
		return 0 ;
	}
	else
	{
		if(isChrome())
		{
   			myPopup.onload = function() {
              setTimeout(function() {
                  if (myPopup.outerWidth === 0) {
                	  hideLoading() ;
                	  myPopup.close();
                	  alert(popupAlert);
                	  return 0 ;
                  }
              }, 0);
          };
		}
	}	
	myPopup.focus();
	return myPopup ;
  }