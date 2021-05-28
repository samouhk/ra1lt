function loadEASFont() 
  {	
	  var eaFontSize = get_cookie("EAS_FONT_SIZE") ; //0,1
	  
	  if(eaFontSize==null){
		  eaFontSize="Medium";
		  set_cookie("EAS_FONT_SIZE", eaFontSize);
	  }
	   
	  changeEaFont(eaFontSize,'css/font/') ;
	  
	  if(eaFontSize=='Large'){
		  $("#fontSize").html(defaultFontSizeTxt);
		  $("#fontSize").attr("title",defaultFont);
	  }else{
		  $("#fontSize").html(largeFontSizeTxt);
		  $("#fontSize").attr("title",largeFont);
	  }
	 
  }


function fontSizeOnClick(){		      		        	
	var fontSize_cookie = get_cookie('EAS_FONT_SIZE');
    if (fontSize_cookie=='Large') {
    	$("#fontSize").html(largeFontSizeTxt);
    	$("#fontSize").attr("title",largeFont);
    	set_cookie('EAS_FONT_SIZE','Medium') ;
        changeEaFont('Medium','css/font/');
    }else if (fontSize_cookie=='Medium'){
    	$("#fontSize").html(defaultFontSizeTxt);
    	$("#fontSize").attr("title",defaultFont);
    	set_cookie('EAS_FONT_SIZE','Large') ;
    	changeEaFont('Large','css/font/');
    }  	
}



 
  function changeEaFont(f,p) 
  {	
	 var styleSheetName = "fontSmall" ;	 //default
	 var removeSheetName = "fontMedium" ; //default
	 if(f=="Large") 
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
	    style.setAttribute("href",p+styleSheetName+".css?" + MAVersion) ;
	    jQuery("head")[0].appendChild(style) ;		
	    $("LINK[href*='"+p+removeSheetName+".css?"+MAVersion+"']").remove();
	 }
	 else
	 {
		var $link = $("<link>").attr("href",p+styleSheetName+".css?" + MAVersion)
							   .attr("rel","stylesheet")
							   .attr("type","text/css") ;
		$("head").append($link);
		$("LINK[href*='"+p+removeSheetName+".css?"+MAVersion+"']").remove();
	 }
	 
  }
  
  
  $(function(){
	  if(isMobile()){
		  $('#WebAccessibility-img').remove();
	  }
  });