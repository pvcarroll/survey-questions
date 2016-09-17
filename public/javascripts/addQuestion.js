function addAnswer(element) {
    const newAnswer = document.createElement("div");
    newAnswer.className = "answer";
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "answer text";
    answerInput.className = "answerInput";
    newAnswer.appendChild(answerInput);
    element.parentElement.insertBefore(newAnswer, element);
}

module.exports = {
    addAnswer
};