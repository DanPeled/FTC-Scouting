let values = [];
const submitValues = () => {
    inputList = document.querySelectorAll("input");
    selectList = document.querySelectorAll("select.info");
    inputList.forEach((e, i) => {
        values.push(`${inputList[i].getAttribute("placeholder")}: ${e.value}`);
    });

    selectList.forEach((e,i) => {
        values.push(`${selectList[i].getAttribute("placeholder")}: ${e.value}`);
    });
    console.log(values);

    //converts value to json format
    data = listToDict(values);

    console.log(data);

};