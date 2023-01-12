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
    lst.forEach((e, i) => {
        values.push(`${lst[i].getAttribute("placeholder")}: ${e.value}`);
    });
}

const submitValues = () => {
    values = []; // Resetting values
    addValues(document.querySelectorAll("input"));

    console.log(values);
};


