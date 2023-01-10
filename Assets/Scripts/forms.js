const inputList = document.querySelectorAll("input.info");
let values = [];

const submitValues = async () => {
    inputList.forEach((e) => {
        values.push(e.value);
    });
    try {
        const response = await fetch("https://danpeled.github.io/FTC-Scouting/", {
            method: "POST",
            body: JSON.stringify({ data: values }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.success) {
            console.log("File saved successfully");
        } else {
            console.error("Failed to save file");
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
