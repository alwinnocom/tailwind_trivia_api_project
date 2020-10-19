const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost/question');

const questionSchema = new Schema({
    questionCategory: String,
    questionType: String,
    questionDifficulty: String,
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    incorrectAnswers: {
        type: [String],
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);

module.exports.questionSchema = questionSchema;
module.exports.Question = Question;







// res.render("results", {
                            //                 questionCategory: questionCategory,
                            //                 questionType: questionType,
                            //                 questionDifficulty: questionDifficulty,
                            //                 question: question,
                            //                 correctAnswer: correctAnswer,
                            //                 incorrectAnswers: incorrectAnswers
                            //             });