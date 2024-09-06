# Digital Exam Viewer
A project for exam revision that virtualizes real past exams, allows you to AI generate new exams and also manually create exams to be taken online for practice and revision.

Exams can be taken in various modes:
- Exam conditions
    - Reading time and writing time as specified for the real exam
    - Marking and reviewing at the end
- No reading time
    - The same as Exam Conditions but reading time is skipped entirely and writing time begins immediately
- Casual
    - Complete the exam in your own time with no time limit
- Practice
    - Get immediate feedback after each question and learn what the correct answer was and why

## How to digitze existing exams
To convert an exam into the correct JSON format you can go to [ChatGPT](https://chatgpt.com/) and use model 4o to convert the exam. Simply upload the exam PDF and the examiners report PDF and paste in the prompt provided in prompt.txt. For long exams you may need to occasionally press "Keep Generating" to get the model to keep outputing the JSON data. Then create a new .json file in the exams folder and paste in the output from ChatGPT.

## How to generate new exams
Unfinished, would probably use a python tool with a prompt where you can upload reference exams and the study design.

## How to manually create exams
Unfinished, would probably have a web tool called builder.html that would allow you to create the exams.