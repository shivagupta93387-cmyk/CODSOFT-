function apply() {
    alert("Application submitted successfully!");
}

function searchJobs() {
    let input = document.getElementById("search").value.toLowerCase();
    let jobs = document.getElementsByClassName("job");

    for (let i = 0; i < jobs.length; i++) {
        let title = jobs[i].innerText.toLowerCase();
        jobs[i].style.display = title.includes(input) ? "" : "none";
    }
}
