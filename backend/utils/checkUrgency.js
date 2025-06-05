const axios = require('axios');
const Ai_url = process.env.FAST_API_BACKEND_URL;

const checkUrgency = async (leads) => {
  try {
    console.log(leads);
    const response = await axios.post(`${Ai_url}/check-urgency`, leads, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Data successfully sent to FastAPI');
    return response.data.result;
  } catch (err) {
    console.error("Failed to send to FastAPI:", err.message);
    throw err;
  }
};

module.exports = checkUrgency;