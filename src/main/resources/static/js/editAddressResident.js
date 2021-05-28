//<![CDATA[ 
$(document).ready(function(){

	$("#region").val(0);
	$("#district").val(0);
	$("#currReg").val('');
		
	$('#house_num').attr('placeholder',street_place_holder);
	
	if($("#currReg").val()!='' ){
		$("#region_ajax").click();
	}
	
	$('#region, #district, #block, #unit').keyup(
			  function(event){
			   if(event.which==40||event.which==38){
				   $(this).change();
				   }
			  }
			);
	//MyGov5-03-002 - Adopt RM2 - BEGIN
//	$('#region').on('mousedown',function(){
//		  $("#region").children("option:selected").removeAttr('selected');
//		});

	ajax_preix_build(build_prefix_number,street);

		if(isMobile()){
			$("input[type='text']").attr("autocapitalize","false").attr("autocorrect","off");	
		}
    	bindRadioCheckboxEvents(document, "whyInd_1", "whyInd_1_Hidden", switchWhyIndTo1);
    	bindRadioCheckboxEvents(document, "whyInd_2", "whyInd_2_Hidden", switchWhyIndTo2);
    	
    	var page_index= $("#currType").val();
    	$('#whyInd_'+page_index).click();
    	
    	/*dropdown*/
    	
    	$("#region").on("change", function(event) {				
    		$("#currDist").val('');
			$("#regionDisplayTxt").text($(this).children("option:selected").text());
    		//$("#currReg").val($("#region").val());
			var selectedRegion = document.getElementById("region").options[document.getElementById("region").selectedIndex].text; 
			$("#currReg").val(selectedRegion.trim());

			$("#district").empty();
			$("#district").append("<option> "+pls_select+"</option>");
			$("#districtDisplayTxt").text(pls_select);
			var selValue = $(this).val();
			//alert('a:selattr:'+selValue+":"+$(this).attr("value"));
			if(selValue!=0){
				if($("#region").val()=="HK"){
					if(regionHK!="empty"){
						$("#returnDistResult").val(regionHK);						
						createDistrict();												
					}
				}else if($("#region").val()=="KLN"){
					if(regionKLN!="empty"){
						$("#returnDistResult").val(regionKLN);
						createDistrict();															
					}
				}else if($("#region").val()=="NT"){
					if(regionNT!="empty"){
						$("#returnDistResult").val(regionNT);
						createDistrict();											
					}
				}
				
				$("#region_ajax").click();
			}else{
				
				$("#currReg").val('');
			}
			event.preventDefault();
			return false;
			
		});
  //MyGov5-03-002 - Adopt RM2 - END  	
    			    	    	
    	    	$("#regionDisplayTxt").text($("#region option:selected").text());
    	    	
				$(document).on("change", "#district", function(event){  
    	    		$("#districtDisplayTxt").text($.trim($(this).children("option:selected").text()));
    	    		
    	    		//$("#currDist").val($("#district").val());
    	    		var selectedDistrict = document.getElementById("district").options[document.getElementById("district").selectedIndex].text;
    	    		$("#currDist").val(selectedDistrict.trim());
    	        });
    			    	    	
    	    	$("#districtDisplayTxt").text($.trim($("#district option:selected").text()));
    	    	
    	    	
    	    	$(document).on("change", "#block", function(event){  
    	    		$("#blockTxt").text($(this).children("option:selected").text());
    	    		
    	        });
    			    	    	
    	    	$("#blockTxt").text($("#block option:selected").text());
    	    	
    	    	
    	    	$(document).on("change", "#unit", function(event){  
    	    		$("#unitTxt").text($(this).children("option:selected").text());
    	    		
    	        });
    			    	    	
    	    	$("#unitTxt").text($("#unit option:selected").text());
				
    			$(document).on("focus","#region,#district,#block,#unit",function(){
    				$(this).parent().addClass("focusBorder");
    			});
    			$(document).on("focusout","#region,#district,#block,#unit",function(){
    				$(this).parent().removeClass("focusBorder");
    			});
    			
    			
    			
    			$('#village').keydown(function( event ) {
    				 if ( event.which == 13 ||event.which == 40||event.which == 38 ){
    					  event.preventDefault();
    				 }
    				
    				 
    				 var code = event.keyCode || event.which;
    				   if (code == '9') {
    					   $('#street_ajax_table').css('display','none');
    				   }
    				 
    				 
    				  if ( event.which == 13 ) {
    					 
    				    $('#street_ajax_table').css('display','none');
    				  }
    				  
    				  if(street_length!=0 && $("#street_ajax_table").css('display')!="none" && event.which == 40){    		    			
 						 street_position+=1;
							 street_position= street_position%street_length;
 		  				  var highlight= street_position%street_length;
 		  				$( "#street_ajax_table .tr-row" ).each(function( index ) {
 		  				  $(this).removeClass('selected');
 		  				});
 		  				  
 		  				  $( "#street_ajax_table .tr-row:nth-child("+highlight+")" ).addClass( 'selected' );
 		  				  $('#village').val($( "#street_ajax_table .tr-row:nth-child("+highlight+")" ).text());
 		    			}	
 					
 					if(street_length!=0 && $("#street_ajax_table").css('display')!="none" && event.which == 38){    		    			
 			
		  				  street_position-=1;
						   if(street_position<0){
							   street_position=street_length+street_position;
						   }
		  				  highlight=street_position;
					
		  				$( "#street_ajax_table .tr-row" ).each(function( index ) {
		  				  $(this).removeClass('selected');
		  				});
		  				  
		  				  $( "#street_ajax_table .tr-row:nth-child("+highlight+")" ).addClass( 'selected' );
		  				  $('#village').val($( "#street_ajax_table .tr-row:nth-child("+highlight+")" ).text());
		  				  
		  					
		    			}	
    				  
    				});
    			
	    			setInterval(function(){
		    			if($("#street_ajax_table").is(':visible')){
							var active = document.activeElement;
							$('body').on('click',function(e){
								if(active.id!='village'||!$('e.target').hasClass('td')){
									   $('#street_ajax_table').css('display','none');
								}								
							});
							
						} 
	    			},100);
    			
	    			$('#building').keydown(function( event ) {
	   				 if ( event.which == 13 ||event.which == 40||event.which == 38 ){
	   					  event.preventDefault();
	   				 }
	   				
	   				 
	   				 var code = event.keyCode || event.which;
	   				   if (code == '9') {
	   					   $('#building_ajax_table').css('display','none');
	   				   }
	   				 
	   				 
	   				  if ( event.which == 13 ) {
	   					 
	   				    $('#building_ajax_table').css('display','none');
	   				  }
	   				  
	   				  if(building_length!=0 && $("#building_ajax_table").css('display')!="none" && event.which == 40){    		    			
							 building_position+=1;
								 building_position= building_position%building_length;
			  				  var highlight= building_position%building_length;
			  				$( "#building_ajax_table .tr-row" ).each(function( index ) {
			  				  $(this).removeClass('selected');
			  				});
			  				  
			  				  $( "#building_ajax_table .tr-row:nth-child("+highlight+")" ).addClass( 'selected' );
			  				  $('#building').val($( "#building_ajax_table .tr-row:nth-child("+highlight+")" ).text());
			    			}	
						
						if(building_length!=0 && $("#building_ajax_table").css('display')!="none" && event.which == 38){    		    			
				
			  				  building_position-=1;
							   if(building_position<0){
								   building_position=building_length+building_position;
							   }
			  				  highlight=building_position;
						
			  				$( "#building_ajax_table .tr-row" ).each(function( index ) {
			  				  $(this).removeClass('selected');
			  				});
			  				  
			  				  $( "#building_ajax_table .tr-row:nth-child("+highlight+")" ).addClass( 'selected' );
			  				  $('#building').val($( "#building_ajax_table .tr-row:nth-child("+highlight+")" ).text());
			  				  
			  					
			    			}	
	   				  
	   				});
	    			setInterval(function(){
						if($("#building_ajax_table").is(':visible')){
							var active = document.activeElement;
							
							$('body').on('click',function(e){
								if(active!=building||!$('e.target').hasClass('td')){
									  $('#building_ajax_table').css('display','none');
								}								
							});						
						}    
	    			},100);
	    			
	    			$('#estate').keydown(function( event ) {
		   				 if ( event.which == 13 ||event.which == 40||event.which == 38 ){
		   					  event.preventDefault();
		   				 }
		   				
		   				 
		   				 var code = event.keyCode || event.which;
		   				   if (code == '9') {
		   					   $('#estate_ajax_table').css('display','none');
		   				   }
		   				 
		   				 
		   				  if ( event.which == 13 ) {
		   					 
		   				    $('#estate_ajax_table').css('display','none');
		   				  }
		   				  
		   				  if(estate_length!=0 && $("#estate_ajax_table").css('display')!="none" && event.which == 40){    		    			
								 estate_position+=1;
									 estate_position= estate_position%estate_length;
				  				  var highlight= estate_position%estate_length;
				  				$( "#estate_ajax_table .tr-row" ).each(function( index ) {
				  				  $(this).removeClass('selected');
				  				});
				  				  
				  				  $( "#estate_ajax_table .tr-row:nth-child("+highlight+")" ).addClass( 'selected' );
				  				  $('#estate').val($( "#estate_ajax_table .tr-row:nth-child("+highlight+")" ).text());
				    			}	
							
							if(estate_length!=0 && $("#estate_ajax_table").css('display')!="none" && event.which == 38){    		    			
					
				  				  estate_position-=1;
								   if(estate_position<0){
									   estate_position=estate_length+estate_position;
								   }
				  				  highlight=estate_position;
							
				  				$( "#estate_ajax_table .tr-row" ).each(function( index ) {
				  				  $(this).removeClass('selected');
				  				});
				  				  
				  				  $( "#estate_ajax_table .tr-row:nth-child("+highlight+")" ).addClass( 'selected' );
				  				  $('#estate').val($( "#estate_ajax_table .tr-row:nth-child("+highlight+")" ).text());
				  				  
				  					
				    			}	
		   				  
		   				});
		    			setInterval(function(){
							if($("#estate_ajax_table").is(':visible')){
								var active = document.activeElement;
								
								$('body').on('click',function(e){
									if(active!=estate||!$('e.target').hasClass('td')){
										  $('#estate_ajax_table').css('display','none');
									}								
								});						
							}    
		    			},100);
	    			
	    			
	    			reloadBack();
	    			
	    			if(localcode=='en'){
	    				$('#blockDropDownID').after($('#blockTextContainerID'));
	    				$('#unitDropDownID').after($('#unitTextContainerID'));
	    			}
	    			
	    			
	    			setTimeout(function(){
	    				if($('#jteEAS').val()!=null){
	    	    				$('#jteEAS').focus();
	    	    			}
	    			},1000);
	    	
    	
	});
	
	function ajax_preix_build(j,l){

		
		
		if(isMobile()){
			$( "#building" ).bind('input',function(){
				  if($('#building').val().length>=j){
						$('#currBuild').val($('#building').val()) ; 
						$('#building_ajax').click();
					}else{
						$('#building_result').val('') ; 
					}
					  
					  if($('#building').val().length==(j-1)){
							$('#currBuild').val('') ; 
							$('#building_ajax').click();
						  }
			});
		}else{
			$( "#building" ).keyup(function(event) {
				
				if(event.which != 13&&event.which != 40 && event.which != 38){
				  if($('#building').val().length>=j){
					$('#currBuild').val($('#building').val()) ; 
					$('#building_ajax').click();
				}else{
					$('#building_result').val('') ; 
				}
				  
				  if($('#building').val().length==(j-1)){
						$('#currBuild').val('') ; 
						$('#building_ajax').click();
					  }
				  
				}
			  
			});
		}
	
		
		if(isMobile()){
			$("#village").bind('input',function(){
				 if($('#village').val().length>=l){
						$('#currStreet').val($('#village').val()) ; 
						$('#street_ajax').click();
					  }else{
						  $('#street_result').val('') ;  
					  }
					  
					  if($('#village').val().length==(l-1)){
							$('#currStreet').val('') ; 
							$('#street_ajax').click();
						  }
			});			
		}else{
			$( "#village" ).keyup(function(event) {
				
				if(event.which != 13&&event.which != 40 && event.which != 38){
				  if($('#village').val().length>=l){
					$('#currStreet').val($('#village').val()) ; 
					$('#street_ajax').click();
				  }else{
					  $('#street_result').val('') ;  
				  }
				  
				  if($('#village').val().length==(l-1)){
						$('#currStreet').val('') ; 
						$('#street_ajax').click();
					  }
				 
				}
				});			
		}	
		
		
		if(isMobile()){
			$( "#estate" ).bind('input',function(){
				  if($('#estate').val().length>=j){
						$('#currEstate').val($('#estate').val()) ; 
						$('#estate_ajax').click();
					}else{
						$('#estate_result').val('') ; 
					}
					  
					  if($('#estate').val().length==(j-1)){
							$('#currEstate').val('') ; 
							$('#estate_ajax').click();
						  }
			});
		}else{
			$( "#estate" ).keyup(function(event) {
				
				if(event.which != 13&&event.which != 40 && event.which != 38){
				  if($('#estate').val().length>=j){
					$('#currEstate').val($('#estate').val()) ; 
					$('#estate_ajax').click();
				}else{
					$('#estate_result').val('') ; 
				}
				  
				  if($('#estate').val().length==(j-1)){
						$('#currEstate').val('') ; 
						$('#estate_ajax').click();
					  }
				  
				}
			  
			});
		}
		
		
	}
	

 
    function switchWhyIndTo1(){
    	switchWhyInd("whyInd_1");
    }
    
    function switchWhyIndTo2(){
    	switchWhyInd("whyInd_2");
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
    

    	$image1 = $("#whyInd_1");
    	$image2 = $("#whyInd_2");
    	
    
    	
    	if(radioId == "whyInd_1"){
    		$radio1.prop("checked", true);
    		$radio2.prop("checked", false);
    		
    	
    		$image1.addClass("mySetting-radio-on").removeClass("mySetting-radio-off");
    		$image2.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		$('.lot').css('display','none');
    		$('.stand').css('display','block');
    		if($('#currType').val()!=1){
    			clearStand();
    			
    			$(".err-field").css('display','none');
    			if($( "#lotType" ).hasClass( "error-border" )){
    				$( "#lotType" ).removeClass( "error-border" );
    			}
    			if($( "#lotNo" ).hasClass( "error-border" )){
    				$( "#lotNo" ).removeClass( "error-border" );
    			}
    			
    		}
    		$('#currType').val('1');
    	
    	} 
    	
    	if(radioId == "whyInd_2"){
    		$radio1.prop("checked", false);
    		$radio2.prop("checked", true);
    		
    	
    		$image1.addClass("mySetting-radio-off").removeClass("mySetting-radio-on");
    		$image2.addClass("mySetting-radio-on").removeClass("mySetting-radio-off");
    	
    		$('.lot').css('display','block');
    		$('.stand').css('display','none');
    		if($('#currType').val()!=2){
    			clearLot();
    			$(".err-field").css('display','none');
    			
    			if($( "#regionDropDownID" ).hasClass( "error-border" )){
    				$( "#regionDropDownID" ).removeClass( "error-border" );
    			}
    			
    			if($( "#districtDropDownID" ).hasClass( "error-border" )){
    				$( "#districtDropDownID" ).removeClass( "error-border" );
    			}
    			
    			if($( "#village" ).hasClass( "error-border" )){
    				$( "#village" ).removeClass( "error-border" );
    			}
    		}
    		$('#currType').val('2');
    	
    	}
    	
    	
    	
    
    }
    
    
    function upDateDropDown(e){
    	if(e.status=="begin"){showLoading();}
    		if (e.status == 'complete') {
    			hideLoading();
    			
    			if($("#region").val()=="HK"){
    				//regionHK = $("#returnDistResult").val();
    				regionHK = '[{"label":"CENTRAL \u0026 WESTERN DISTRICT","value":"CW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;ADMIRALTY","value":"ADM"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;CENTRAL","value":"CEN"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;KENNEDY TOWN","value":"KET"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;MID-LEVELS","value":"MIL"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;SAI YING PUN","value":"SYP"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;SHEK TONG TSUI","value":"STT"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;SHEUNG WAN","value":"SHW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;THE PEAK","value":"THP"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;WEST POINT ","value":"WP"}]';
    				$("#returnDistResult").val(regionHK);
    			}else if($("#region").val()=="KLN"){
					//regionKLN = $("#returnDistResult").val();
					regionKLN ='[{"label":"KOWLOON CITY DISTRICT","value":"KLC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;HO MAN TIN","value":"HMT"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;HUNG HOM","value":"HUH"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;KAI TAK ","value":"KTK"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;KOWLOON CITY","value":"KOC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;KOWLOON TONG","value":"KOT"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;MA TAU CHUNG ","value":"MTC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;MA TAU WAI","value":"MTW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;TO KWA WAN","value":"TKW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;WHAMPOA ","value":"WPA"}]';
					$("#returnDistResult").val(regionKLN);
				}else if($("#region").val()=="NT"){
					//regionNT = $("#returnDistResult").val();
					regionNT = '[{"label":"ISLANDS DISTRICT","value":"ILD"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;CHEK LAP KOK LANTAU ISLAND","value":"CLK"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;CHEUNG CHAU","value":"CHC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;CHEUNG SHA LANTAU ISLAND","value":"CHS"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;CHI MA WAN LANTAU ISLAND","value":"CMW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;DISCOVERY BAY LANTAU ISLAND","value":"DIB"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;DISNEYLAND ","value":"DL"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;DISNEYLAND RESORT ","value":"DLR"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;HEI LING CHAU","value":"HLC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;LAMMA ISLAND","value":"LIS"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;LANTAU ISLAND","value":"LAI"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;MUI WO LANTAU ISLAND","value":"MUW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;NGONG PING LANTAU ISLAND","value":"NGP"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;PENG CHAU","value":"PEC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;PO TOI ISLAND ","value":"PTI"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;SHA LO WAN ","value":"SLW"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;SHEK KWU CHAU ","value":"SKC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;SHEK PIK LANTAU ISLAND","value":"SHP"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;TAI O LANTAU ISLAND","value":"TAO"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;TONG FUK LANTAU ISLAND","value":"TOF"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;TUNG CHUNG LANTAU ISLAND","value":"TUC"},{"label":"\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;TUNG PENG CHAU ","value":"TPC"}]';
					$("#returnDistResult").val(regionNT);
				}
    			createDistrict();
    		}	
    }
    
    function createDistrict(){
    	var loc = new Object(); 
		loc= jQuery.parseJSON($("#returnDistResult").val());
		
		$("#district").empty();
		$("#district").append("<option value=\"\"> "+pls_select+"</option>");
		
		if(loc!=null){
		for(var j=0;j<loc.length;j++){
			if($("#currDist").val()==loc[j].value){
				$("#district").append("<option selected='selected' value=\""+loc[j].value+"\"> "+loc[j].label+"</option>");	
				$("#districtDisplayTxt").text($.trim($("#district option:selected").text()));
			}else{
				$("#district").append("<option value=\""+loc[j].value+"\"> "+loc[j].label+"</option>");	
			}
				
			
			}
		}
		$("#returnDistResult").val('');
    }
    
    function street_ajax(e){
    		if (e.status == 'success') {
    			street_position=0;
    			var street = new Object(); 
    			street= jQuery.parseJSON($("#street_result").val());
    			$("#street_ajax_table").empty();
    			if(street!=null){
    		
	    			for(var j=0;j<street.length;j++){
	    				if(street.length-1 != j){
	    					$("#street_ajax_table").append("<div class='tr-row'><div class='td'>"+street[j]+"</div></div>");	
	    				}else{
	    					$("#street_ajax_table").append("<div class='tr-row'><div class='td end'>"+street[j]+"</div></div>");	
	    				}
	    			}
    			}
    			if(street!=null&&street.length!=0){
    				$('#street_ajax_table').css('display','block');
    				street_length=street.length+1;
    			}else{
    				$('#street_ajax_table').css('display','none');
    			}
    			
    			$('#street_ajax_table .tr-row').click(
    					function(){
    						$('#village').val($(this).text());
    						$('#street_ajax_table').css('display','none');
    						}
    					);
    			
    			
    			$("#street_result").val('');
    		
    	
    		}
			
    		
    }
    
    
    function building_ajax(e){
    		if (e.status == 'success') {
    			building_position=0;
    			var building = new Object(); 
    			building= jQuery.parseJSON($("#building_result").val());
    			$("#building_ajax_table").empty();
    			if(building!=null){
    		
	    			for(var j=0;j<building.length;j++){
	    				if(building.length-1 != j){
	    					$("#building_ajax_table").append("<div class='tr-row'><div class='td'>"+building[j]+"</div></div>");	
	    				}else{
	    					$("#building_ajax_table").append("<div class='tr-row'><div class='td end'>"+building[j]+"</div></div>");	
	    				}
	    			}
    			}
    			if(building!=null&&building.length!=0){
    				$('#building_ajax_table').css('display','block');
    				building_length=building.length+1;
    			}else{
    				$('#building_ajax_table').css('display','none');
    			}
    			
    			$('#building_ajax_table .tr-row').click(
    					function(){
    						$('#building').val($(this).text());
    						$('#building_ajax_table').css('display','none');
    						}
    					);
    			
    			
    			$("#building_result").val('');
    		
    	
    		}
			
    		
    }
    
    
    function estate_ajax(e){
    		if (e.status == 'success') {
    			estate_position=0;
    			var estate = new Object(); 
    			estate= jQuery.parseJSON($("#estate_result").val());
    			$("#estate_ajax_table").empty();
    			if(estate!=null){
    		
	    			for(var j=0;j<estate.length;j++){
	    				if(estate.length-1 != j){
	    					$("#estate_ajax_table").append("<div class='tr-row'><div class='td'>"+estate[j]+"</div></div>");	
	    				}else{
	    					$("#estate_ajax_table").append("<div class='tr-row'><div class='td end'>"+estate[j]+"</div></div>");	
	    				}
	    				
	    			}
    			}
    			if(estate!=null&&estate.length!=0){
    				$('#estate_ajax_table').css('display','block');
    				estate_length=estate.length+1;
    			}else{
    				$('#estate_ajax_table').css('display','none');
    			}
    			
    			$('#estate_ajax_table .tr-row').click(
    					function(){
    						$('#estate').val($(this).text());
    						$('#estate_ajax_table').css('display','none');
    						}
    					);
    			
    			
    			$("#estate_result").val('');
    		
    	
    		}
			
    		
    }
    
    
    
    function clearLot(){
    	
    	
    	
    	$('.lot input[type=text]').each(
    			function() {
    				$(this).val('');
    				if($(this).hasClass( "error-border" )){    					
    					$(this).removeClass( "error-border" );
    				}
    			}
    			);
    }
    
    function clearStand(){
    	
    	$('.stand input[type=text]').each(
    			function() {
    				if($(this).hasClass( "error-border" )){    					
    					$(this).removeClass( "error-border" );
    				}
    				
    				
    				
    			}
    		);
    	
    	$('.stand .editAddressDropDownContainer').each(
    		function(){
    			if($(this).hasClass( "error-color" )){    					
					$(this).removeClass( "error-color" );
				}
    		}	
    	);
    	
    	var unitFirst =$("#unit option:first").val();
    	var blockFirst =$("#block option:first").val();
    	
    	$("#region option:selected").attr("selected",false);
    	$("#district option:selected").attr("selected",false);
    	$("#unit option:selected").attr("selected",false);
    	$("#block option:selected").attr("selected",false);
    	    	
    	$('.ui-body-g:input[type=text]').each(function() {$(this).val('');});
    	$('.speacail_ui_body:input[type=text]').each(function() {$(this).val('');});
    	$('#region').find('option[value="0"]').attr('selected',true).change();
    	$('#district').find('option[value="0"]').attr('selected',true).change();
    	$('#block').find('option[value="'+blockFirst+'"]').attr('selected',true).change();
    	$('#unit').find('option[value="'+unitFirst+'"]').attr('selected',true).change();
    }
    
    function reloadBack(){
    	if(block_other!=null&&block_other!=''){
    		$('#block').find('option[value="'+list_last+'"]').prop('selected',true).change();
    	}else if($('#block').find('option[value="'+list_last+'"]').prop("selected")=='selected')
    	{
    		$('#block').find('option[value="'+list_last+'"]').prop('selected',true).change();
    	}
    	
    	if(unit_other!=null&&unit_other!=''){
    		$('#unit').find('option[value="'+list_last+'"]').prop('selected',true).change();
    	}else if($('#unit').find('option[value="'+list_last+'"]').prop("selected")=='selected')
    	{
    		$('#unit').find('option[value="'+list_last+'"]').prop('selected',true).change();
    	}
    }
  //]]> 	