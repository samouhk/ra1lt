/*var color_en = "Colour" ;
var color_chi = '\u5F69\u8272' ;
var color_both = color_en + "/" + color_chi ;
var bw_en = "Black & White" ;
var bw_chi = '\u9ED1\u767D' ;
var bw_both = bw_en + " / " + bw_chi ;*/

var cookieName = 'mygovhkstyle';

/*function getColor(colorcode,langcode)
{
	if(colorcode==1)
	{
		if(langcode=='chi')
			return bw_chi ;
		else if(langcode=='both')
			return bw_both ;
		else
			return bw_en ;
	}
	else
	{
		if(langcode=='chi')
			return color_chi ;
		else if(langcode=='both')
			return color_both ;
		else
			return color_en ;
	}
}*/

$(document).ready(function()
{ 
	switchText();
	initRegHints();
	
	/*$("#colour").click(function()
	{
		var colour = readCookie("colour") ;
		if (colour == 1)
		{
			createCookie("colour", "0" , 0) ;
			$('html, body, *').removeClass("bw");
			$('#colour').text(getColor(1,lang));
			$('#logo_img').attr("src", "timeout_files/mygovhklogo_singleline.png");
		}
		else
		{
			createCookie("colour", "1" , 0) ;
			$('html, body, *').addClass("bw");
			$('#colour').text(getColor(0,lang));
			$('#logo_img').attr("src", "timeout_files/mygovhklogo_wh.png");
		}		
		return false ;
	});*/						

	/*var colour = readCookie("colour") ;
	if (colour == 1)
	{
		$('html, body, *').addClass("bw");
		$('#colour').text(getColor(0,lang));
		$('#logo_img').attr("src", "timeout_files/mygovhklogo_wh.png");
	}
	else
	{
		$('html, body, *').removeClass("bw");
		$('#colour').text(getColor(1,lang));
		$('#logo_img').attr("src", "timeout_files/mygovhklogo_singleline.png");
	}*/
	$('#logo_img').attr("src", "timeout_files/mygovhklogo_singleline.png");
	$('#close_link').focus(function() {
		/*var colour = readCookie("colour") ;
		if (colour == 1)
			$("#close_div").addClass('submitBtn_bw_focus');
		else
			$("#close_div").addClass('submitBtn_focus');*/
		$("#close_div").addClass('submitBtn_focus');
	}).focusout(function(){
		/*var colour = readCookie("colour") ;
		if (colour == 1)
			$("#close_div").removeClass('submitBtn_bw_focus');
		else
			$("#close_div").removeClass('submitBtn_focus');*/
		$("#close_div").removeClass('submitBtn_focus');
	});
	$('#submitBtn').focus() ;
}); 

function initRegHints(){
	//show field hints when focus, hide field hints when blur
	var regFields = $('#regFieldsContainer input, #regFieldsContainer select');
	regFields.each(function(){				
		$(this).focus(function(){
			$(this).parent().next('.regFieldHint').show();			
		});
		$(this).blur(function(){
			$(this).parent().next('.regFieldHint').hide();
		} );
	});
}

function switchText(){
	var size='';
	$('a.changeText').click(function(e){
		var target = $(e.target);
		e.preventDefault();	
		if (target.is('.changeTextM')){
			size = 'Medium';
		} else if (target.is('.changeTextL')){
			size = 'Large';
		}else{
			size = 'Extra';
		}
		target.addClass('changeTextActive');
		$.stylesheetSwitch(size); //text size style sheet switching	
	});	
}

(function($){		
		// Local vars for toggle		
		var availableStylesheets = [];
		var activeStylesheetIndex = 0;
		
		// To loop through available stylesheets
		$.stylesheetToggle = function(){
			activeStylesheetIndex ++;
			activeStylesheetIndex %= availableStylesheets.length;
			$.stylesheetSwitch(availableStylesheets[activeStylesheetIndex]);
		};
		
		// To switch to a specific named stylesheet
		$.stylesheetSwitch = function(styleName){
			if (styleName){
				
				
				
				$('a.changeText').each(function(){
					$(this).removeClass('changeTextActive');
					
				});
				
				styleSheetName = "modeFormat"+styleName;
				$('link[id*=modeFormat][title]').each(
					function(i){
						this.disabled = true;
						if (this.getAttribute('id') == styleSheetName) {
							this.disabled = false;
							activeStylesheetIndex = i;						
						}
					}
				);
				eraseCookie(cookieName);
				createCookie(cookieName, styleName, 365);
				$(document).ready(function(){
					if (styleName == 'Medium'){
						//$('.changeTextM').addClass('changeTextActive');	
						$('.changeTextL').css('display','');
						$('.changeTextM').css('display','none');
					} else if (styleName == 'Large'){
						//$('.changeTextL').addClass('changeTextActive');
						$('.changeTextL').css('display','none');
						$('.changeTextM').css('display','');
					}else if (styleName == 'Extra'){
						$('.changeTextE').addClass('changeTextActive');
					}
				});
			}else{
				
				$(document).ready(function(){
					//$('.changeTextM').addClass('changeTextActive');
					$('.changeTextM').css('display','none');
					$('.changeTextL').css('display','');
					
				});
			}
			
		};
		
		// To initialise the stylesheet with it's 
		$.stylesheetInit = function()
		{
			var c = readCookie(cookieName);
			$.stylesheetSwitch(c);
		};
	}
)(jQuery);

function createCookie(name,value,days)
{
	var path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",1)) ;
	if(System.isDebug=='1')
		document.cookie = name+"="+value+"; path="+path;
	else
		document.cookie = name+"="+value+"; secure; path="+path;
}

function setCommonDomainCookie(name,value,days)
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

function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name){
	createCookie(name,"",-1);
}

//preload image functions
jQuery.preloadImages = function(){
	for(var i = 0; i<arguments.length; i++)  {
		jQuery("<img>").attr("src", arguments[i]);
	}
}



// load inline before <body>
$.stylesheetInit();	


