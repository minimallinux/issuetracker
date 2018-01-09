/*jslint browser:true */
document.querySelector("#issueInputForm").addEventListener("submit", saveIssue);
function saveIssue(e) {
    "use strict";        
var issueDesc = document.querySelector("#issueDescInput").value,
    issueSeverity = document.querySelector("#issueSeverityInput").value,
    issueAssignedTo = document.querySelector("#issueAssignedToInput").value,
    chance = new Chance(Math.random),
    issueId = chance.guid(),
    issueStatus = "Open",
    issues = [],
    issue = {
	id: issueId,
	description: issueDesc,
	severity: issueSeverity,
	assignedTo: issueAssignedTo,
	status: issueStatus
};
if(localStorage.getItem("issues") === null) {
issues.push(issue);
localStorage.setItem("issues", JSON.stringify(issues));
console.log("No issues");
} else {
issues = JSON.parse(localStorage.getItem("issues"));
issues.push(issue);
localStorage.setItem("issues", JSON.stringify(issues));
}
document.querySelector("#issueInputForm").reset();
fetchIssues();
e.preventDefault();
}
function fetchIssues() {
     "use strict";       
var i,
    issueList = document.querySelector("#issueList").innerHTML = '',
    issueAssignedTo = document.querySelector("#issueAssignedToInput").value,
    assignedTo = issueAssignedTo,
    issues = JSON.parse(localStorage.getItem("issues")),	
    issuesListed = document.querySelector("#issueList");
    if(issues) {
    for(i = 0; i < issues.length; i++) {
    console.log(issues);
    var id = issues[i].id,
    desc = issues.description,
    severity = issues[i].severity,
    status = issues[i].status;
    issueList.innerHTML += "<div class='well'>" +
                        "<h6>Issue ID: " + id + "</h6>" +
                        "<p><span class='Label label-info'>" + status + "</span></p>" +
                        "<h3>" + desc + "</h3>" +
                        "<p><span class='glyphicon glyphicon-time'></span>" + severity + "</p>" +
                        "<p><span class='glyphicon glyphicon-user'></span>" + assignedTo + "</p>" +
                        "<a href='#' onclick='setStatusClosed(\'"+id+"\')' class='btn btn-warning'>Close</a>" +
                        "<a href='#' onclick='deleteIssue(\'"+id+"\')' class='btn btn-danger'>Delete</a>" +
                        "</div>";


}
} else {
     
console.log(issuesListed,"No Issues Listed");     
}
}