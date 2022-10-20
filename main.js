const submitButton = document.querySelector('#submit');
const quesContent  = document.querySelector('.questions');
const resultPara   = document.querySelector('#result');

// this is just a test comment2

const q_data = [
	{
		title: 'Is tomato a fruit?',
		inputType: 'radio',

		options: ['Yes', 'No'],
		answer: 0,
	},

	{
		title: 'How many tomatos can a human consume?',
		inputType: 'checkbox',
		multiCorrect: false,

		options: ['1', '3', '8', '10', '19'],
		answer: [3, 4],
	},

	{
		title: 'How much bread do you need to consume?',
		inputType: 'checkbox',
		multiCorrect: false,

		options: ['1', '3', '8', '10', '19'],
		answer: [3, 4],
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
q_data.forEach((data, qIndex) => {
	let question_html = '';

	// options
	data.options.forEach((oName, oIndex) => {
		let optionId = 'o' + qIndex + '_' + oIndex
		question_html += `
		<input type="${data.inputType}" name="${qIndex}" id="${optionId}">
		<label for="${optionId}">${oName}</label>`
	})

	inner_html += `
		<li id="q${qIndex}">
			<h4>${data.title}</h4>
			<div class="options">
				${question_html}
			</div>
		</li>
	`;
})
quesContent.innerHTML = inner_html;

submitButton.addEventListener('click', () => {
	let score = 0;

	q_data.forEach((question, qIndex) => {
		const li = quesContent.children[qIndex];
		li.className = '';

		let options = document.querySelectorAll(`#q${qIndex} input`); 
		options = Array.from(options);

		const isCorrect = EvaluateAnswer[question.inputType](options, question);
		li.classList.add(isCorrect && 'correct' || 'wrong');

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