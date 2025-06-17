const Leads = require("../models/Leads");
const axios = require("axios");
const Ai_url = process.env.FAST_API_BACKEND_URL;
const {sendEmailToOwner} = require('../utils/sendLead')
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL); 
const {initializeUserSession, getUserSession, updateUserSession, deleteUserSession, generateUserId} = require('../utils/session');
const {commonIntake, IntakeFlow} = require('../constants/intakeFlow');
const uploadMedia = require('../utils/uploadMedia');
const storeIntake = require('../utils/storeIntake');
const IntakeForm = require("../models/Intake");


const getFileUrl = async(req, res) => {
  try {
    const file = req.files.document[0];

    const fileurl = await uploadMedia(file);
    return res.status(200).json({success:true, msg:'File url generated successfully', fileurl});
  }
  catch(err) {
    console.log(err.message);
    return res.status(501).json({success:false, msg:"Some error occured please try again later"});
  }
}

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
    const {  message, page_context } = req.body;
    const ai_response = await axios.post(`${Ai_url}/ask-legal`, {
      message: message,
      page_context:page_context
    });
    const ai_answer_text = await ai_response.data.answer.answer;
      let  new_ai_answer_text = ai_answer_text
      .replace(/'/g, '')
      .replace(/"/g,'')    
      .replace(/\s*\+\s*/g, ' ')  
      .replace(/\s+/g, ' ');  

    // const lead = await Leads.findOneAndUpdate(
    //   { _id: convo_id },
    //   {
    //     $push: {
    //       messages: {
    //         user: message,
    //         ai: new_ai_answer_text,
    //       },
    //     },
    //     $set: {
    //       lastActivityAt: new Date(),
    //       inactive: false,
    //     },
    //   },
    //   { new: true }
    // );

    return res
      .status(200)
      .json({
        success: true,
        msg: "ai response generated",
        response: {ai_answer_text,suggest_schedule:ai_response.data.answer.suggest_schedule}
      });
  } catch (err) {
    console.log(err.message);
    return res
      .status(501)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const startIntake = async (req, res) => {
    try {
        const user_id = generateUserId();
        await initializeUserSession(user_id);
        const firstQuestion = commonIntake.start.question;

        return res.status(200).json({
            success: true,
            msg: 'Started intake process',
            intake_id: user_id,
            question: firstQuestion
        });
    } catch(err) {
        console.log(err.message);
        return res.status(501).json({success: false, msg: "Some error occurred please try again later"});
    }
};

const saveStep = async (req, res) => {
    try {
        const { intake_id, answer } = req.body;
        console.log(req.body)
        const session = await getUserSession(intake_id);

        if (!session) {
            return res.status(400).json({success: false, msg: 'Session not found'});
        }

        const currentStep = session.step;
        session.data[currentStep] = answer;
        let nextStep;
        if (session.flow === 'common_intake') {
            const currentStepConfig = commonIntake[currentStep];
            
            if (currentStep === 'issue_type') {
                session.path = answer.toLowerCase();
                session.flow = 'specific_flow';
                session.subStep = 'start'; 
                console.log(`${session.path}_start.start`)
                nextStep = `${session.path}_start.start`; 
                
            } else {
                nextStep = typeof currentStepConfig.next === 'function' 
                    ? currentStepConfig.next(answer)
                    : currentStepConfig.next;
            }
        } else {
            const [flowName, subStep] = currentStep.split('.');
            const currentFlow = IntakeFlow[flowName];
            const currentStepConfig = currentFlow[subStep];
            
            nextStep = currentStepConfig.next;
            
            if (!nextStep) {
              await updateUserSession(intake_id, session);
              await storeIntake(intake_id);
                return res.status(200).json({
                    success: true,
                    msg: "Thank you! You're in good hands. We'll follow up shortly. Meanwhile, If you have any questions related to our services, legal issues or anything feel free to ask",
                    completed: true
                });
            }
            nextStep = `${flowName}.${nextStep}`;
        }

        session.step = nextStep;
        await updateUserSession(intake_id, session);

        let nextQuestion;
        let options;
        let upload = false;
        
        if (session.flow === 'common_intake') {
            nextQuestion = commonIntake[nextStep].question;
            options = commonIntake[nextStep]?.options;
            if (nextStep === 'email' && session.data.name) {
                nextQuestion = nextQuestion.replace('[User Name]', session.data.name);
            }
        } else {
            const [flowName, subStep] = nextStep.split('.');
            const flow = IntakeFlow[flowName];
            nextQuestion = flow[subStep].question;
            options = flow[subStep]?.options;
            upload = flow[subStep]?.upload || false;
        }

        return res.status(200).json({
            success: true,
            msg: 'Answer saved',
            question: nextQuestion,
            options: options,
            upload: upload
        });
    } catch(err) {
        console.log(err.message);
        return res.status(501).json({success: false, msg: "Some error occurred please try again later"});
    }
};


module.exports = { storeLeads, getAiResponse, startIntake, saveStep, getFileUrl };
