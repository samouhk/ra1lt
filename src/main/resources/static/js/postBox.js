$(document).ready(function(){
	
	$("#currOffice").val("0");
	$("#po_region").val("0");
	
	if($("#currPOReg").val()!='' ){
		$("#po_region_ajax").click();
	}
	
	$('#po_region, #po_office').keyup(
			  function(event){
			   if(event.which==40||event.which==38){
				   $(this).change();
				   }
			  }
			);
	
	$(document).on("change", "#po_region", function(event){  
		
			//$("#currOffice").val('');
		    $("#currOffice").val($("#po_region").val());
			$("#po_regionDisplayTxt").text($(this).children("option:selected").text());
			
			//$("#currPOReg").val($("#po_region").val());
			var selectedPoRegion = document.getElementById("po_region").options[document.getElementById("po_region").selectedIndex].text; 
			$("#currPOReg").val(selectedPoRegion);
			
			$("#po_office").empty();
			$("#po_office").append("<option value=\"0\"> "+pls_select+"</option>");
			$("#po_officeDisplayTxt").text(pls_select);
			if($(this).val()!=0){
				if(typeof poBoxList[$("#po_region").val()] !="undefined"){
					$("#returnOfficeResult").val(poBoxList[$("#po_region").val()]);
					createOfficList();
					return;
				}
				$("#po_region_ajax").click();
			}else{
				$("#currPOReg").val('');
			}
	
    });
	    	    	
	$("#po_regionDisplayTxt").text($("#po_region option:selected").text());
	
	$(document).on("change", "#po_office", function(event){  
		$("#po_officeDisplayTxt").text($(this).children("option:selected").text());
		
		//$("#currOffice").val($("#po_office").val());
		var selectedPoOffice = document.getElementById("po_office").options[document.getElementById("po_office").selectedIndex].text; 
		$("#currOffice").val(selectedPoOffice.trim());
    });
	    	    	
	$("#po_officeDisplayTxt").text($("#po_office option:selected").text());
	
	$(document).on("focus","#po_region,#po_office",function(){
		$(this).parent().addClass("focusBorder");
	});
	$(document).on("focusout","#po_region,#po_office",function(){
		$(this).parent().removeClass("focusBorder");
	});
		
	
    });

function upDateDropDown(e){
	if(e.status=="begin"){showLoading();}
		if (e.status == 'complete') {
			hideLoading();
			poBoxList[$("#po_region").val()]=$("#returnOfficeResult").val();
			createOfficList();
			}	
	
}

function createOfficList(){
	var office = new Object(); 
	//office= jQuery.parseJSON($("#returnOfficeResult").val());
	office= jQuery.parseJSON('[{"label":"SHEUNG WAN POST OFFICE","value":"1"}, {"label":"KINGS ROAD POST OFFICE","value":"1"}, {"label":"CHEUNG CHAU POST OFFICE","value":"2"}]');
	
	$("#po_office").empty();
	$("#po_office").append("<option value=\"0\"> "+pls_select+"</option>");
	
	if(office!=null){
	for(var j=0;j<office.length;j++){
		
		if($("#currOffice").val()==office[j].value){
			$("#po_office").append("<option selected='selected' value=\""+office[j].value+"\"> "+office[j].label+"</option>");	
			$("#po_officeDisplayTxt").text($("#po_office option:selected").text());
		}
	//	}else{
//			$("#po_office").append("<option value=\""+office[j].value+"\"> "+office[j].label+"</option>");	
//		}
		
		}
	}
	$("#returnOfficeResult").val('');
}