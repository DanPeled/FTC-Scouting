import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc__, getDocsData__ } from "./firebase_script.js";

const resultViewer = document.getElementById("result_viewer");
const defaultDir = ["formData"];

async function updateViewer(collectionPathArray = defaultDir) {
    let objs = await getDocsData__(collectionPathArray);
    objs.sort((obj1, obj2) => { // Name sorting algorithm
        let name1 = obj1.properties[0].value.toLocaleLowerCase(), name2 = obj2.properties[0].value.toLocaleLowerCase();
        if(name1 > name2) return 1; if(name1 < name2) return -1; return 0;
    });
    resultViewer.innerHTML = "";
    for (let i = 0; i < objs.length; i++) {
        resultViewer.innerHTML += `<div class="result_encapsulator">`;
        for(let j = 0; j < objs[i].properties.length; j++) {
            resultViewer.innerHTML += `<h3 style="display: inline;" class="hebrew">${objs[i].properties[j].hebrewLabel}: </h3><p style="display: inline;" class="hebrew">${objs[i].properties[j].value}</p> <br>`;
        }
        resultViewer.innerHTML += `</div>`;
    }
    
    console.log("updating data");

}

window.addEventListener("load", eve => {
    updateViewer();
});
document.getElementById("refresh").addEventListener("click", (ev) => {
    updateViewer();
});

