const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost/question');

const answerSchema = new Schema({
    correctAnswers: {},
    questionTypes: {}
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports.answerSchema = answerSchema;
module.exports.Answer = Answer;