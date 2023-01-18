import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc__, getDocsData__ } from "./firebase_script.js";
// Declaring variables
const resultViewer = document.getElementById("result_viewer");
const defaultDir = ["formData"];
let mode = "forms";

// UpdateViewer function -> for rendering data onto the screen (as html).
async function updateViewer(collectionPathArray = defaultDir, changeMode = "forms") {
    mode = changeMode;
    resultViewer.innerHTML = "";
    let objs = await getDocsData__(collectionPathArray);
    objs.sort((obj1, obj2) => { // Name sorting algorithm
        let name1 = obj1.properties[0].value.toLocaleLowerCase(), name2 = obj2.properties[0].value.toLocaleLowerCase();
        if(name1 > name2) return 1; if(name1 < name2) return -1; return 0;
    });
    
    if(mode == "forms") { // Forms mode - to view all forms filled regardless of any criteria
        
        for (let i = 0; i < objs.length; i++) {
            resultViewer.innerHTML += `<div class="result_encapsulator">`;
            for(let j = 0; j < objs[i].properties.length; j++) {
                resultViewer.innerHTML += `<h3>${objs[i].properties[j].hebrewLabel}: </h3><p>${objs[i].properties[j].value}</p> <br>`;
            }
            resultViewer.innerHTML += `</div>`;
        }    
    } 
    if(mode == "averages" && objs.length > 0) { // Averages mode - to view a summary of all forms filled (averages of every team)
        let nameIndexes = [], currentName = "";
        for(let i = 0; i < objs.length; i++) { // Getting all forms index bounds
            if(objs[i].properties[0].value != currentName) {
                currentName = objs[i].properties[0].value;
                nameIndexes.push({startIndex: i, endIndex: i});
            }
            nameIndexes[nameIndexes.length - 1].endIndex = i;
        }
        nameIndexes.forEach((indexBounds) => {
            resultViewer.innerHTML += `<div class="result_encapsulator">`;
            resultViewer.innerHTML += `${objs[indexBounds.startIndex].properties[0].hebrewLabel}: ${objs[indexBounds.startIndex].properties[0].value} <br>`;
            for(let i = 1; i < objs[0].properties.length; i++) {
                resultViewer.innerHTML += `<h3>${objs[indexBounds.startIndex].properties[i].hebrewLabel}: </h3>`;
                let currentProperty = 0;
                let currentPropertyType = objs[indexBounds.startIndex].properties[i].type;
                if(currentPropertyType == "text") currentProperty = "{";
                console.log(currentPropertyType);
                for(let j = indexBounds.startIndex; j <= indexBounds.endIndex; j++) {
                    let propertyValue = objs[j].properties[i].value; // TODO: check there's no aliasing
                    if(currentPropertyType == "checkbox" && propertyValue == "on") {
                        currentProperty += 100;
                    } else if(currentPropertyType == "number") {
                        currentProperty += parseInt(propertyValue);
                    } else if(currentPropertyType == "text") {
                        currentProperty += `${propertyValue}.${j == indexBounds.endIndex ? "" : "<br>"}`;
                    
                    }
                    console.log(propertyValue);
                }
                console.log(currentProperty, " ");
                resultViewer.innerHTML +=`<p>${((currentPropertyType == "text") ? currentProperty + " }" : (currentProperty / ((indexBounds.endIndex - indexBounds.startIndex) + 1)))}${currentPropertyType == "checkbox" ? "%" : ""}</p>`;
                resultViewer.innerHTML += `<br>`;
            }
            resultViewer.innerHTML += `</div>`;
        });

        
        
    }
    if(!navigator.onLine) {
        resultViewer.innerHTML += "Offline 📶📴, cannot access database.";
    }
    console.log("updating data");
    
}

window.addEventListener("load", eve => { // Default loading
    updateViewer();
});
document.querySelectorAll("button.refresh").forEach((e) => { // button refreshes and mode changes
    e.addEventListener("click", (ev) => {
        updateViewer(defaultDir, e.getAttribute("data-result-view-mode"));
    });
});
