import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  deleteField,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc__, getDocsData__ } from "./firebase_script.js";
// Declaring variables
const resultViewer = document.getElementById("result_viewer");
const defaultDir = ["formData"];
let mode = "forms";
// UpdateViewer function -> for rendering data onto the screen (as html).
// async function updateViewer(collectionPathArray = defaultDir, changeMode = "forms") {

//     mode = changeMode;
//     resultViewer.innerHTML = "";
//     let objs = await getDocsData__(collectionPathArray);
//     objs.sort((obj1, obj2) => { // Name sorting algorithm
//         let name1 = obj1.properties[0].value.toLocaleLowerCase(), name2 = obj2.properties[0].value.toLocaleLowerCase();
//         if(name1 > name2) return 1; if(name1 < name2) return -1; return 0;
//     });
//     //Changing on & off to true and false
//     objs.forEach(o => {
//         o.properties.forEach(p => {
//             if(p.value.includes("on"))
//                 p.value = true;
//             else if(p.value.includes("off"))
//                 p.value = false;
//         })
//     })

//     if(mode == "forms") { // Forms mode - to view all forms filled regardless of any criteria
//         // ! Deprecated method, do not use
//         // resultViewer.style = `display: flex; flex-direction: row;`;
//         // for (let i = 0; i < objs.length; i++) {
//         //     resultViewer.innerHTML += `<div class="result_encapsulator">`;
//         //     for(let j = 0; j < objs[i].properties.length; j++) {
//         //         resultViewer.innerHTML += `<h3>${objs[i].properties[j].hebrewLabel}: </h3><p>${objs[i].properties[j].value}</p> <br>`;
//         //     }
//         //     resultViewer.innerHTML += `</div>`;
//         // }
//         let resultViewer_HTML_STR = "";
//         for(let i = 0; i < objs[0].properties.length; i++) {
//             resultViewer_HTML_STR += `<tbody><tr><td> ${objs[0].properties[i].hebrewLabel}</td>`;
//             for(let j = 0; j < objs.length; j++) {
//                 resultViewer_HTML_STR += `<td>${objs[j].properties[i].value}</td>`;
//             }
//             resultViewer_HTML_STR += `</tr></tbody>`;
//         }
//         resultViewer.innerHTML = resultViewer_HTML_STR;
//     }
//     if(mode == "averages" && objs.length > 0) { // Averages mode - to view a summary of all forms filled (averages of every team)
//         // let nameIndexes = [], currentName = "NOTHING";
//         // for(let i = 0; i < objs.length; i++) { // Getting all forms index bounds
//         //     if(objs[i].properties[0].value != currentName) {
//         //         currentName = objs[i].properties[0].value;
//         //         nameIndexes.push({startIndex: i, endIndex: i});
//         //     }
//         //     nameIndexes[nameIndexes.length - 1].endIndex = i;
//         // }
//         // nameIndexes.forEach((indexBounds) => {
//         //     resultViewer.innerHTML += `<div class="result_encapsulator">`;
//         //     resultViewer.innerHTML += `<h3 style="font-size: 1.3em;">${objs[indexBounds.startIndex].properties[0].hebrewLabel}: </h3><p style="font-size: 1.3em;">${objs[indexBounds.startIndex].properties[0].value}</p><br>`;
//         //     for(let i = 1; i < objs[0].properties.length; i++) {
//         //         resultViewer.innerHTML += `<h3>${objs[indexBounds.startIndex].properties[i].hebrewLabel}: </h3>`;
//         //         let currentProperty = 0;
//         //         let currentPropertyType = objs[indexBounds.startIndex].properties[i].type;
//         //         if(currentPropertyType == "text") currentProperty = "{";
//         //         console.log(currentPropertyType);
//         //         for(let j = indexBounds.startIndex; j <= indexBounds.endIndex; j++) {
//         //             let propertyValue = objs[j].properties[i].value; // TODO: check there's no aliasing
//         //             if(currentPropertyType == "checkbox" && propertyValue == "on") {
//         //                 currentProperty += 100;
//         //             } else if(currentPropertyType == "number") {
//         //                 currentProperty += parseInt(propertyValue);
//         //             } else if(currentPropertyType == "text") {
//         //                 currentProperty += `${propertyValue}.${j == indexBounds.endIndex ? "" : "<br>"}`;

