const inputList = document.querySelectorAll("input.info");
let values = [];
const submitValues = () => {
    inputList.forEach((e, i) => {
        values[i] = e.value;

    });
    console.log(values);
};
