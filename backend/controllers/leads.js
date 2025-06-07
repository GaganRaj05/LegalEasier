const Leads = require("../models/Leads");
const axios = require("axios");
const Ai_url = process.env.FAST_API_BACKEND_URL;
const {sendEmailToOwner} = require('../utils/sendLead')

const storeLeads = async (req, res) => {
  try {
    const { name, email, phone, lead_source,query } = req.body;

    const newLead = await Leads.create({
      name,
      email,
      phone,
      lead_source,
      query
    });

    await sendEmailToOwner(newLead);
    return res
      .status(201)
      .json({
        success: true,
        msg: "Lead stored successfully",
        convo_id: newLead._id,
      });
  } catch (err) {
    console.log(err.message);
    return res.status(501).json({success:false, msg:"Some error occured please try again later"});
  }
};

const getAiResponse = async (req, res) => {
  try {
    const { convo_id, message } = req.body;
    const ai_response = await axios.post(`${Ai_url}/ask-legal`, {
      conversationId: convo_id,
      message: message,
    });
    const ai_answer_text = await ai_response.data.answer.answer;
      let  new_ai_answer_text = ai_answer_text
      .replace(/'/g, '')
      .replace(/"/g,'')    
      .replace(/\s*\+\s*/g, ' ')  
      .replace(/\s+/g, ' ');  

    const lead = await Leads.findOneAndUpdate(
      { _id: convo_id },
      {
        $push: {
          messages: {
            user: message,
            ai: new_ai_answer_text,
          },
        },
        $set: {
          lastActivityAt: new Date(),
          inactive: false,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        msg: "ai response generated",
        response: ai_answer_text,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(501)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

module.exports = { storeLeads, getAiResponse };
