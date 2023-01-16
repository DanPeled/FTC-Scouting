import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc__, getDocsData__ } from "./firebase_script.js";

const resultViewer = document.getElementById("result_viewer");

async function updateViewer(collectionPathArray) {
    let objs = await getDocsData__(collectionPathArray);
    resultViewer.innerHTML = "";
    for(let i = 0; i < objs.length; i++) {
        let tempObjValues = Object.values(objs[i]);
        let tempObjKeys = Object.keys(objs[i]);
        for(let i = tempObjKeys.length; i > 0; i--) {
            resultViewer.innerHTML += `${tempObjKeys[i]}: ${tempObjValues[i]} <br>`;
            console.log(resultViewer.innerHTML);
        }
        resultViewer.innerHTML += "<br><br>";
    }

    console.log("updating data");
}

window.addEventListener("load", eve => {
    updateViewer(["formData"]);
});





