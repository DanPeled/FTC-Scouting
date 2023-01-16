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

    objs.sort((a,b) => alphabeticValue(a.name) - alphabeticValue(b.name))
    resultViewer.innerHTML = "";

    for (let i = 0; i < objs.length; i++) {
        let tempObjValues = Object.values(objs[i]);
        let tempObjKeys = Object.keys(objs[i]);
        tempObjKeys = tempObjKeys;
        tempObjValues = tempObjValues;
        let nameIndex = 13;
        for (let x = 0; x < tempObjKeys.length; x++) {
            if (tempObjKeys[x].toString() == "name") {
                nameIndex = x;
            }
        }
        resultViewer.innerHTML += `${tempObjKeys[nameIndex]}: ${tempObjValues[nameIndex]} <br>`;
        for (let w = tempObjKeys.length; w > 0; w--) {
            if (tempObjKeys[w] != undefined && tempObjKeys[w] != "name") {
                if (tempObjValues[w].toString() == "on") {
                    tempObjValues[w] = "כן"
                }
                if (tempObjValues[w].toString() == "off") {
                    tempObjValues[w] = "לא"
                }
                resultViewer.innerHTML += `${tempObjKeys[w].replaceAll("_", " ")}: ${tempObjValues[w]} <br>`;
            }
            console.log(resultViewer.innerHTML);
        }
        resultViewer.innerHTML += "<br><br>";
    }
    console.log("updating data");

}

window.addEventListener("load", eve => {
    updateViewer(["formData"]);
});

