// PathBridge – script.js
// Quiz logic is now embedded in quiz.html and result.html.
// This file is retained for legacy compatibility.

function generateAdvancedResult() {
    let userData = {
        interest:    document.getElementById("interest")?.value    || "tech",
        environment: document.getElementById("environment")?.value || "office",
        risk:        document.getElementById("risk")?.value        || "stable",
        study:       document.getElementById("study")?.value       || "3-4",
        govt:        document.getElementById("govt")?.value        || "no"
    };
    localStorage.setItem("careerData", JSON.stringify(userData));
    window.location.href = "result.html";
}