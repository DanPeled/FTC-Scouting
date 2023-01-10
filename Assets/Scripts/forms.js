let values = [];
const submitValues = () => {
    inputList = document.querySelectorAll("input.info");
    inputList.forEach((e, i) => {
        values[i] = `${inputList[i].getAttribute("placeholder")}: ${e.value}`;
    });
    console.log(values);
};