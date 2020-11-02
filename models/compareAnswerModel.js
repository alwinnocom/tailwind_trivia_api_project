const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost/question');


const compare_answerSchema = new Schema({
    question_number: String,
    points_earned: Number,
    points_possible: Number,
    totalPointsPossible: Number,
    yourPointsEarned: Number,
    result: String
});

const Compare_Answer = mongoose.model("Compare_Answer", compare_answerSchema);

module.exports.compare_answerSchema = compare_answerSchema;
module.exports.Compare_Answer = Compare_Answer;