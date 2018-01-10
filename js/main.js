/*jslint browser:true */
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
                        "<h3>" + desc + "</h3>" +
                        "<p><span class='glyphicon glyphicon-time'></span>" + severity + "</p>" +
                        "<p><span class='glyphicon glyphicon-user'></span>" + assignedTo + "</p>" +
                        "<a href='#' onclick='setStatusClosed("+ id +")' class='btn btn-warning'>Close</a>" +
                        "<a href='#' onclick='deleteIssue(" + id + ")' class='btn btn-danger'>Delete</a>" +
                        "</div>";
}
console.log(issues);
} else {
issueList.innerHTML = "<h6 class='text-center'>There are no issues at present</h6>";    
}
}
function saveIssue(e) {
    "use strict";
var chance = new Chance();
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
document.querySelector("#issueInputForm").addEventListener("submit", saveIssue);
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