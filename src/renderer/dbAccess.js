const fs = require('fs');
const csv = require('csv-parser');
const needle = require("needle");
const urlDatabase = "https://docs.google.com/spreadsheets/d/1gnjt-bU31ZbAc9wa5b57nI-_Gfnv3ac6sD9JPOQHCHs/gviz/tq?tqx=out:csv&sheet=answerKey1";
let database = './db/data.csv';

let prelimQuestion = [];
let speedQuestion = [];

async function getDatabase() {
    return new Promise((resolve, reject) => {
      let answerKeyRaw = [];
      needle
      .get(urlDatabase)
      .pipe(csv({headers: false}))
      .on("data", (data) => {
          answerKeyRaw.push(data);
      })
      .on("done", (err) => {
          if (err) reject(new Error("An error has occurred when retrieving online database. Trying local database"));
          else
              resolve(answerKeyRaw);
      }).on("end", function () {
          console.log("Online Database Success");
      })/*.catch(() => {
          fs.createReadStream(database)
          .pipe(csv({headers: false}))
          .on("data", (data) => {
              answerKey.push(data);
          })
          .on("done", (err) => {
              if (err) console.log("An error has occurred");
              else 
                  prelimQuestion = answerKey.slice(0, 50);
                  speedQuestion = answerKey.slice(50, 100);
          })
          .on("end", function () {
              console.log("finished");
          });
      });*/
      });
  }

export async function readTable(tableSelect) {
    const answerKey = await getDatabase();
    prelimQuestion = answerKey.slice(0, 50);
    speedQuestion = answerKey.slice(50, 100);
    let prelimQuestionRandom = [];
    let speedQuestionRandom = [];

    for (let i = 0; i < 50; i++) {
        let myIndex = (Math.random * (50-i));
        prelimQuestionRandom[i][0] = prelimQuestion[myIndex][0];
        prelimQuestion[i].splice(0, 1);
        for (j = 0; j < 4; j++) {
           let  myJndex = (Math.random*(50-j))
            prelimQuestionRandom[i][j] = prelimQuestion[myIndex][myJndex];
            prelimQuestion[i].splice(myJndex, 1);
        }
    }

    for (let i = 0; i < 50; i++) {
        let myIndex = (Math.random * (50-i));
        speedQuestionRandom[i][0] = speedQuestion[myIndex][0];
        speedQuestion[i].splice(0, 1);
        for (j = 0; j < 4; j++) {
            let myJndex = (Math.random*(50-j))
            speedQuestionRandom[i][j] = speedQuestion[myIndex][myJndex];
            speedQuestion[i].splice(myJndex, 1);
        }
    }

    if (tableSelect === 0) {
        return answerKey;
    } else if (tableSelect === 1) {
        return prelimQuestionRandom;
    } else if (tableSelect === 2) {
        return speedQuestionRandom;
    } else {
        return "Error retrieving database.";
    }
}