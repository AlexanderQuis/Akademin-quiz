const quesContent  = document.querySelector('.questions');
const resultPara   = document.querySelector('#result');
const submitButton = document.querySelector('#submit');

const q_data = [
	{
		title: 'Which of these languages are the 3 main buildings blocks for creating a website?',
		inputType: 'checkbox',

		options: ['HTML', 'SASS', 'Javascript', 'MySQL', 'PHP', 'JQuery', 'CSS'],
		answer: [1, 2, 6],
	},

	{
		title: 'Is HTML a programming language?',
		inputType: 'radio',

		options: ['Yes', 'No'],
		answer: 1,
	},

	{
		title: 'What role does HTML play on a website?',
		inputType: 'checkbox',

		options: ['To apply styling of the elements', 'Defining the structure of the page', 'Neither of the options'],
		answer: [1],
	},

	{
		title: 'Is there any difference between defining variables using "var" or "let"?',
		inputType: 'checkbox',

		options: ['Yes "Let" doesn\'t allow the variable to be reassigned', 'No, no they\'re the same', 'Neither of the options'],
		answer: [2],
	},

	{
		title: 'Can you assign variables in CSS?',
		inputType: 'radio',

		options: ['Yes', 'No'],
		answer: 0,
	},

	{
		title: 'JS behavior: Select correct output for the coding snippet:<br><br>8 + "1"',
		inputType: 'radio',

		options: ['"81"', '9', 'NaN', 'Undefined'],
		answer: 0,
	},
	{
		title: 'JS behavior: Select correct output for the coding snippet:<br><br>85 - "5"',
		inputType: 'radio',

		options: ['"8"', '80', 'NaN', 'Undefined'],
		answer: 1,
	},

	{
		title: 'Which property is used to remove the underline from a hyperlink?<br><br><a style="text-decoration: underline; cursor: pointer;">Example hyperlink</a>',
		inputType: 'checkbox',

		displayAsOwnRow: true,
		options: ['text-decoration: none;', 'color: black;', 'display: none;', 'cursor: default;'],
		answer: [0],
	},

	{
		title: 'Which of the following functions can be used to get a element in Javascript?',
		inputType: 'checkbox',

		displayAsOwnRow: true,
		options: ['getElementFromId()', 'getElementById()', 'getElementsByClass()', 'getElementsByClassName()', 'querySelector()', 'querySelectorAll()', 'firstElementChild()'],
		answer: [1, 3, 4, 5],
	},

	{
		title: 'Is tomato a fruit?',
		inputType: 'radio',

		options: ['Yes', 'No'],
		answer: 0,
	},
];

const EvaluateAnswer = {
	radio: function(children, question) {
		let isCorrect = true;

		for (let i = 0; i < children.length; i++) {
			const element = children[i]

			if (question.answer === i && !element.checked) {
				isCorrect = false;
				break;
			}
		}
		
		console.log('Evaluating radio! ' + isCorrect);
		return isCorrect;
	},

	checkbox: function(children, question) {
		let isCorrect = true;
		let answerID = 0;

		for (let i = 0; i < children.length; i++) {
			const element = children[i];

			const isTargetIndex = i === question.answer[answerID];
			const isChecked = element.checked;

			if (isTargetIndex && !isChecked || (!isTargetIndex && isChecked)) {
				isCorrect = false;
				break;
			}

			if (isTargetIndex && answerID + 1 < question.answer.length) {
				answerID++;
			}			
		}
		
		console.log('Evaluating checkbox! ' + isCorrect);
		return isCorrect;
	}
}

const ResultText = [
	{
		text: 'You\'ve unfortunatenly failed the test. Consider preparing yourself next time!',
		color: '#a00',
		ratio: 0.5,
	},

	{
		text: 'Congratulations, you got over half the questions right. That means you\'ve passed the test!',
		color: '#aa0',
		ratio: 0.75,
	},

	{
		text: 'You passed the test with a score thats over 75%. Not many users are able to achieve this feat!',
		color: '#0a0',
		ratio: 1.1,
	},
];

let inner_html = '';
q_data.forEach((data, qIndex) => { // Generate questions
	let question_html = '';

	// options
	data.options.forEach((oName, oIndex) => {
		let optionId = 'o' + qIndex + '_' + oIndex
		question_html += `
		<input type="${data.inputType}" name="${qIndex}" id="${optionId}">
		<label for="${optionId}">${oName}</label>` + (data.displayAsOwnRow && '<br>'|| '');
	})

	inner_html += `
		<li id="q${qIndex}">
			<h4><span class="ques_index">${qIndex + 1}.</span> ${data.title}</h4>
			<div class="options">
				${question_html}
			</div>
		</li>
	`;
})
quesContent.innerHTML = inner_html;

submitButton.addEventListener('click', () => { // Show answer result
	let score = 0;

	q_data.forEach((question, qIndex) => {
		const li = quesContent.children[qIndex];
		li.className = '';

		let options = document.querySelectorAll(`#q${qIndex} input`); 
		options = Array.from(options);

		const isCorrect = EvaluateAnswer[question.inputType](options, question);
		li.classList.add(isCorrect && 'correct' || 'wrong');
		li.classList.add('solved')

		if (isCorrect) {
			score++;
		}
		console.log(options);
	});

	const myRatio = score / q_data.length
	for (let i = 0; i < ResultText.length; i++) {
		const resultData = ResultText[i];

		if (myRatio < resultData.ratio) {
			const percentage = Math.floor(myRatio * 100)
			resultPara.innerText = '(' + percentage + '%) ' + resultData.text;
			resultPara.style.color = resultData.color;

			break;
		}
	}	
})

console.log(submitButton);