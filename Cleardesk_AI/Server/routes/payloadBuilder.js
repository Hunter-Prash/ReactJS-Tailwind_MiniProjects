import fs from 'fs';
import axios from 'axios';

const filePath = 'D:\\Frontend Projects\\ReactJS-Tailwind_MiniProjects\\Cleardesk_AI\\tickets.json';
const allTickets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const final = [];

async function nlp(ticket) {
    try {
        const response = await axios.post('http://localhost:8100/nlp', ticket);
        console.log(response.data);
        return response.data; // return the result
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

async function processTickets() {
    const BATCH_SIZE = 5;
    for (let i = 0; i < allTickets.length; i += BATCH_SIZE) {
        const currBatch = allTickets.slice(i, i + BATCH_SIZE);

        for (let ticket of currBatch) {
            const result = await nlp(ticket); // wait for the NLP response
            if (result) {
                final.push(result); // store response in final
            }
        }
    }

    console.log('All tickets processed:', final.length);
}

// Run the process
processTickets();
