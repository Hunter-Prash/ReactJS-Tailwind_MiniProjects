import fs from 'fs';
import axios from 'axios';


const filePath = 'D:\\Frontend Projects\\ReactJS-Tailwind_MiniProjects\\Cleardesk_AI\\tickets.json';
const allTickets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let finalresponse = []//to store the response of all tickets after processing
let allusers = []// variable to store total number of support agents by scanning all users in the dynamo db table

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

    //fetching all users from dynamo db
    let response = await axios.get('http://localhost:5000/api/read')
    allusers = response.data?.users

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

            //Basically,  AI response is a string containing JSON, not a JSON object yet.so it contains lot of \n and other esacpe characters..
            //so we need to parse it..

            let rawReply = response.data.reply;

            // Remove Markdown-style ```json if present
            rawReply = rawReply.replace(/^```json\s*/, '').replace(/```$/, '');

            // Parse string to object
            const parsedReply = JSON.parse(rawReply);

            //console.log(parsedReply);
            finalresponse.push(parsedReply)

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
    // flatten batched responses
    finalresponse = finalresponse.flat();

    // assign globally unique IDs
    let globalId = 0;
    finalresponse = finalresponse.map(ticket => ({
        id: globalId++,
        ...ticket
    }));

    //round-robin the tickets among support agents
    let c = 0
    for (let i = 0; i < finalresponse.length; i++) {
        finalresponse[i]['userQueue'] = allusers[c].email //adding a new attribute to the gemini response
        c = c + 1
        if (c >= allusers.length) {
            c = c % allusers.length //keep cycling among the users i.e support agents
        }
    }
    console.log(finalresponse)
    return finalresponse
}


export default processTickets;