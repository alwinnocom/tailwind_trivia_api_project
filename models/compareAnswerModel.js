const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect("mongodb+srv://admin-alwin:aGq5DdasHMkw5Di@tailwindtrivia.g4cpx.mongodb.net/question?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const compare_answerSchema = new Schema({
    question_number: String,

    points_earned: Number,
    points_possible: Number,

    totalPointsPossible: Number,

    yourPointsEarned: Number,

    yourCorrectQuestions: Number,

    accuracy: String,
    result: String,
    correct_result: String
});

const Compare_Answer = mongoose.model("Compare_Answer", compare_answerSchema);

module.exports.compare_answerSchema = compare_answerSchema;
module.exports.Compare_Answer = Compare_Answer;