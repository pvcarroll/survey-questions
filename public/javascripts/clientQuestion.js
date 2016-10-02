function addAnswerChoice(element) {
    const newAnswer = document.createElement('div');
    newAnswer.className = 'answer';
    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.name = 'answerChoice';
    answerInput.placeholder = 'answer text';
    answerInput.className = 'answerInput';
    newAnswer.appendChild(answerInput);
    element.parentElement.insertBefore(newAnswer, element);
}

function addQuestion() {
    const questionForm = document.forms['add-question'];
    questionForm.submit();
}

module.exports = {
    addAnswer,
    addQuestion
};