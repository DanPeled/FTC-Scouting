let values = [];

function listToDict(list){ // converts from string to json format.
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

const submitValues = () => {
    inputList = document.querySelectorAll("input");
    inputList.forEach((e, i) => {
        values.push(`${inputList[i].getAttribute("placeholder")}: ${e.value}`);
    });
    console.log(values);

    //converts value to json format
    data = listToDict(values);

    console.log(data);

};
