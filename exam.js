document.getElementById('fileInput').addEventListener('change', handleFileUpload);

let examData = null;

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            examData = JSON.parse(e.target.result);
            displayExam(examData);
        };
        reader.readAsText(file);
    }
}

function displayExam(data) {
    const examContent = document.getElementById('examContent');
    examContent.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Year:</strong> ${data.year}</p>
        <p><strong>Author:</strong> ${data.author}</p>
    `; //Show the main header

    data.sections.forEach((section, sectionIndex) => { //For every section of the exam
        //Section header
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        sectionDiv.innerHTML = `
            <h3>${section.name}</h3>
            <p>${section.instructions}</p>
        `;

        section.questions.forEach((question, questionIndex) => { //For each question
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            question.content.forEach((item, itemIndex) => { //Load the question contents
                switch (item.type)
                {
                    case "text": //Text Section
                        questionDiv.innerHTML += `<p>${item.text}</p>`;
                        break;
                    case "response": //Answer Response Section
                        const responseDiv = document.createElement('div');
                        responseDiv.className = 'response';
                        switch (item.format) {
                            case "m": //Multiple Choice answer
                                item.choices.forEach((choice, choiceIndex) => {
                                    responseDiv.innerHTML += `
                                        <label>
                                            <input type="radio"
                                                    name="section-${sectionIndex}-question-${questionIndex}"
                                                    value="${choiceIndex + 1}">
                                            ${choice}
                                        </label><br>
                                    `;
                                })
                                break;
                            case "s": //Short Answer
                                responseDiv.innerHTML += `<input type="text" name="section-${sectionIndex}-question-${questionIndex}">`;
                                break;
                            case "x": //Extended Response
                                responseDiv.innerHTML += `<textarea name="section-${sectionIndex}-question-${questionIndex}">`;
                                break;
                            case "t": //Complete the table
                                let tableHTML = '<table><tr>';
                                item.cells[0].forEach(cell => {
                                    tableHTML += `<th>${cell.text}</th>`;
                                });
                                tableHTML += '</tr>';
                                item.cells.slice(1).forEach(row => {
                                    tableHTML += '<tr>';
                                    row.forEach((cell, cellIndex) => {
                                        if (cellIndex === 0) {
                                            tableHTML += `<td>${cell.text}</td>`;
                                        } else {
                                            tableHTML += `
                                                <td>
                                                    <input type="text" name="section-${sectionIndex}-question-${questionIndex}-cell-${cellIndex}">
                                                </td>
                                            `;
                                        }
                                    });
                                    tableHTML += '</tr>';
                                });
                                tableHTML += '</table>';
                                responseDiv.innerHTML += tableHTML;
                                break;
                            case "c": //Circle the correct answers (Multi select)
                                item.options.forEach((option, optionIndex) => {
                                    responseDiv.innerHTML += `
                                        <label>
                                            <input type="checkbox"
                                                    name="section-${sectionIndex}-question-${questionIndex}"
                                                    value="${optionIndex + 1}">
                                            ${option.text}
                                        </label><br>
                                    `;
                                })
                                break;
                        }
                        questionDiv.appendChild(responseDiv);
                        break;
                    }
            });

            sectionDiv.appendChild(questionDiv);
        });

        examContent.appendChild(sectionDiv);
    });

    document.getElementById('submitExam').style.display = 'block';
}

document.getElementById('submitExam').addEventListener('click', function() {
    const formData = new FormData();
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            if (input.checked) {
                formData.append(input.name, input.value);
            }
        } else if (input.type === 'text') {
            formData.append(input.name, input.value);
        }
    });

    // Validate and score answers (to be implemented)
    document.getElementById('result').innerText = 'Submitted! (Scoring logic to be implemented)';
});