//         //             }
//         //             console.log(propertyValue);
//         //         }
//         //         console.log(currentProperty, " ");
//         //         resultViewer.innerHTML +=`<p>${((currentPropertyType == "text") ? currentProperty + " }" : (currentProperty / ((indexBounds.endIndex - indexBounds.startIndex) + 1)))}${currentPropertyType == "checkbox" ? "%" : ""}</p>`;
//         //         resultViewer.innerHTML += `<br>`;
//         //     }
//         //     resultViewer.innerHTML += `</div>`;
//         // });
//         let startIndex = 0, currentName = "NOTHING", removeIndexs = [];
//         for(let i = 0; i < objs.length; i++) {
//             if(objs[i].properties[0].value != currentName) {
//                 for(let p = 1; p < objs[i].properties.length; p++) {
//                     const currentPropertyType = objs[startIndex].properties[p].type;
//                     switch(currentPropertyType) {
//                         case "number" | "checkbox":
//                             objs[startIndex].properties[p].value = (parseInt(objs[startIndex].properties[p].value) / (i - startIndex)).toString();
//                         case "checkbox":
//                             objs[startIndex].properties[p].value = `${(parseInt(objs[startIndex].properties[p].value) * 100)}%`;
//                             break;
//                     }
//                 }
//                 currentName = objs[i].properties[0].value;
//                 startIndex = i;
//             } else {
//                 removeIndexs.push(i);
//                 for(let p = 1; p < objs[i].properties.length; p++) {
//                     const currentPropertyType = objs[startIndex].properties[p].type;
//                     switch(currentPropertyType) {
//                         case "number" | "checkbox":
//                             objs[startIndex].properties[p].value = parseInt(objs[startIndex].properties[p].value) + parseInt(objs[startIndex.properties[p].value]);
//                             break;
//                         case "text":
//                             objs[startIndex].properties[p].value += ` <br>${objs[i].properties[p].value}`;
//                             break;
//                     }
//                 }
//             }
//         }
//         // Removing extra left objects
//         for(let c = removeIndexs.length -1; c >= 0; c--) {
//             delete objs[removeIndexs[c]];
//         }
//         // Displaying
//         console.log(objs);
//         let resultViewer_HTML_STR = "";
//         for(let i = 0; i < objs[0].properties.length; i++) {
//             resultViewer_HTML_STR += `<tbody><tr><td> ${objs[0].properties[i].hebrewLabel}</td>`;
//             for(let j = 0; j < objs.length; j++) {
//                 if(objs[j] != null && objs[j] != undefined)
//                     resultViewer_HTML_STR += `<td>${objs[j].properties[i].value}</td>`;
//             }
//             resultViewer_HTML_STR += `</tr></tbody>`;
//         }
//         resultViewer.innerHTML = resultViewer_HTML_STR;
//     }
//     if(!navigator.onLine) {
//         resultViewer.innerHTML = "Offline 📶📴, cannot access database.";
//     }
//     console.log("updating data");

// }

async function updateViewer(
  collectionPathArray = defaultDir,
  changeMode = "forms"
) {
  if (!navigator.onLine) {
    resultViewer.innerHTML = "unable to reach database: offline! ✈";
    return;
  }
  resultViewer.innerHTML = "";
  let objs = await getDocsData__(collectionPathArray);
  objs.sort((obj1, obj2) => {
    // Name sorting algorithm
    let name1 = obj1.generalData[0].value.toLocaleLowerCase(),
      name2 = obj2.generalData[0].value.toLocaleLowerCase();
    if (name1 > name2) return 1;
    if (name1 < name2) return -1;
    return 0;
  });
  let resultViewerHTML = ""; // Setting to nothing
  const { generalData: gd0 } = objs[0];
  console.log(gd0);
  gd0.forEach((e, i) => {
    resultViewerHTML += `<tr><td>${e.label}</td>`;

    objs.forEach((obj_) => {
      resultViewerHTML += `<td>${obj_.generalData[i].value}</td>`;
    });
    resultViewerHTML += `</tr>`;
  });
  resultViewerHTML += `<tr><td>cones</td>`;
  objs.forEach((obj_) => {
    resultViewerHTML += `<td>`;
    const { autonomous: auto, teleop_endgame: drive } = obj_;
    [auto, drive].forEach((gameState) => {
      resultViewerHTML += `<div style="display: grid; grid-template-columns: repeat(3, 1fr); place-items: center;">`;
      gameState.forEach((pole, i) => {
        let poleDisplay = document.createElement("poles-display");
        poleDisplay.setAttribute("displays", 1);
        poleDisplay.setAttribute("title", pole.label);
        poleDisplay.setAttribute("image", pole.image);

        console.log(poleDisplay.shadowRoot);
        window.setTimeout(() => {
          poleDisplay.getDisplays().item(0).setValue(pole.value);
          poleDisplay.setChangable(false);
          poleDisplay.setDisplay(0, pole.value);
        }, 50);
        if (i == gameState.length - 1)
          poleDisplay.setAttribute("style", "grid-column: span 2;");
        resultViewerHTML += poleDisplay.outerHTML;
      });
      resultViewerHTML += `</div>`;
    });
    resultViewerHTML += `</td>`;
  });
  resultViewerHTML += `</tr>`;
  resultViewer.innerHTML = resultViewerHTML;
}

window.addEventListener("load", (eve) => {
  // Default loading
  updateViewer();
});
document.querySelectorAll("button.refresh").forEach((e) => {
  // button refreshes and mode changes
  e.addEventListener("click", (ev) => {
    updateViewer(defaultDir, e.getAttribute("data-result-view-mode"));
  });
});
