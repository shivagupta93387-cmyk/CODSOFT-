let score = 0;

function saveQuiz() {
    let quiz = {
        q: q.value,
        a: a.value,
        b: b.value,
        c: c.value,
        d: d.value,
        ans: ans.value.toUpperCase()
    };
    localStorage.setItem("quiz", JSON.stringify(quiz));
    alert("Quiz Saved!");
}

let quiz = JSON.parse(localStorage.getItem("quiz"));

if (quiz && document.getElementById("question")) {
    question.innerText = quiz.q;
    opA.innerText = "A. " + quiz.a;
    opB.innerText = "B. " + quiz.b;
    opC.innerText = "C. " + quiz.c;
    opD.innerText = "D. " + quiz.d;
}

function check(option) {
    if (option === quiz.ans) score++;
    localStorage.setItem("score", score);
    window.location = "result.html";
}
