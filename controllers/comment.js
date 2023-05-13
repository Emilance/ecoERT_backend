const { Comment } = require("../models/Comment")



const createComment = async (req, res) => {
    const {description } = req.body
    const repId = req.params.repId
    const userId = req.user.user_Id
    try {
      const resp = await Comment.create({
      description,
        user : userId,
        report: repId
      })

      res.status(201).json(resp)
    } catch (error) {
      res.status(400).send(error)
    }
  
}

const getAllReportComments = async (req, res) => {
    const repId = req.params.repId
    try {   
        const resp = await Comment.find({report : repId}).populate("user")
        res.status(200).json(resp)
    } catch (error) {
        res.status(400).send(error)
    }

}




const deleteCommentById = async (req, res) => {
    const commentId = req.params.commentId
    try {   
        const resp = await Comment.findByIdAndDelete(commentId)
        res.status(200).json(resp)
    } catch (error) {
        res.status(400).send(error)
    }

}



module.exports = {createComment,  getAllReportComments , deleteCommentById}