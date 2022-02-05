import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref as dataRef, get } from 'firebase/database';
import { getDownloadURL, ref as storageRef, getStorage } from 'firebase/storage';
import _ from 'lodash';

const config = {
  apiKey: "AIzaSyDSDL34m1WEKMonuecyPZqmwhn36yoYgr0",
  authDomain: "find-pokemon-67226.firebaseapp.com",
  databaseURL: "https://find-pokemon-67226-default-rtdb.firebaseio.com",
  projectId: "find-pokemon-67226",
  storageBucket: "find-pokemon-67226.appspot.com",
  messagingSenderId: "532150975651",
  appId: "1:532150975651:web:d7b7bb9c00a0e1181bd316",
  measurementId: "G-TWGH46RDE4"
  };

const firebaseApp = initializeApp(config);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

const gsRef = storageRef(storage, 'gs://find-pokemon-67226.appspot.com');


//249 pokemon, from ID 0-248
async function selectMons() {
    let monIDs = [];
    let monCalls = [];
    for (let i = 0; i < 5; i++) {
      monIDs.push(Math.floor(Math.random() * 249));
      monCalls.push(get(dataRef(database, `pokemon/${monIDs[i]}`)));
    }
    let pokeData = await Promise.all(monCalls);
    let pickedPokes = [];
    for (let mon of pokeData) {
      pickedPokes.push({id: mon.val().id, name: mon.val().name})
    }
    return pickedPokes;
}

async function getPokePics(pokeList) {
  let monCalls = [];
  for (let pokemon of pokeList) {
    monCalls.push(getDownloadURL(storageRef(gsRef, pokemon.name + '.png')))
  }

  let monURLs = await Promise.all(monCalls);
  let pokePics = [];
  for (let url in monURLs) {
    pokePics.push({id: pokeList[url].id, src: monURLs[url]})
  }
  return pokePics;
  }


function updateScores (latestScore, scoreList) {

  for (let score in scoreList) {
    if (_.isEqual(scoreList[score], latestScore)) break;
    if (scoreList[score].rawTime > latestScore.rawTime) {
      scoreList.splice(score, 1, latestScore, scoreList[score]);
      scoreList.pop();
      break;
    }
  }

  set(dataRef(database, 'high scores'), scoreList);
  return scoreList;
}

async function getScores() {
  let scoreData = await (get(dataRef(database, 'high scores')));
  let scoreList = scoreData.val();
  return scoreList;
}

//check on this function
async function checkFound(pokeID, boxPos) {
  const boxHeight = 110;
  const boxWidth = 90;
  let pokeData = await get(dataRef(database,`pokemon/${pokeID}`));
  let pokeCords = pokeData.val().location;
  let vertOverlap = Math.min(boxPos[1] + boxHeight, pokeCords[3]) - Math.max(boxPos[1], pokeCords[2]);
  let horizOverlap = Math.min(boxPos[0] + boxWidth, pokeCords[1]) - Math.max(boxPos[0], pokeCords[0]);
  if (vertOverlap < 0 || horizOverlap < 0) return false;
  if (vertOverlap * horizOverlap >= ((boxHeight * boxWidth) / 6)) return true;
  else return false;
}


export { selectMons, getPokePics, updateScores, getScores, checkFound }