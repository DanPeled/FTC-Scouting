let values = [];

const addValues = (lst) => {
    lst.forEach((e,i) => {
        values.push(`${inputList[i].getAttribute("placeholder")}: ${e.value}`);
    });
}

const submitValues = () => {
    values = []; // Resetting values
    addValues(document.querySelectorAll("input"));
    addValues(document.querySelectorAll("select.info"));
    
    console.log(values);
};




