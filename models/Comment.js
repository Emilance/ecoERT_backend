const { timeStamp } = require("console")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = Schema({
    description : {
        type :String,
    },
    user: {
        type:Schema.Types.ObjectId,
        ref : "User",
        require:true

        },
    report : {
        type:Schema.Types.ObjectId,
        ref : "Report",
        require:true
    }
},
{timeStamp: true}

)

const Comment = mongoose.model("Comment", CommentSchema)

 module.exports =  {Comment}