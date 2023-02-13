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
    let name1 = obj1.generalData[1].value.toLocaleLowerCase(),
      name2 = obj2.generalData[1].value.toLocaleLowerCase();
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
  resultViewerHTML += `<tr><td>autonomous | cones | teleop</td>`;
  objs.forEach((obj_) => {
    resultViewerHTML += `<td>`;
    const { autonomous: auto, teleop_endgame: drive } = obj_;
    [auto, drive].forEach((gameState, gi) => {
      resultViewerHTML += `<div style="display: grid; grid-template-rows: repeat(5, 1fr); place-items: center;"><div>${
        gi == 0 ? "auto" : "teleop&\nendgame"
      }</div>`; //TODO: use div and custom component poles-display
      gameState.forEach((pole, i) => {
        // let poleDisplay = document.createElement("poles-display");
        // poleDisplay.setManualDisplays(1);
        // // poleDisplay.setAttribute("displays", 1);
        // poleDisplay.setAttribute("title", pole.label);
        // poleDisplay.setAttribute("image", pole.image);
        // poleDisplay.setDisplay(0, pole.value);
        // poleDisplay.setChangable(true);
        // let tempWrapper = document.createElement("span");
        // tempWrapper.appendChild(poleDisplay);
        // console.log(tempWrapper.firstChild);

        if (i == gameState.length - 1) {
          // poleDisplay.setAttribute("style", "grid-column: span 2;");
        }
        resultViewerHTML += `<div>${pole.label}: ${pole.value}</div> `;
      });
      resultViewerHTML += `</div>`; //TODO: remove and use custom component
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
