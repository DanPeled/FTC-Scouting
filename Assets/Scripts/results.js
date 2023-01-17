import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc__, getDocsData__ } from "./firebase_script.js";

const resultViewer = document.getElementById("result_viewer");

function alphabeticValue(str__ = "") {
    let sum = 0;
    for(let i = 0; i < str__.length; i++) {
        sum += str__.charCodeAt(i);
    }
    return sum;
}

async function updateViewer(collectionPathArray) {
    let objs = await getDocsData__(collectionPathArray);
    objs.sort((obj1, obj2) => alphabeticValue(obj2.properties[0].value) - alphabeticValue(obj1.properties[0].value));
    resultViewer.innerHTML = "";

    for (let i = 0; i < objs.length; i++) {
        for(let j = 0; j < objs[i].properties.length; j++) {
            resultViewer.innerHTML += `<h3 style="display: inline;">${objs[i].properties[j].label}: </h3><p style="display: inline;" class="hebrew">${objs[i].properties[j].value}</p> <br>`;
        }
        resultViewer.innerHTML += "<br><br>";
    }
    
    console.log("updating data");

}

window.addEventListener("load", eve => {
    updateViewer(["formData"]);
});

