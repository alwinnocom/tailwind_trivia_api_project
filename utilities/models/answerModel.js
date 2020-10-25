const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost/question');

const answerSchema = new Schema({
    correctAnswer: {
        type: String,
        required: true
    }
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports.answerSchema = answerSchema;
module.exports.Answer = Answer;