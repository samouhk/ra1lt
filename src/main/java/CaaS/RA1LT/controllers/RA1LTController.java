package CaaS.RA1LT.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class RA1LTController {
	String respId = "";
	String respName = "";
	String respPhone = "";
	String respAddressTitle = " ";
	String respAddress1 = "";
	String respAddress2 = "";
	String respAddress3 = "";
	String respAddress4 = "";
	String respAddress5 = "";
	
	String responseData = "";
	String newId = "";
	
	@GetMapping("/")
	public String RA1LTHome(@RequestParam(name="clientName", required=false, defaultValue="") String name,
            		        @RequestParam(name="clientPhone", required=false, defaultValue="") String phoneNo,
                            @RequestParam(name="whyIndHidden", required=false, defaultValue="1") String whyIndHidden,
 			                Model model) {
		
		/*
		 * System.out.println(name); System.out.println(phoneNo);
		 * System.out.println(whyIndHidden);
		 */
		
		model.addAttribute("name", name);
		model.addAttribute("phoneNo", phoneNo);
		model.addAttribute("whyIndHidden", whyIndHidden);
				
		String url = "index";
		if (!whyIndHidden.isEmpty() && !name.isEmpty() && !phoneNo.isEmpty()) {
			if (whyIndHidden.equals("1")) {
				url = "editAddressResident";
			} else if (whyIndHidden.equals("2")) {
				url = "editAddressResidential";
			} else if (whyIndHidden.equals("3")) {
				url = "postBox";
			}
		}
		return url;
	}
	
	@GetMapping("/addressLookup")
	public String AddressLookup(@RequestParam(name="searchName", required=false, defaultValue="") String searchName,
			                    Model model) {
		
		System.out.println("Search by: " + searchName);
		
		if (searchName.length() > 0) {
			try {
				MyGETRequest("http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/personalinfosearchbyid?Id=" + searchName);
				
				if (responseData.length() < 10) {
					respId = " ";
					respName = " ";
					respPhone = " ";
					respAddressTitle = " ";
					respAddress1 = " ";
					respAddress2 = " ";
					respAddress3 = " ";
					respAddress4 = " ";
					respAddress5 = " ";

					responseData = "";
				} else {
				
				JSONConverter(responseData); 

				model.addAttribute("respId", respId);
				model.addAttribute("respName", respName);
				model.addAttribute("respPhone", respPhone);
				model.addAttribute("addressTitle", respAddressTitle);
				model.addAttribute("respAddress1", respAddress1);
				model.addAttribute("respAddress2", respAddress2);
				model.addAttribute("respAddress3", respAddress3);
				model.addAttribute("respAddress4", respAddress4);
				model.addAttribute("respAddress5", respAddress5);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
				respId = " ";
				respName = " ";
				respPhone = " ";
				respAddressTitle = " ";
				respAddress1 = " ";
				respAddress2 = " ";
				respAddress3 = " ";
				respAddress4 = " ";
				respAddress5 = " ";

				responseData = "";				
		}
		return "addressLookup";
	}
	
	public void JSONConverter(String jsonRequest) { 
		try {
			  JSONParser parser = new JSONParser();
			  JSONArray jsonArray = (JSONArray) parser.parse(jsonRequest);
			  JSONObject json = (JSONObject) jsonArray.get(0);

			  respId = "Reference Id: " + (String) json.get("Id");
			  respName = "Name: " + (String) json.get("Name");
			  respPhone = "Phone: " + (String) json.get("PhoneNo");
			  
			  respAddress3 = "";
			  respAddress4 = "";
			  respAddress5 = "";
			  
			  if (!((String) json.get("Line1")).isEmpty()) {
				  respAddressTitle = "Outside Hong Kong";
				  respAddress1 = (String) json.get("Line1");
				  respAddress2 = (String) json.get("Line2");
				  respAddress3 = (String) json.get("Line3");
				  respAddress4 = "";
				  respAddress5 = "";
			  } else if (!((String) json.get("PORegion")).isEmpty()) {
				  respAddressTitle = "P.O. Box";
				  respAddress1 = (String) json.get("PORegion");
				  respAddress2 = (String) json.get("POName");
				  respAddress3 = (String) json.get("POBoxNo");
				  respAddress4 = "";
				  respAddress5 = "";
			  } else if (!((String) json.get("Lot1")).isEmpty()) {
				  respAddressTitle = "Address in Hong Kong";
				  respAddress1 = (String) json.get("Lot1");
				  respAddress2 = (String) json.get("Lot2");
				  respAddress3 = (String) json.get("Lot3");
				  respAddress4 = "";
				  respAddress5 = "";
			  } else {
				  respAddressTitle = "Address in Hong Kong";
				  respAddress1 = (String) json.get("Unit") + " ";
				  respAddress1 += (String) json.get("UnitDescription") + ", ";
				  respAddress1 += (String) json.get("Floor") + "/F";
				  respAddress2 = (String) json.get("Block") + " ";
				  respAddress2 += (String) json.get("BlockDescription");
				  respAddress3 = (String) json.get("EstateName") + " ";
				  respAddress3 += (String) json.get("Phase");
				  respAddress4 = (String) json.get("StreetOrHouseNo") + " ";
				  respAddress4 += (String) json.get("StreetOrVillegeName");
				  respAddress5 = (String) json.get("District") + ", ";
				  respAddress5 += (String) json.get("Region");
			  }
	  		} catch(Exception ex) {
	            ex.printStackTrace();
	  		}
	}
 
	public void MyGETRequest(String url) throws IOException { 
		  URL urlForGetRequest = new URL(url); 
		  
		  String readLine = null;
		  HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
		  conection.setRequestMethod("GET");
		  //conection.setRequestProperty("userId", "a1bcdef"); // set userId its a sample here
		  int responseCode = conection.getResponseCode();

		  if (responseCode == HttpURLConnection.HTTP_OK) {
		        BufferedReader in = new BufferedReader(
		            new InputStreamReader(conection.getInputStream()));
		        StringBuffer response = new StringBuffer();
		        while ((readLine = in .readLine()) != null) {
		            response.append(readLine);
		        } in .close();
		        // print result
		        System.out.println("JSON String Result " + response.toString());
		        responseData = response.toString();
		        //GetAndPost.POSTRequest(response.toString());
		  } else {
		        System.out.println("GET NOT WORKED");
		        responseData = "";
		  }
	}
	
	@GetMapping("/editAddressResident")
	public String EditAddressResident(@RequestParam(name="name", required=false, defaultValue="") String name,
			                          @RequestParam(name="phoneNo", required=false, defaultValue="") String phoneNo,
			                          @RequestParam(name="whyIndHidden", required=false, defaultValue="") String whyIndHidden,
			                          @RequestParam(name="currReg", required=false, defaultValue="") String region,
			                          @RequestParam(name="currDist", required=false, defaultValue="") String district,
			                          @RequestParam(name="building", required=false, defaultValue="") String building,
			                          @RequestParam(name="estate", required=false, defaultValue="") String estate,
			                          @RequestParam(name="phase", required=false, defaultValue="") String phase,
			                          @RequestParam(name="village", required=false, defaultValue="") String village,
			                          @RequestParam(name="house_num", required=false, defaultValue="") String house_num,
			                          @RequestParam(name="block", required=false, defaultValue="") String block,
			                          @RequestParam(name="block_desc", required=false, defaultValue="") String block_desc,
			                          @RequestParam(name="floor", required=false, defaultValue="") String floor,
			                          @RequestParam(name="unit", required=false, defaultValue="") String unit,
			                          @RequestParam(name="unit_desc", required=false, defaultValue="") String unit_desc,
			                          
			                          @RequestParam(name="ddType", required=false, defaultValue="") String ddType,
			                          @RequestParam(name="ddNo", required=false, defaultValue="") String ddNo,
			                          @RequestParam(name="lotType", required=false, defaultValue="") String lotType,
			                          @RequestParam(name="lotNo", required=false, defaultValue="") String lotNo,
			                          @RequestParam(name="lotSec1", required=false, defaultValue="") String lotSec1,
			                          @RequestParam(name="lotSubSec1", required=false, defaultValue="") String lotSubSec1,
			                          @RequestParam(name="lotSec2", required=false, defaultValue="") String lotSec2,
			                          @RequestParam(name="lotSubSec2", required=false, defaultValue="") String lotSubSec2,
			                          @RequestParam(name="lotSec3", required=false, defaultValue="") String lotSec3,
			                          @RequestParam(name="lotSubSec3", required=false, defaultValue="") String lotSubSec3,
			                          @RequestParam(name="lotSec4", required=false, defaultValue="") String lotSec4,
			                          @RequestParam(name="lotEx", required=false, defaultValue="") String lotEx,
			                          Model model) throws IOException {
		
		model.addAttribute("name", name);
		model.addAttribute("phoneNo", phoneNo);
		model.addAttribute("whyIndHidden", whyIndHidden);
		model.addAttribute("currReg", region);
		model.addAttribute("currDist", district);
		model.addAttribute("building", building);
		model.addAttribute("estate", estate);
		model.addAttribute("phase", phase);
		model.addAttribute("village", village);
		model.addAttribute("house_num", house_num);
		model.addAttribute("block", block);
		model.addAttribute("block_desc", block_desc);
		model.addAttribute("floor", floor);
		model.addAttribute("unit", unit);
		model.addAttribute("unit_desc", unit_desc);
		
		model.addAttribute("ddType", ddType);
		model.addAttribute("ddNo", ddNo);
		model.addAttribute("lotType", lotType);
		model.addAttribute("lotNo", lotNo);
		model.addAttribute("lotSec1", lotSec1);
		model.addAttribute("lotSubSec1", lotSubSec1);
		model.addAttribute("lotSec2", lotSec2);
		model.addAttribute("lotSubSec2", lotSubSec2);
		model.addAttribute("lotSec3", lotSec3);
		model.addAttribute("lotSubSec3", lotSubSec3);
		model.addAttribute("lotSec4", lotSec4);
		model.addAttribute("lotEx", lotEx);
		
		String webpage = "/editAddressResident";
		if (!phoneNo.isEmpty()) {
			System.out.println("name=" + name);
			System.out.println("phoneNo=" + phoneNo);
			System.out.println("whyIndHidden=" + whyIndHidden);
			
			/*
			 * EditAddressResidentService(name, phoneNo, region, district, building, estate,
			 * phase, village, house_num, block, block_desc, floor, unit, unit_desc); if
			 * (responseData.equals("Success")) { webpage = "/index"; }
			 */
			webpage = "confirm";
		} else {
			webpage = "index";
		}
		return webpage;
	}
	
	public void EditAddressResidentService(String name, String phoneNo, String region, String district, String building, String estate, String phase, String village, 
			                               String house_num, String block, String block_desc, String floor, String unit, String unit_desc) throws IOException { 
		  String Id, Name, PhoneNo, Region, District, BuildingName, EstateName, Phase, StreetOrVillegeName, StreetOrHouseNo, Block, BlockDescription, Floor; 
		  String Unit, UnitDescription, Line1, Line2, Line3, POBoxNo, PORegion, POName, Lot1, Lot2, Lot3;
		
		  MyGETRequest("http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/getNewId");
		  
		  Id = "Id=" + responseData + "&"; 
		  Name = "Name=" + name + "&";
		  PhoneNo = "PhoneNo=" + phoneNo + "&";
		  Region = "Region=" + region + "&";
		  District = "District=" + district + "&";
		  BuildingName = "BuildingName=" + building + "&";
		  EstateName = "EstateName=" + estate + "&";
		  Phase = "Phase=" + phase + "&";
		  StreetOrVillegeName = "StreetOrVillegeName=" + village + "&";
		  StreetOrHouseNo = "StreetOrHouseNo=" + house_num + "&";
		  Block = "Block=" + block + "&";
		  BlockDescription = "BlockDescription=" + block_desc +"&";
		  Floor = "Floor=" + floor + "&";
		  Unit = "Unit=" + unit + "&";
		  UnitDescription = "UnitDescription=" + unit_desc + "&";
		  Line1 = "Line1=&";
		  Line2 = "Line2=&";
		  Line3 = "Line3=&";
		  POBoxNo = "POBoxNo=&";
		  PORegion = "PORegion=&";
		  POName = "POName=&";
		  Lot1 = "Lot1=&";
		  Lot2 = "Lot2=&";
		  Lot3 = "Lot3=";
		  
		  String requestString = "http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/personalInfoInsert?" + 
				                 Id + Name  + PhoneNo + Region + District + BuildingName + EstateName + Phase + StreetOrVillegeName + StreetOrHouseNo +
				                 Block + BlockDescription + Floor + Unit + UnitDescription + Line1 + Line2 + Line3 + POBoxNo + PORegion + POName + Lot1 + Lot2 + Lot3;
		  
		  requestString = requestString.replace(" ","+");
		  
		  URL urlForGetRequest = new URL(requestString);
		  
		  System.out.println(urlForGetRequest);
		  String readLine = null;
		  HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
		  conection.setRequestMethod("POST");
		  //conection.setRequestProperty("userId", "a1bcdef"); // set userId its a sample here
		  int responseCode = conection.getResponseCode();

		  if (responseCode == HttpURLConnection.HTTP_OK) {
		      BufferedReader in = new BufferedReader(
		          new InputStreamReader(conection.getInputStream()));
		      StringBuffer response = new StringBuffer();
		      while ((readLine = in .readLine()) != null) {
		          response.append(readLine);
		      } in .close();
		      // print result
		      System.out.println("JSON String Result " + response.toString());
		      responseData = response.toString();
		      //GetAndPost.POSTRequest(response.toString());
		  } else {
		      System.out.println("GET NOT WORKED");
		      responseData = "";
		  }
	}
	
	public void EditAddressResidentForLotService(String name, String phoneNo, String lot1, String lot2, String lot3) throws IOException { 
			String Id, Name, PhoneNo, Region, District, BuildingName, EstateName, Phase, StreetOrVillegeName, StreetOrHouseNo, Block, BlockDescription, Floor; 
			String Unit, UnitDescription, Line1, Line2, Line3, POBoxNo, PORegion, POName, Lot1, Lot2, Lot3;
			
			MyGETRequest("http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/getNewId");
			newId = responseData;
			
			Id = "Id=" + responseData + "&"; 
			Name = "Name=" + name + "&";
			PhoneNo = "PhoneNo=" + phoneNo + "&";
			Region = "Region=&";
			District = "District=&";
			BuildingName = "BuildingName=&";
			EstateName = "EstateName=&";
			Phase = "Phase=&";
			StreetOrVillegeName = "StreetOrVillegeName=&";
			StreetOrHouseNo = "StreetOrHouseNo=&";
			Block = "Block=&";
			BlockDescription = "BlockDescription=&";
			Floor = "Floor=&";
			Unit = "Unit=&";
			UnitDescription = "UnitDescription=&";
			Line1 = "Line1=&";
			Line2 = "Line2=&";
			Line3 = "Line3=&";
			POBoxNo = "POBoxNo=&";
			PORegion = "PORegion=&";
			POName = "POName=&";
			Lot1 = "Lot1=" + lot1 + "&";
			Lot2 = "Lot2=" + lot2 + "&";
			Lot3 = "Lot3=" + lot3;
			
			String requestString = "http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/personalInfoInsert?" + 
								   Id + Name  + PhoneNo + Region + District + BuildingName + EstateName + Phase + StreetOrVillegeName + StreetOrHouseNo +
								   Block + BlockDescription + Floor + Unit + UnitDescription + Line1 + Line2 + Line3 + POBoxNo + PORegion + POName + Lot1 + Lot2 + Lot3;
			
			requestString = requestString.replace(" ","+");
			
			URL urlForGetRequest = new URL(requestString);
			
			System.out.println(urlForGetRequest);
			String readLine = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
			conection.setRequestMethod("POST");
			//conection.setRequestProperty("userId", "a1bcdef"); // set userId its a sample here
			int responseCode = conection.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(
			new InputStreamReader(conection.getInputStream()));
			StringBuffer response = new StringBuffer();
			while ((readLine = in .readLine()) != null) {
			response.append(readLine);
			} in .close();
			// print result
			System.out.println("JSON String Result " + response.toString());
			responseData = response.toString();
			//GetAndPost.POSTRequest(response.toString());
			} else {
			System.out.println("GET NOT WORKED");
			responseData = "";
		}
	}
	
	@GetMapping("/editAddressResidential")
	public String EditAddressResidential(@RequestParam(name="name", required=false, defaultValue="") String name,
			                             @RequestParam(name="phoneNo", required=false, defaultValue="") String phoneNo,
			                             @RequestParam(name="whyIndHidden", required=false, defaultValue="") String whyIndHidden,
			                             @RequestParam(name="lineOne", required=false, defaultValue="") String line1,
			                             @RequestParam(name="lineTwo", required=false, defaultValue="") String line2,
			                             @RequestParam(name="lineThree", required=false, defaultValue="") String line3,
			                             Model model) throws IOException {
		model.addAttribute("name", name);
		model.addAttribute("phoneNo", phoneNo);
		model.addAttribute("whyIndHidden", whyIndHidden);
		model.addAttribute("line1", line1);
		model.addAttribute("line2", line2);
		model.addAttribute("line3", line3);
		
		String webpage = "/editAddressResidential";
		if (!phoneNo.isEmpty()) {
			/*
			 * EditAddressResidentialService(name, phoneNo, line1, line2, line3); if
			 * (responseData.equals("Success")) { webpage = "/index"; }
			 */
			webpage = "confirm";
		} else {
			webpage = "index";
		}
		return webpage;
	}
	
	public void EditAddressResidentialService(String name, String phoneNo, String line1, String line2, String line3) throws IOException { 
		  String Id, Name, PhoneNo, Region, District, BuildingName, EstateName, Phase, StreetOrVillegeName, StreetOrHouseNo, Block, BlockDescription, Floor; 
		  String Unit, UnitDescription, Line1, Line2, Line3, POBoxNo, PORegion, POName, Lot1, Lot2, Lot3;
		
		  MyGETRequest("http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/getNewId");
		  newId = responseData;
		  
		  Id = "Id=" + responseData + "&"; 
		  Name = "Name=" + name + "&";
		  PhoneNo = "PhoneNo=" + phoneNo + "&";
		  Region = "Region=&";
		  District = "District=&";
		  BuildingName = "BuildingName=&";
		  EstateName = "EstateName=&";
		  Phase = "Phase=&";
		  StreetOrVillegeName = "StreetOrVillegeName=&";
		  StreetOrHouseNo = "StreetOrHouseNo=&";
		  Block = "Block=&";
		  BlockDescription = "BlockDescription=&";
		  Floor = "Floor=&";
		  Unit = "Unit=&";
		  UnitDescription = "UnitDescription=&";
		  Line1 = "Line1=" + line1 + "&";
		  Line2 = "Line2=" + line2 + "&";
		  Line3 = "Line3=" + line3 + "&";
		  POBoxNo = "POBoxNo=&";
		  PORegion = "PORegion=&";
		  POName = "POName=&";
		  Lot1 = "Lot1=&";
		  Lot2 = "Lot2=&";
		  Lot3 = "Lot3=";
		  
		  String requestString = "http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/personalInfoInsert?" + 
				                 Id + Name  + PhoneNo + Line1 + Line2 + Line3 + Region + District + BuildingName + EstateName + Phase + StreetOrVillegeName + StreetOrHouseNo +
				                 Block + BlockDescription + Floor + Unit + UnitDescription + POBoxNo + PORegion + POName + Lot1 + Lot2 + Lot3;
				  
		  requestString = requestString.replace(" ","+");
		  
		  URL urlForGetRequest = new URL(requestString);
		  
		  System.out.println(urlForGetRequest);
		  String readLine = null;
		  HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
		  conection.setRequestMethod("POST");
		  //conection.setRequestProperty("userId", "a1bcdef"); // set userId its a sample here
		  int responseCode = conection.getResponseCode();

		  if (responseCode == HttpURLConnection.HTTP_OK) {
		      BufferedReader in = new BufferedReader(
		          new InputStreamReader(conection.getInputStream()));
		      StringBuffer response = new StringBuffer();
		      while ((readLine = in .readLine()) != null) {
		          response.append(readLine);
		      } in .close();
		      // print result
		      System.out.println("JSON String Result " + response.toString());
		      responseData = response.toString();
		      //GetAndPost.POSTRequest(response.toString());
		  } else {
		      System.out.println("GET NOT WORKED");
		      responseData = "";
		  }
	}
		
	@GetMapping("/postBox")
	public String PostBox(@RequestParam(name="name", required=false, defaultValue="") String name,
			              @RequestParam(name="phoneNo", required=false, defaultValue="") String phoneNo,
                          @RequestParam(name="whyIndHidden", required=false, defaultValue="") String whyIndHidden,
			              @RequestParam(name="currPOReg", required=false, defaultValue="") String po_region,
			              @RequestParam(name="currOffice", required=false, defaultValue="") String po_office,
			              @RequestParam(name="POBox", required=false, defaultValue="") String poBoxNo,
			              Model model) throws IOException {
		model.addAttribute("name", name);
		model.addAttribute("phoneNo", phoneNo);
		model.addAttribute("whyIndHidden", whyIndHidden);
		model.addAttribute("currPOReg", po_region);
		model.addAttribute("currOffice", po_office);
		model.addAttribute("POBox", poBoxNo);
		
		String webpage = "/postBox";
		if (!phoneNo.isEmpty()) {
			/*
			 * PostBoxService(name, phoneNo, po_region, po_office, poBoxNo); if
			 * (responseData.equals("Success")) { webpage = "/index"; }
			 */
			webpage = "confirm";
		} else {
			webpage = "index";
		}
		return webpage;
	}
	
	public void PostBoxService(String name, String phoneNo, String po_region, String po_office, String poBoxNo) throws IOException { 
		  String Id, Name, PhoneNo, Region, District, BuildingName, EstateName, Phase, StreetOrVillegeName, StreetOrHouseNo, Block, BlockDescription, Floor; 
		  String Unit, UnitDescription, Line1, Line2, Line3, POBoxNo, PORegion, POName, Lot1, Lot2, Lot3;
		
		  
		  System.out.println(name);
		  System.out.println(phoneNo);
		  System.out.println(po_region);
		  System.out.println(po_office);
		  System.out.println(poBoxNo);
		  
		  MyGETRequest("http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/getNewId");
		  newId = responseData;
		  
		  Id = "Id=" + responseData + "&"; 
		  Name = "Name=" + name + "&";
		  PhoneNo = "PhoneNo=" + phoneNo + "&";
		  Region = "Region=&";
		  District = "District=&";
		  BuildingName = "BuildingName=&";
		  EstateName = "EstateName=&";
		  Phase = "Phase=&";
		  StreetOrVillegeName = "StreetOrVillegeName=&";
		  StreetOrHouseNo = "StreetOrHouseNo=&";
		  Block = "Block=&";
		  BlockDescription = "BlockDescription=&";
		  Floor = "Floor=&";
		  Unit = "Unit=&";
		  UnitDescription = "UnitDescription=&";
		  Line1 = "Line1=&";
		  Line2 = "Line2=&";
		  Line3 = "Line3=&";
		  POBoxNo = "POBoxNo=" + poBoxNo + "&";
		  PORegion = "PORegion=" + po_region + "&";
		  POName = "POName=" + po_office + "&";
		  Lot1 = "Lot1=&";
		  Lot2 = "Lot2=&";
		  Lot3 = "Lot3=&";
		  
		  String requestString = "http://ra1service-t1cp-tg00100000-ns.apps.t11.caas.gcisdctr.hksarg/personalInfoInsert?" + 
				                 Id + Name  + PhoneNo + Line1 + Line2 + Line3 + Region + District + BuildingName + EstateName + Phase + StreetOrVillegeName + StreetOrHouseNo +
				                 Block + BlockDescription + Floor + Unit + UnitDescription + POBoxNo + PORegion + POName + Lot1 + Lot2 + Lot3;
		  
		  requestString = requestString.replace(" ","+");

		  URL urlForGetRequest = new URL(requestString);
		  System.out.println(urlForGetRequest);
		  String readLine = null;
		  HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
		  conection.setRequestMethod("POST");
		  //conection.setRequestProperty("userId", "a1bcdef"); // set userId its a sample here
		  int responseCode = conection.getResponseCode();

		  if (responseCode == HttpURLConnection.HTTP_OK) {
		      BufferedReader in = new BufferedReader(
		          new InputStreamReader(conection.getInputStream()));
		      StringBuffer response = new StringBuffer();
		      while ((readLine = in .readLine()) != null) {
		          response.append(readLine);
		      } in .close();
		      // print result
		      System.out.println("JSON String Result " + response.toString());
		      responseData = response.toString();
		      //GetAndPost.POSTRequest(response.toString());
		  } else {
		      System.out.println("GET NOT WORKED");
		      responseData = "";
		  }
	}

	@GetMapping("/confirm")
	public String Confirm(@RequestParam(name="name", required=false, defaultValue="") String name,
			              @RequestParam(name="phoneNo", required=false, defaultValue="") String phoneNo,
                          @RequestParam(name="currReg", required=false, defaultValue="") String region,
                          @RequestParam(name="currDist", required=false, defaultValue="") String district,
                          @RequestParam(name="building", required=false, defaultValue="") String building,
                          @RequestParam(name="estate", required=false, defaultValue="") String estate,
                          @RequestParam(name="phase", required=false, defaultValue="") String phase,
                          @RequestParam(name="village", required=false, defaultValue="") String village,
                          @RequestParam(name="house_num", required=false, defaultValue="") String house_num,
                          @RequestParam(name="block", required=false, defaultValue="") String block,
                          @RequestParam(name="block_desc", required=false, defaultValue="") String block_desc,
                          @RequestParam(name="floor", required=false, defaultValue="") String floor,
                          @RequestParam(name="unit", required=false, defaultValue="") String unit,
                          @RequestParam(name="unit_desc", required=false, defaultValue="") String unit_desc,			              
			              @RequestParam(name="line1", required=false, defaultValue="") String line1,
			              @RequestParam(name="line2", required=false, defaultValue="") String line2,
			              @RequestParam(name="line3", required=false, defaultValue="") String line3,
			              @RequestParam(name="currPOReg", required=false, defaultValue="") String po_region,
			              @RequestParam(name="currOffice", required=false, defaultValue="") String po_office,
			              @RequestParam(name="POBox", required=false, defaultValue="") String poBoxNo,
			              @RequestParam(name="whyIndHidden", required=false, defaultValue="") String whyIndHidden,
                          @RequestParam(name="ddType", required=false, defaultValue="") String ddType,
                          @RequestParam(name="ddNo", required=false, defaultValue="") String ddNo,
                          @RequestParam(name="lotType", required=false, defaultValue="") String lotType,
                          @RequestParam(name="lotNo", required=false, defaultValue="") String lotNo,
                          @RequestParam(name="lotSec1", required=false, defaultValue="") String lotSec1,
                          @RequestParam(name="lotSubSec1", required=false, defaultValue="") String lotSubSec1,
                          @RequestParam(name="lotSec2", required=false, defaultValue="") String lotSec2,
                          @RequestParam(name="lotSubSec2", required=false, defaultValue="") String lotSubSec2,
                          @RequestParam(name="lotSec3", required=false, defaultValue="") String lotSec3,
                          @RequestParam(name="lotSubSec3", required=false, defaultValue="") String lotSubSec3,
                          @RequestParam(name="lotSec4", required=false, defaultValue="") String lotSec4,
                          @RequestParam(name="lotEx", required=false, defaultValue="") String lotEx,
			              Model model) throws IOException {
		model.addAttribute("name", name);
		model.addAttribute("phoneNo", phoneNo);
		model.addAttribute("currReg", region);
		model.addAttribute("currDist", district);
		model.addAttribute("building", building);
		model.addAttribute("estate", estate);
		model.addAttribute("phase", phase);
		model.addAttribute("village", village);
		model.addAttribute("house_num", house_num);
		model.addAttribute("block", block);
		model.addAttribute("block_desc", block_desc);
		model.addAttribute("floor", floor);
		model.addAttribute("unit", unit);
		model.addAttribute("unit_desc", unit_desc);
		model.addAttribute("line1", line1);
		model.addAttribute("line2", line2);
		model.addAttribute("line3", line3);
		model.addAttribute("currPOReg", po_region);
		model.addAttribute("currOffice", po_office);
		model.addAttribute("POBox", poBoxNo);
		model.addAttribute("whyIndHidden", whyIndHidden);
		model.addAttribute("ddType", ddType);
		model.addAttribute("ddNo", ddNo);
		model.addAttribute("lotType", lotType);
		model.addAttribute("lotNo", lotNo);
		model.addAttribute("lotSec1", lotSec1);
		model.addAttribute("lotSubSec1", lotSubSec1);
		model.addAttribute("lotSec2", lotSec2);
		model.addAttribute("lotSubSec2", lotSubSec2);
		model.addAttribute("lotSec3", lotSec3);
		model.addAttribute("lotSubSec3", lotSubSec3);
		model.addAttribute("lotSec4", lotSec4);
		model.addAttribute("lotEx", lotEx);		

		String Lot1 = ddType + " " + ddNo + " " + lotType + " " + lotNo + " " + lotEx + " " + lotSec1 + " as " + lotSubSec1;
		String Lot2 = lotEx + " " + lotSec2 + " as " + lotSubSec2 + " " + lotEx + " " + lotSec3 + " as " + lotSubSec3 + " " + lotEx + " " + lotSec4;
		String Lot3 = "AND THE FIRST EXTENSION THERETO";

		String webpage = "confirm";
		
		if (!phoneNo.isEmpty()) {
			if (whyIndHidden.equals("1,1")) {
				EditAddressResidentService(name, phoneNo, region, district, building, estate, phase, village, house_num, block, block_desc, floor, unit, unit_desc); 
				if (responseData.equals("Success")) {
					model.addAttribute("ackId", newId);		
					webpage = "acknowledgement";
				}
			} else if (whyIndHidden.equals("1,2")) {
				EditAddressResidentForLotService(name, phoneNo, Lot1, Lot2, Lot3); 
				if (responseData.equals("Success")) {
					model.addAttribute("ackId", newId);		
					webpage = "acknowledgement";
				}
			} else if (whyIndHidden.equals("2")) {
				EditAddressResidentialService(name, phoneNo, line1, line2, line3);
				if (responseData.equals("Success")) {
					model.addAttribute("ackId", newId);		
					webpage = "acknowledgement";
				}
			} else if (whyIndHidden.equals("3")) {
				PostBoxService(name, phoneNo, po_region, po_office, poBoxNo);
				if (responseData.equals("Success")) {
					model.addAttribute("ackId", newId);	
					webpage = "acknowledgement";
				}
			}
		} else {
			webpage = "index";
		}
		return webpage;
	}

	@GetMapping("/acknowledgement")
	public String Acknowledgement(@RequestParam(name="name", required=false, defaultValue="") String name,
			              		  @RequestParam(name="phoneNo", required=false, defaultValue="") String phoneNo,
			              		  @RequestParam(name="currReg", required=false, defaultValue="") String region,
			              		  @RequestParam(name="currDist", required=false, defaultValue="") String district,
			              		  @RequestParam(name="building", required=false, defaultValue="") String building,
			              		  @RequestParam(name="estate", required=false, defaultValue="") String estate,
			              		  @RequestParam(name="phase", required=false, defaultValue="") String phase,
			              		  @RequestParam(name="village", required=false, defaultValue="") String village,
			              		  @RequestParam(name="house_num", required=false, defaultValue="") String house_num,
			              		  @RequestParam(name="block", required=false, defaultValue="") String block,
			              		  @RequestParam(name="block_desc", required=false, defaultValue="") String block_desc,
			              		  @RequestParam(name="floor", required=false, defaultValue="") String floor,
			              		  @RequestParam(name="unit", required=false, defaultValue="") String unit,
			              		  @RequestParam(name="unit_desc", required=false, defaultValue="") String unit_desc,			              
			              		  @RequestParam(name="line1", required=false, defaultValue="") String line1,
			              		  @RequestParam(name="line2", required=false, defaultValue="") String line2,
			              		  @RequestParam(name="line3", required=false, defaultValue="") String line3,
			              		  @RequestParam(name="currPOReg", required=false, defaultValue="") String po_region,
			              		  @RequestParam(name="currOffice", required=false, defaultValue="") String po_office,
			              		  @RequestParam(name="POBox", required=false, defaultValue="") String poBoxNo,
			              		  @RequestParam(name="whyIndHidden", required=false, defaultValue="") String whyIndHidden,
			              		  @RequestParam(name="ddType", required=false, defaultValue="") String ddType,
			              		  @RequestParam(name="ddNo", required=false, defaultValue="") String ddNo,
			              		  @RequestParam(name="lotType", required=false, defaultValue="") String lotType,
			              		  @RequestParam(name="lotNo", required=false, defaultValue="") String lotNo,
			              		  @RequestParam(name="lotSec1", required=false, defaultValue="") String lotSec1,
			              		  @RequestParam(name="lotSubSec1", required=false, defaultValue="") String lotSubSec1,
			              		  @RequestParam(name="lotSec2", required=false, defaultValue="") String lotSec2,
			              		  @RequestParam(name="lotSubSec2", required=false, defaultValue="") String lotSubSec2,
			              		  @RequestParam(name="lotSec3", required=false, defaultValue="") String lotSec3,
			              		  @RequestParam(name="lotSubSec3", required=false, defaultValue="") String lotSubSec3,
			              		  @RequestParam(name="lotSec4", required=false, defaultValue="") String lotSec4,
			              		  @RequestParam(name="lotEx", required=false, defaultValue="") String lotEx,
			              		  @RequestParam(name="ackId", required=false, defaultValue="") String ackId,
			              Model model) throws IOException {
		model.addAttribute("name", name);
		model.addAttribute("phoneNo", phoneNo);
		model.addAttribute("currReg", region);
		model.addAttribute("currDist", district);
		model.addAttribute("building", building);
		model.addAttribute("estate", estate);
		model.addAttribute("phase", phase);
		model.addAttribute("village", village);
		model.addAttribute("house_num", house_num);
		model.addAttribute("block", block);
		model.addAttribute("block_desc", block_desc);
		model.addAttribute("floor", floor);
		model.addAttribute("unit", unit);
		model.addAttribute("unit_desc", unit_desc);
		model.addAttribute("line1", line1);
		model.addAttribute("line2", line2);
		model.addAttribute("line3", line3);
		model.addAttribute("currPOReg", po_region);
		model.addAttribute("currOffice", po_office);
		model.addAttribute("POBox", poBoxNo);
		model.addAttribute("whyIndHidden", whyIndHidden);
		model.addAttribute("ddType", ddType);
		model.addAttribute("ddNo", ddNo);
		model.addAttribute("lotType", lotType);
		model.addAttribute("lotNo", lotNo);
		model.addAttribute("lotSec1", lotSec1);
		model.addAttribute("lotSubSec1", lotSubSec1);
		model.addAttribute("lotSec2", lotSec2);
		model.addAttribute("lotSubSec2", lotSubSec2);
		model.addAttribute("lotSec3", lotSec3);
		model.addAttribute("lotSubSec3", lotSubSec3);
		model.addAttribute("lotSec4", lotSec4);
		model.addAttribute("lotEx", lotEx);	
		model.addAttribute("ackId", ackId);

		return "acknowledgement";
	}
}


