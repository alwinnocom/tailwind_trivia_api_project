const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect("mongodb+srv://admin-alwin:aGq5DdasHMkw5Di@tailwindtrivia.g4cpx.mongodb.net/question?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const answerSchema = new Schema({
    correctAnswers: {},
    listOfQuestions: {},
    questionDifficulties: {},
    questionTypes: {}
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports.answerSchema = answerSchema;
module.exports.Answer = Answer;