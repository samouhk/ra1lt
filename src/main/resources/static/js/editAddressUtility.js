

$(document).ready(function(){
		
$('#addressType').val('HK');
		
		
		if(isMobile()){
			$("input[type='text']").attr("autocapitalize","false").attr("autocorrect","off");	
		}
    	bindRadioCheckboxEvents(document, "whyInd_1", "whyInd_1_Hidden", switchWhyIndTo1);
    	bindRadioCheckboxEvents(document, "whyInd_2", "whyInd_2_Hidden", switchWhyIndTo2);
    	bindRadioCheckboxEvents(document, "whyInd_3", "whyInd_3_Hidden", switchWhyIndTo3);
    	
    	
	});
	
	function customizeFontUpDown(){
		//alert('In fucntion');
		if(myScroll!=null){
			setTimeout(function () {
				myScroll.refresh();
			},2000);

		}
		return false;
	}
    
    function delAccount(){
    	$("#submitBtn").click();
    }    
    
    function toggleAgreeCheck(){
    	$chk = $("#tcAgreeCheck");
    	if($chk.is(".mySetting-checkbox-on")){
    		$("#tcAgreeCheck_input").prop("checked", false);
    		$chk.addClass("mySetting-checkbox-off").removeClass("mySetting-checkbox-on");
    	} else{
    		$("#tcAgreeCheck_input").prop("checked", true);
    		$chk.addClass("mySetting-checkbox-on").removeClass("mySetting-checkbox-off");
    	}
    }
    
    function switchWhyIndTo1(){
    	switchWhyInd("whyInd_1");
    }
    
    function switchWhyIndTo2(){
    	switchWhyInd("whyInd_2");
    }
    
    function switchWhyIndTo3(){
    	switchWhyInd("whyInd_3");
    }
    
 function bindRadioCheckboxEvents(document, imageId, controlId, fun){
	$(document).on("click", "#" + imageId, function(){
		$("#" + controlId).click();			
	}).on("click", "#" + controlId, function(){
		if(typeof fun == "function"){
			fun.call(this);
		}else{
			$(fun).each(function(){
				this.call(this);
			});
		}
	}).on("focus", "#" + controlId, function() {
		$("#" + imageId).addClass("focusOutline");
	}).on("focusout", "#" + controlId, function(){
		$("#" + imageId).removeClass("focusOutline");
	});	
}
   

    function switchWhyInd(radioId){
    	$radio1 = $("#whyInd_1_Hidden");
    	$radio2 = $("#whyInd_2_Hidden");
    	$radio3 = $("#whyInd_3_Hidden");

    	$image1 = $("#whyInd_1");
    	$image2 = $("#whyInd_2");
    	$image3 = $("#whyInd_3");
    
    	
    	if(radioId == "whyInd_1"){
    		$radio1.prop("checked", true);
    		$radio2.prop("checked", false);
    		$radio3.prop("checked", false);
    	
    		$image1.addClass("mySetting-radio-on").removeClass("mySetting-radio-off");
    		$image2.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		$image3.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		
    		$("#addressType").val('HK');
    		
    
    	} 
    	
    	if(radioId == "whyInd_2"){
    		$radio1.prop("checked", false);
    		$radio2.prop("checked", true);
    		$radio3.prop("checked", false);
    	
    		$image1.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		$image2.addClass("mySetting-radio-on").removeClass("mySetting-radio-off");
    		$image3.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		
    		$("#addressType").val('OUTSIDE');
    		
    	}
    	
    	if(radioId == "whyInd_3"){
    		$radio1.prop("checked", false);
    		$radio2.prop("checked", false);
    		$radio3.prop("checked", true);
    	
    		$image1.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		$image2.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		$image3.addClass("mySetting-radio-on").removeClass("mySetting-radio-off");
    		
    		$("#addressType").val('POBOX');
    	
    	}
    	
    
    }
    
    
    function change_page(){
    	if(selection=="1"){
    		window.location.href='editAddressResident.jsf';
    	}
    	
		if(selection=="2"){
			window.location.href='editAddressResidential.jsf';
		    	}
		
		if(selection=="3"){
			window.location.href='postBox.jsf';
		}
    	
    }
	