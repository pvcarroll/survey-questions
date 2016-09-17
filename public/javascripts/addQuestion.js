function addAnswer(element) {
    const newAnswer = document.createElement("div");
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "answer text";
    newAnswer.appendChild(answerInput);
    element.parentElement.insertBefore(newAnswer, element);
}

module.exports = {
    addAnswer
};