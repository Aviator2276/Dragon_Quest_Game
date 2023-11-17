const fs = require('fs');
const csv = require('csv-parser');
const needle = require("needle");
const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
const database = './db/data.csv';

async function isConnected() {
    let isConnected = !!await require('dns').promises.resolve('google.com').catch(()=>{});
    return isConnected;
}
export function getConnectionState() {
    isConnected().then((connected) => {
        console.log(connected);
        return connected;
    });
}

export async function getDatabase() {
    /*if (await isConnected()) {
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
        });*/
    //} else {
        console.log("Unable to Connect. Reverting to Local Database.");
        return new Promise((resolve, reject) => {
            let answerKeyRaw = [];
            fs.createReadStream(database)
            .pipe(csv({headers: false}))
            .on("data", (data) => {
                answerKeyRaw.push(data);
            })
            .on("end", (err) => {
                if (err) reject(new Error("An error has occurred when retrieving local database. No data available."))
                else 
                    resolve(answerKeyRaw);
            })
        });
    }
  //}

const numPrelimQuestions = 50;
const numSpeedQuestions = 50;

export function randomizeQuestions(database, prelim) {
    let questions;

    if (prelim) {
        questions = JSON.parse(JSON.stringify(database.slice(0, numPrelimQuestions)));
    } else {
        questions = JSON.parse(JSON.stringify(database.slice(numPrelimQuestions, numPrelimQuestions + numSpeedQuestions)));
    }

    for (let i = 0; i < questions.length; i++) {
        let rando = Math.floor(Math.random() * (questions.length - i)) + i;
        let temp = questions[rando];
        questions[rando] = questions[i];

        for (let j = 1; j < 5; j++) {
            let rando2 = Math.floor(Math.random() * (5-j)) + j;
            let temp2 = temp[rando2];
            temp[rando2] = temp[j];
            temp[j] = temp2;
        }

        questions[i] = temp;
    }

    return questions;
}

export function getAnswerMap(database) {
    let answerMap = new Map();
    
    for (let i = 0; i < database.length; i++) {
        answerMap.set(database[i][0], database[i][1]);
    }
    return answerMap;
}