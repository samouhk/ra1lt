 		$(document).ready(function(){
			var getType = document.getElementById('whyIndHidden').value;
			var structureAddress1 = "";
			var structureAddress2 = "";
			var structureAddress3 = "";
			var structureAddress4 = "";
			var structureAddress5 = "";
			var lineBreak = '\n';
			var spaceChar = " ";
			var commaChar = ", ";
			var floorChar = "/F"
			
			if (getType == "1,1") {
				structureAddress1 = document.getElementById('unit').value + spaceChar + 
				                    				document.getElementById('unit_desc').value + commaChar + 
				                    				document.getElementById('floor').value + floorChar + lineBreak;
				structureAddress2 = document.getElementById('block').value + spaceChar + 
				                    				document.getElementById('block_desc').value + commaChar + 
				                    				document.getElementById('building').value + lineBreak;
				structureAddress3 = document.getElementById('estate').value + spaceChar +
                                    				document.getElementById('phase').value + lineBreak;
				structureAddress4 = document.getElementById('village').value + spaceChar + 
                									document.getElementById('house_num').value + lineBreak;
				structureAddress5 = document.getElementById('currDist').value + commaChar + 
													document.getElementById('currReg').value;
				
				document.getElementById('addressTitle').textContent = "Address in Hong Kong";
				document.getElementById('structuredAddress').textContent = structureAddress1 + structureAddress2  + structureAddress3 + structureAddress4 + structureAddress5;
			} else if (getType == "1,2") {
				structureAddress1 = document.getElementById('ddType').value + " " +  
						                            document.getElementById('ddNo').value + " " + 
						                            document.getElementById('lotType').value + " " + 
						                            document.getElementById('lotNo').value + " " + 
						                            document.getElementById('lotEx').value + " " + 
						                            document.getElementById('lotSec1').value + " as " + 
						                            document.getElementById('lotSubSec1').value + lineBreak;
				structureAddress2 = document.getElementById('lotEx').value + " " + 
				                       				document.getElementById('lotSec2').value + " as " + 
				                       				document.getElementById('lotSubSec2').value + " " + 
				                       				document.getElementById('lotEx').value + " " + 
				                       				document.getElementById('lotSec3').value + " as " + 
				                       				document.getElementById('lotSubSec3').value + " " + 
				                       				document.getElementById('lotEx').value + " " + 
				                       				document.getElementById('lotSec4').value + lineBreak;
				structureAddress3 = "AND THE FIRST EXTENSION THERETO";

				document.getElementById('addressTitle').textContent = "Address in Hong Kong";
				document.getElementById('structuredAddress').textContent = structureAddress1 + structureAddress2  +structureAddress3;			
			} else if (getType == "2") {
				structureAddress1 = document.getElementById('line1').value + lineBreak;
				structureAddress2 = document.getElementById('line2').value + lineBreak;
				structureAddress3 = document.getElementById('line3').value;
				
				document.getElementById('addressTitle').textContent = "Address outside Hong Kong";
				document.getElementById('structuredAddress').textContent = structureAddress1 + structureAddress2  + structureAddress3;
			} else {
				structureAddress1 = document.getElementById('currPOReg').value + lineBreak;
				structureAddress2 = document.getElementById('currOffice').value + lineBreak;
				structureAddress3 = document.getElementById('POBox').value;
				
				document.getElementById('addressTitle').textContent = "P.O. Box";
				document.getElementById('structuredAddress').textContent = structureAddress1 + structureAddress2  + structureAddress3;
			}
		})