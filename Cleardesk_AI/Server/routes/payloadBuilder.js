import fs from 'fs';
import axios from 'axios';

const filePath = 'D:\\Frontend Projects\\ReactJS-Tailwind_MiniProjects\\Cleardesk_AI\\tickets.json';
const allTickets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

async function nlp(ticket) {
    try {
        const response = await axios.post('http://localhost:8100/nlp', ticket);
        return response.data;
    } catch (err) {
        console.error('NLP error:', err.message);
        return null;
    }
}

async function processTickets() {
    const BATCH_SIZE = 5;

    for (let i = 0; i < allTickets.length; i += BATCH_SIZE) {
        const currBatch = allTickets.slice(i, i + BATCH_SIZE);
        const processedBatch = [];


        for (const ticket of currBatch) {
            const result = await nlp(ticket);
            if (result) processedBatch.push(result);
        }

        // Send current batch to Gemini
        try {
            const response = await axios.post('http://localhost:8100/chat', {
                prompt: JSON.stringify(processedBatch)
            });

            //Basically, your AI response is a string containing JSON, not a JSON object yet.so it contains lot of \n and other esacpe characters..
            //so we need to parse it..
            
            let rawReply = response.data.reply;

            // Remove Markdown-style ```json if present
            rawReply = rawReply.replace(/^```json\s*/, '').replace(/```$/, '');

            // Parse string to object
            const parsedReply = JSON.parse(rawReply);

            console.log(parsedReply);  // "Login Error with Correct Credentials"

            //console.log(response.data);
            console.log('===========================');
            console.log('AI processing complete for batch');
        } catch (err) {
            console.error('Gemini error:', err.response?.data || err.message);
        }

        // reset between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('=======All tickets processed.=======');
}

processTickets();
