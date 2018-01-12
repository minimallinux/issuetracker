//Fetch submitted issues or the status of localStorage
function fetchIssues() {
     "use strict";       
var i = 0;
var issues = JSON.parse(localStorage.getItem("issues"));
var issueList = document.querySelector('#issueList');

    issueList.innerHTML = " ";

if(issues !== null) {
    for(i = 0; i < issues.length; i++) {
    var id = issues[i].id,
        desc = issues[i].description,
        severity = issues[i].severity,
        assignedTo = issues[i].assignedTo,
        status = issues[i].status;
        
        issueList.innerHTML += "<div class='well'>" +
                        "<h6>Issue ID: " + id + "</h6>" +
                        "<p><span class='Label label-info'>" + status + "</span></p>" +
                        "<h4>" + desc + "</h4>" +
                        "<p><span class='icon icon-clock'></span> " + severity + "</p>" +
                        "<p><span class='icon icon-user'></span> " + assignedTo + "</p>" +
                        "<a href='#' onclick='setStatusClosed("+ id +")' class='button button-outline'>Close</a>" +
                        "<a href='#' onclick='deleteIssue(" + id + ")' class='button'>Delete</a>" +
                        "</div>";
}
console.log(issues);
} else {
issueList.innerHTML = "<h6 class='text-center'>There are no issues at present</h6>";    
}
}
window.onload = fetchIssues();

//Save a submitted issue
function saveIssue(e) {
    "use strict";
 var issueDesc = document.querySelector("#issueDescInput").value,
    issueSeverity = document.querySelector("#issueSeverityInput").value,
    issueAssignedTo = document.querySelector("#issueAssignedToInput").value,
    issueStatus = "Open",
    issueId = chance.guid(),
    issues = [],
    issue = {
	id: issueId,
	description: issueDesc,
	severity: issueSeverity,
	assignedTo: issueAssignedTo,
	status: issueStatus
};
//Check if entry already there
if(localStorage.getItem("issues") === null) {
//Push the issue object to issues array
issues.push(issue);
//Set the new issues array as a converted JSON object to localStorage
localStorage.setItem("issues", JSON.stringify(issues));
} else {
//Request the issues object and convert to array
issues = JSON.parse(localStorage.getItem("issues"));
//Push new object to issues array
issues.push(issue);
//Set the new issues array as a converted JSON object to localStorage
localStorage.setItem("issues", JSON.stringify(issues));
}
//Reset submit element
document.querySelector("#issueInputForm").reset();
//Run fetchIssue to reflect the new item
fetchIssues();
//Stop default submit
e.preventDefault();
}
//Submit event for the saveIssue function
document.querySelector("#issueInputForm").addEventListener("submit", saveIssue);

//Set the issue status to closed
function setStatusClosed(id) {
var i;
var issues = JSON.parse(localStorage.getItem("issues"));
for(i = 0; i < issues.length; i++) {
    if(issues[i].id == id) {
        issues.status = "Closed";
    }
}
localStorage.setItem("issues", JSON.stringify(issues));
fetchIssues();
}