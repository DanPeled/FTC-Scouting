import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc__, getDocsData__ } from "./firebase_script.js";

const resultViewer = document.getElementById("result_viewer");

async function updateViewer(collectionPathArray) {
    let objs = await getDocsData__(collectionPathArray);
    resultViewer.innerHTML = "";
    for (let i = 0; i < objs.length; i++) {
        let tempObjValues = Object.values(objs[i]);
        let tempObjKeys = Object.keys(objs[i]);
        let nameIndex = binarySearch(tempObjKeys, "name");
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






function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);

        if (array[middle] === target) {
            return middle;
        } else if (array[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

