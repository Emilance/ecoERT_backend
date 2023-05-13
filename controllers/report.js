const { Report } = require("../models/Report");
const { generateCloudUrl } = require("../utils/saveToCloudinary");
const fs = require('fs');



const createReport = async (req, res) => {
    const { description, title, latitude, longitude } = req.body;
    const mediaFile = req.file; // Uploaded file object
    const userId =  req.user.user_id 

    
    try {    
      const imgUrl = await generateCloudUrl(mediaFile.path)
      const resp = await Report.create({
        title,  description, media : imgUrl, location: {latitude, longitude},
        reporter : userId,
      })
      res.status(201).json({
        message: "successfully Uploaded",
        resp
    }
        )
    } catch (error) {
        console.log(error)
      res.status(400).send(error)

    } finally {
        // Delete the temporary file after it has been uploaded to Cloudinary
        if (mediaFile) {
          fs.unlinkSync(mediaFile.path);
        }
    }
  
}

const getAllReports = async (req, res) => {
    try {   
        const resp = await Report.find()
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}

const getAllMyReports = async (req, res) => {
    const userId = req.user.user_Id
    try {   
        const resp = await Report.find({reporter : userId})
        res.status(200).json(resp)
    } catch (error) {
        res.status(400).send(error)
    }

}

const getReportById = async (req, res) => {
    const repId = req.params.repId
    try {   
        const resp = await Report.findById(repId).populate("reporter")
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}
const deleteReportById = async (req, res) => {
    const repId = req.params.repId
    try {   
        const resp = await Report.findByIdAndDelete(repId)
        res.status(200).json(resp)
    } catch (error) {
        res.status(400).send(error)
    }

}



module.exports = {createReport, getAllReports, getAllMyReports , getReportById, deleteReportById}