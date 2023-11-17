const fs = require('fs');
const csv = require('csv-parser');
const needle = require("needle");
const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
const database = './db/data.csv';

let prelimQuestion = [];
let speedQuestion = [];

export async function isConnected() {
    let isConnected = !!await require('dns').promises.resolve('google.com').catch(()=>{});
    return isConnected;
}

async function getDatabase() {
    if (await isConnected()) {
        console.log("Trying Online Database.");
        return new Promise((resolve, reject) => {
            let answerKeyRaw = [];
            needle
            .get(urlDatabase)
            .pipe(csv({headers: false}))
            .on("data", (data) => {
                answerKeyRaw.push(data);
            })
            .on("done", (err) => {
                if (err) reject(new Error("An error has occurred when retrieving online database."));
                else
                    resolve(answerKeyRaw);
            }).on("end", function () {
                console.log("Online Database Success");
            })
        });
    } else {
        console.log("Unable to Connect. Reverting to Local Database.");
        return new Promise((resolve, reject) => {
            let answerKeyRaw = [];
            fs.createReadStream(database)
            .pipe(csv({headers: false}))
            .on("data", (data) => {
                answerKeyRaw.push(data);
            })
            .on("done", (err) => {
                if (err) reject(new Error("An error has occurred when retrieving local database. No data available."))
                else 
                    resolve(answerKeyRaw);
            })
            .on("end", function () {
                console.log("Local Database Success");
            })
        });
    }
  }

export async function readTable(tableSelect) {
    let answerKey = await getDatabase();
    let prelimQuestion = JSON.parse(JSON.stringify(answerKey.slice(0, 50)));
    let speedQuestion = JSON.parse(JSON.stringify(answerKey.slice(50, 100)));

    for (let i = 0; i < 50; i++) {
        let rando = Math.floor(Math.random() * (50 - i)) + i;
        let temp = prelimQuestion[rando];
        prelimQuestion[rando] = prelimQuestion[i];

        for (let j = 1; j < 5; j++) {
            let rando2 = Math.floor(Math.random() * (5-j)) + j;
            let temp2 = temp[rando2];
            temp[rando2] = temp[j];
            temp[j] = temp2;
        }

        prelimQuestion[i] = temp;
    }

    for (let i = 0; i < 50; i++) {
        let rando = Math.floor(Math.random() * (50 - i)) + i;
        let temp = speedQuestion[rando];
        speedQuestion[rando] = speedQuestion[i];

        for (let j = 1; j < 5; j++) {
            let rando2 = Math.floor(Math.random() * (5-j)) + j;
            let temp2 = temp[rando2];
            temp[rando2] = temp[j];
            temp[j] = temp2;
        }

        speedQuestion[i] = temp;
    }

    if (tableSelect === 0) {
        return answerKey;
    } else if (tableSelect === 1) {
        return prelimQuestion;
    } else if (tableSelect === 2) {
        return speedQuestion;
    } else {
        return "Error retrieving database.";
    }
}

export async function checkCorrect(question, answer) {
    let answerKey = await readTable(0);
    let correctAnswer = new Map();
    
    for (let i = 0; i < 100; i++) {
        correctAnswer.set(answerKey[i][0], answerKey[i][1]);
    }
    return(correctAnswer.get(question) == answer);
}