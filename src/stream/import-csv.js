import fs from 'fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);



const csvParse = parse({
    delimiter: ',',
    skipEmpytLines: true,
    fromLine: 2
});



async function run() {
    const linesParse = stream.pipe(csvParse);

    console.log(linesParse)

    for await (const line of linesParse){
        const [title, description] = line;

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description
            })
        })
    }
}

    run()

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
        
