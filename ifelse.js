function checkGrade() {
        let score = prompt("Enter your score (0-100):");

    score = Number(score);
    
    
    if (score === 0 || score > 0) {
                if (score < 0 || score > 100) {
            alert("Your score must be between 0 and 100");
            return;
        }
    } else {
        alert("Please type a number only");
        return;
    }
    
    let grade;
    if (score >= 90) {
        grade = "A - Excellent!";
    } else if (score >= 80) {
        grade = "B - Very Good!";
    } else if (score >= 70) {
        grade = "C - Good";
    } else if (score >= 60) {
        grade = "D - Pass";
    } else {
        grade = "F - Fail";
    }
     alert("Your grade is: " + grade);
}
