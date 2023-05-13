const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ReportSchema = Schema({
    title : {
        type :String,
        required: true
    },
    description : {
        type :String,
    },
    media :{
        type: String
    },
    location: {
        latitude: {
          type: String,
        },
        longitude: {
          type: String,
        },
      },
    reporter: {
        type:Schema.Types.ObjectId,
        ref : "User"
     },
     status : {
        type :String,
        default: "pending"
     },
     comments: {
        type: [Schema.Types.ObjectId],
        ref: "Comment"
     }
    
})

const Report = mongoose.model("Report", ReportSchema)

 module.exports =  {Report}