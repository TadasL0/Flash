var num1, num2, num3, correctAnswer, aiTimer, currentStreak = 0, longestStreak = 0;
var operations = ['+', '-', '*', '/', '**'];

function generateProblem() {
    num1 = Math.floor(Math.random() * 1000);
    num2 = Math.floor(Math.random() * 1000);
    num3 = Math.floor(Math.random() * 1000);
    var operation1 = operations[Math.floor(Math.random() * operations.length)];
    var operation2 = operations[Math.floor(Math.random() * operations.length)];

    if (operation1 === "**") {
        num2 = Math.floor(Math.random() * 10); // for power operations, limit the second number to 10
        correctAnswer = Math.pow(num1, num2);
        if(operation2 === "**"){
            num3 = Math.floor(Math.random() * 10); // for power operations, limit the third number to 10
            correctAnswer = Math.pow(correctAnswer, num3);
        } else {
            correctAnswer = eval(correctAnswer.toString() + operation2 + num3);
        }
    } else if (operation2 === "**"){
        num3 = Math.floor(Math.random() * 10); // for power operations, limit the third number to 10
        correctAnswer = Math.pow(num2, num3);
        correctAnswer = eval(num1.toString() + operation1 + correctAnswer.toString());
    } else {
        correctAnswer = eval(num1.toString() + operation1 + num2.toString() + operation2 + num3.toString());
    }

    correctAnswer = Math.round(correctAnswer);
    document.getElementById("problem").innerText = `${num1} ${operation1} ${num2} ${operation2} ${num3} = ?`;
    document.getElementById("result").innerText = "";
    document.getElementById("answer").value = "";
    document.getElementById("correctAnswer").innerText = "";  // Clear the correct answer field

    // Clear any previous AI timer
    clearTimeout(aiTimer);

    // Reset the owl image
    document.getElementById("owl").src = "owl_thinking.png";

    // Enable the input field and the Check Answer button
    document.getElementById("answer").disabled = false;
    document.getElementById("checkAnswerButton").disabled = false;

    // Set a new AI timer
    aiTimer = setTimeout(aiAnswer, Math.random() * 5000 + 5000);  // AI will answer in 5-10 seconds
}

function checkAnswer() {
    var userAnswer = document.getElementById("answer").value;
    if (userAnswer == correctAnswer) {
        document.getElementById("result").innerText = "Correct!";
        currentStreak++;
        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }
        clearTimeout(aiTimer);  // Cancel the AI timer if the user answered correctly
    } else {
        document.getElementById("result").innerText = "Incorrect. The correct answer is " + correctAnswer;
        currentStreak = 0;
    }
    updateLeaderboard();
}

function aiAnswer() {
    document.getElementById("result").innerText = "AI answered correctly first!";
    document.getElementById("correctAnswer").innerText = "The correct answer is " + correctAnswer; // Display the correct answer
    document.getElementById("owl").src = "owl_answered.png";

    // Disable the input field and the Check Answer button
    document.getElementById("answer").disabled = true;
    document.getElementById("checkAnswerButton").disabled = true;

    // Reset streaks
    currentStreak = 0;
    updateLeaderboard();
}

function updateLeaderboard() {
    document.getElementById("currentStreak").innerText = "Current Streak: " + currentStreak;
    document.getElementById("longestStreak").innerText = "Longest Streak: " + longestStreak;
}
