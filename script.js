var candidates = [];

//Request Type , Leave Type VALIDATION 
//Request Type
function validateRequest() {//1
	let error = document.getElementById("requestError");
	if (document.getElementById("request").value == "") {
		error.innerHTML = "*Please select any";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//Leave Type
function validateLeave() {//2
	let error = document.getElementById("leaveError");
	if (document.getElementById("leave").value == "") {
		error.innerHTML = "*Please select any";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//From Date and To Date Validation

//From date validation
function validateFromDate() {//3
	//From date is not filled
	if (document.getElementById("fromdate").value == "") {
		document.getElementById("fromdateError").innerHTML = "*From date is required";
		return false;
	}
	//From date both From date and To Date is filled
	else if (document.getElementById("todate").value != "") {
		let fromdate = strToDate(document.getElementById("fromdate").value);
		let todate = strToDate(document.getElementById("todate").value);

		//Comparison between dates to validate
		if (todate < fromdate) {
			document.getElementById("fromdateError").innerHTML =
				"*From date must be less than the To date";
		} else {
			document.getElementById("fromdateError").innerHTML = "";
			return true;
		}
	}
	// Input is valid
	else {
		document.getElementById("fromdateError").innerHTML = "";
		return true;
	}
};

//to date validation
function validateTodate() {//4
	//To date not filled
	if (document.getElementById("todate").value == "") {
		document.getElementById("todateError").innerHTML = "*To date is required";
		return false;
	}
	//From date and To date Filled
	else if (document.getElementById("fromdate").value != "") {
		let fromdate = strToDate(document.getElementById("fromdate").value);
		let todate = strToDate(document.getElementById("todate").value);

		//Comparison between dates to validate
		if (todate < fromdate) {
			document.getElementById("todateError").innerHTML =
				"*To date must be greater than the From date";
		} else {
			document.getElementById("todateError").innerHTML = "";
			return true;
		}
	}
	//Input is Valid
	else {
		document.getElementById("todateError").innerHTML = "";
		return true;
	}
};

function strToDate(datestr) {
	let dateArray = datestr.split("-");
	return new Date(dateArray[0], dateArray[1], dateArray[2]);
};

//Working Days validation
function validateWorkingDays() {//5
	let message = document.getElementById("WorkingDays");
	let error = document.getElementById("WorkingDaysError");
	if (message.value == "") {
		error.innerHTML = "*Working Days is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//HoliDays validation
function validateHolidaysDays() {//6
	let message = document.getElementById("Holidays");
	let error = document.getElementById("HolidaysError");
	if (message.value == "") {
		error.innerHTML = "*Holidays / Weekends is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//mobile number
function validateNumber() {//7
	let message = document.getElementById("mobileNumber");
	var regex = "/^[0-9]{10}$/";
    if (message.value != "") {// Required Field Validation
        if (message.value.length == 10 && message.value != regex) { // RegEx Validation    
            document.getElementById("mobileNumberError").innerHTML = "";
            return true;
        } else {
            document.getElementById("mobileNumberError").innerHTML =
                "*Mobile Number must be in 10 Digits";
            return false;
        }
    }
    else{
        document.getElementById("mobileNumberError").innerHTML = "*Mobile Number  is required";
        return false;
    }
};


//Manager validation
function validateManager() {//8
	let message = document.getElementById("manager");
	let error = document.getElementById("managerError");
	if (message.value == "") {
		error.innerHTML = "*Manager Name is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//Lead validation
function validateLead() {//9
	let message = document.getElementById("lead");
	let error = document.getElementById("leadError");
	if (message.value == "") {
		error.innerHTML = "*Lead Name is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//Check Box Validation
function validateCheckBox() {//10
	if (
		document.getElementById("calls").checked == true ||
		document.getElementById("email").checked == true ||
        document.getElementById("na").checked == true
	) {
		document.getElementById("availableError").innerHTML = "";
		return true;
	} else {
		document.getElementById("availableError").innerHTML =
			"*Please select atleast one option";
		return false;
	}
};

//Department Work validation
function validateDepartmentWork() {//11
	let message = document.getElementById("DepartmentWork");
	let error = document.getElementById("DepartmentWorkError");
	if (message.value == "") {
		error.innerHTML = "*Department Work is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//Responsible Person validation
function validateResponsible() {//12
	let message = document.getElementById("Responsible");
	let error = document.getElementById("ResponsibleError");
	if (message.value == "") {
		error.innerHTML = "*Responsible Person Name is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//Reason For Leave validation
function validateReasonForLeave() {//13
	let message = document.getElementById("ReasonForLeave");
	let error = document.getElementById("ReasonForLeaveError");
	if (message.value == "") {
		error.innerHTML = "*Reason for Leave is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

//validating all fields to show error messages during submit
function validateForm() {
	var errorCount = 0;
    if (!validateRequest()) {//1
		errorCount++;
	}
    if (!validateLeave()) {//2
		errorCount++;
	}
    if (!validateFromDate()) {//3
		errorCount++;
	}
    if (!validateTodate()) {//4
		errorCount++;
	}
	if (!validateWorkingDays()) {//5
		errorCount++;
	}
	if (!validateHolidaysDays()) {//6
		errorCount++;
	}	
	if (!validateNumber()) {//7
		errorCount++;
	}
	if (!validateManager()) {//8
		errorCount++;
	}
    if (!validateLead()) {//9
		errorCount++;
	}
    if (!validateCheckBox()) {//10
		errorCount++;
	}
    if (!validateDepartmentWork()) {//11
		errorCount++;
	}
	if (!validateResponsible()) {//12 
		errorCount++;
	}
    if (!validateReasonForLeave()) {//13  
		errorCount++;
	}
    
	if (errorCount > 0) { //check if errorCount is greater than 0
		return false;
	}
	return true;
}

//-------------------------------------------------------Validation End----------------------------------------------------------

//Submit action for Update and Save operation
//Function to read the candidate information from the form and return the candidate as Json object
function readCandidateInfo() {
	let request = document.getElementById("request").value;
	let leave = document.getElementById("leave").value;
	let fromdate = document.getElementById("fromdate").value;
	let todate = document.getElementById("todate").value;

    let WorkingDays = document.getElementById("WorkingDays").value;
    let HoliDays = document.getElementById("Holidays").value;
	let mobileNumber = document.getElementById("mobileNumber").value;
	let manager = document.getElementById("manager").value;
	let lead = document.getElementById("lead").value;
    let gender = "";

	let DepartmentWork = document.getElementById("DepartmentWork").value;
	let Responsible = document.getElementById("Responsible").value;
	let ReasonForLeave = document.getElementById("ReasonForLeave").value;

	let genderElements = document.getElementsByName("type");

	//Iterating through the checkboxes to find which one is checked
	for (var i = 0; i < genderElements.length; i++) {
		if (genderElements[i].checked) {
			gender = genderElements[i].nextElementSibling.innerText;
		}
	}

	// Structure the JSON data
	var candidateInfo = {
		Id: candidates.length + 1,
		request:request,
		leave:leave,
		fromdate:fromdate,
        todate:todate,
        WorkingDays:WorkingDays,
        HoliDays:HoliDays,
        mobileNumber:mobileNumber,
        manager:manager,
        lead:lead,
		gender:gender,
		DepartmentWork:DepartmentWork,
        Responsible:Responsible,
		ReasonForLeave:ReasonForLeave
	};

	return candidateInfo;
};

//Function that manages entry into the Global var
function storeCandidateInfo() {
	candidates.push(readCandidateInfo());
}


//Form the Table structure based on the Json data
function generateGrid() {

    //Clear the table body before forming the table structure
    document.getElementById("tableBody").innerText = "";

    for (var i = 0; i < candidates.length; i++) {
        // Create the dynamic tr,td and append every td in tr and tr in tbody
        let trow = document.createElement("tr");
        trow.className = "color";
        let id = document.createElement("td");
        id.className = "table";
        let request = document.createElement("td");
        request.className = "table";
        let leave = document.createElement("td");
        leave.className = "table";
        let fromdate = document.createElement("td");
        fromdate.className = "table";
        let todate = document.createElement("td");
        todate.className = "table";
        let WorkingDays = document.createElement("td");
        WorkingDays.className = "table";
        let Holidays = document.createElement("td");
        Holidays.className = "table";
        let mobileNumber = document.createElement("td");
        mobileNumber.className = "table";
        let manager = document.createElement("td");
        manager.className = "table";
        let lead = document.createElement("td");
        lead.className = "table";
        let gender = document.createElement("td");
        gender.className = "table";
        let DepartmentWork = document.createElement("td");
        DepartmentWork.className = "table";
        let Responsible = document.createElement("td");
        Responsible.className = "table";
        let ReasonForLeave = document.createElement("td");
        ReasonForLeave.className = "table";
        let edit = document.createElement("td")
        edit.className = "table";
        let deleteData = document.createElement("td")
        edit.className = "table";

        // append the values in each resp. field in resp. cell
        id.innerHTML = `<a  onclick='viewForm(this)'>${candidates[i].Id}</a>`;
        request.innerHTML = candidates[i].request;
        leave.innerHTML = candidates[i].leave;
        fromdate.innerHTML = candidates[i].fromdate;
        todate.innerHTML = candidates[i].todate;
        WorkingDays.innerHTML = candidates[i].WorkingDays;
        Holidays.innerHTML = candidates[i].HoliDays;
        mobileNumber.innerHTML = candidates[i].mobileNumber;
        manager.innerHTML = candidates[i].manager;
        lead.innerHTML = candidates[i].lead;
        gender.innerHTML = candidates[i].gender;
        DepartmentWork.innerHTML = candidates[i].DepartmentWork;
        Responsible.innerHTML = candidates[i].Responsible;
        ReasonForLeave.innerHTML = candidates[i].ReasonForLeave;
        edit.innerHTML = "<a  onclick='editForm(this)'>Edit</a>";
        deleteData.innerHTML = "<a  onclick='deleteCandidate(this)'>Delete</a>";

        trow.appendChild(id);
        trow.appendChild(request);
        trow.appendChild(leave);
        trow.appendChild(fromdate);
        trow.appendChild(todate);
        trow.appendChild(WorkingDays);
        trow.appendChild(Holidays);
        trow.appendChild(mobileNumber);
        trow.appendChild(manager);
        trow.appendChild(lead);
        trow.appendChild(gender);
        trow.appendChild(Responsible);
        trow.appendChild(edit);
        trow.appendChild(deleteData);

        //appending a table row in table body
        document.getElementById("tableBody").appendChild(trow);
    }

}
//show form
function showForm() {
    document.getElementById("formToGrid").style.display = "block";
    document.getElementById("gridToForm").style.display = "none";
}

// show table
function showGrid() {
    document.getElementById("formToGrid").style.display = "none";
    document.getElementById("gridToForm").style.display = "block";
}

//clearing all fields
function clearForm() {
	document.getElementById("request").value = "";
	document.getElementById("leave").value = "";
	document.getElementById("fromdate").value = "";
	document.getElementById("todate").value = "";
	document.getElementById("WorkingDays").value = "";
	document.getElementById("Holidays").value = "";
	document.getElementById("mobileNumber").value = "";
	document.getElementById("manager").value = "";
	document.getElementById("lead").value = "";

	document.getElementById("calls").checked = false;
	document.getElementById("email").checked = false;
	document.getElementById("na").checked = false;
	document.getElementById("DepartmentWork").value = "";
	document.getElementById("Responsible").value = "";
	document.getElementById("ReasonForLeave").value = "select";

	//clearing error messages
	document.getElementById("requestError").innerHTML = "";
	document.getElementById("leaveError").innerHTML = "";
	document.getElementById("fromdateError").innerHTML = "";
	document.getElementById("todateError").innerHTML = "";
	document.getElementById("WorkingDaysError").innerHTML = "";
	document.getElementById("HolidaysError").innerHTML = "";
	document.getElementById("mobileNumberError").innerHTML = "";
	document.getElementById("managerError").innerHTML = "";
	document.getElementById("leadError").innerHTML = "";
	document.getElementById("availableError").innerHTML = "";
	document.getElementById("DepartmentWorkError").innerHTML = "";
	document.getElementById("ResponsibleError").innerHTML = "";
	document.getElementById("ReasonForLeaveError").innerHTML = "";

}

//Prepare the form for adding a new customer
function addCandidate() {
	clearForm(); // to clear the form
	document.getElementById("submitbtn").innerHTML = "Submit";
	showForm(); // to show the form to user

}

//Handling the Edit action from Grid
function editForm(obj) {
	var edit = obj.closest("tr");
	candidateId = parseInt(edit.cells[0].innerText);
	let candidate = findCandidate(candidateId);
	prefillForm(candidate);
	document.getElementById("submitbtn").innerHTML = "Update";
	showForm(); //form is displayed
}

//Find candidate based on the id
function findCandidate(candidateId) {
	return candidates.find((candidate) => candidate.Id == candidateId);
}

//Preparing the form for edit operation
function prefillForm(candidateInfo) {
	document.getElementById("request").value = candidateInfo.request;
	document.getElementById("leave").value = candidateInfo.leave;
	document.getElementById("fromdate").value = candidateInfo.fromdate;
	document.getElementById("todate").value = candidateInfo.todate;
	document.getElementById("WorkingDays").value = candidateInfo.WorkingDays;
	document.getElementById("Holidays").value = candidateInfo.Holidays;
    document.getElementById("mobileNumber").value = candidateInfo.mobileNumber;
    document.getElementById("manager").value = candidateInfo.manager;
    document.getElementById("lead").value = candidateInfo.lead;

	switch (candidateInfo.gender.toLowerCase()) {
		case "calls":
			document.getElementById("calls").checked = true;
			break;
		case "email":
			document.getElementById("email").checked = true;
			break;
        case "na":
            document.getElementById("na").checked = true;
            break;
	}

	
	document.getElementById("DepartmentWork").value = candidateInfo.DepartmentWork;
	document.getElementById("Responsible").value = candidateInfo.Responsible;
	document.getElementById("ReasonForLeave").value = candidateInfo.ReasonForLeave;
}

//deleting the candidate data
function deleteCandidate(candidateobj) {
    var deleterow = candidateobj.closest("tr");//Finding the CandidateId
    let delcandidateId = parseInt(deleterow.cells[0].innerText);
    if (confirm("Are you sure you want to delete this Candidate?")) {
        let candidateindex = candidates.findIndex(candidate => candidate.Id == delcandidateId);
        candidates.splice(candidateindex, 1);// Removing the reord
        candidates.forEach((candidate, index) => {
            candidate.Id = index + 1;//Displaying the rest of the Record
        });
    }
    generateGrid();//Forming the Grid
}

//Submit action for Update and Save operation
function submitForm() {
    
	if (validateForm()) {
		//Update action
		if (
			document.getElementById("submitbtn").innerHTML.toLocaleLowerCase() ==
			"update"
		) {
			let candidateinfo = readCandidateInfo();
			let candidateindex = candidates.findIndex(
				(candidate) => candidate.Id == candidateId
			);

			candidates[candidateindex].request = candidateinfo.request;
			candidates[candidateindex].leave = candidateinfo.leave;
			candidates[candidateindex].fromdate = candidateinfo.fromdate;
			candidates[candidateindex].todate = candidateinfo.todate;
			candidates[candidateindex].WorkingDays = candidateinfo.WorkingDays;
			candidates[candidateindex].HoliDays = candidateinfo.HoliDays;
			candidates[candidateindex].mobileNumber = candidateinfo.mobileNumber;
			candidates[candidateindex].manager = candidateinfo.manager;
			candidates[candidateindex].lead = candidateinfo.lead;
			candidates[candidateindex].gender = candidateinfo.gender;
			candidates[candidateindex].dob = candidateinfo.dob;
			candidates[candidateindex].DepartmentWork = candidateinfo.DepartmentWork;
            candidates[candidateindex].Responsible = candidateinfo.Responsible;
			candidates[candidateindex].ReasonForLeave = candidateinfo.ReasonForLeave;
		}
		//Save action
		else {
			storeCandidateInfo();
		}
		generateGrid();
		clearForm();
		showGrid();
	}
}