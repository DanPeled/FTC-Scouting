function listToDict(list) { // converts from string to json format.
    var dict = {};
    for (var i = 0; i < list.length; i++) {
        var parts = list[i].split(': ');
        var key = parts[0];
        var value = parts[1];
        dict[key] = value;
        console.log(i);
    }
    return dict;
}


const addValues = (lst) => {
    let values = [];
    lst.forEach((e, i) => {
        values.push(`${lst[i].getAttribute("json")}: ${e.value}`);
    });
    return values;
}

const addRawInputValues = (lst) => {
    let values = [];
    list.forEach( e => { values.push(e.value); });
    return values;
}


const submitValues = () => {
    values = []; // Resetting values
    values = addValues(document.querySelectorAll("input"));
    jsonFormat = listToDict(values);
    console.log(values);
    console.log(jsonFormat);
    addListOfData(addRawInputValues(document.querySelectorAll("input")));
};


const addListOfData = lst => {
    
}


