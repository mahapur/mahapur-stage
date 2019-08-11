function render(helpArr) {
    let tableBody = document.getElementById("table-id");
    tableBody.innerHTML = "";

    function getField(element) {
        return element != null ? element : '-';
    }

    function getCity(value) {
        if (value === '-') {
            return value;
        }
        let map = {
            sangli: 'सांगली',
            kolhapur: 'कोल्हापुर',
        };
        return map[value];
    }

    for (let i = 0; i < helpArr.length; i++) {
        let newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        let newCell = document.createElement("td");
        let element = helpArr[i];
        let div = document.createElement("div");
        div.textContent = getField(element.name) + " (" + getField(element.contact) + ") " + getCity(getField(element.city));
        newCell.appendChild(div);
        let br = document.createElement("br");
        newCell.appendChild(br);
        let descriptionDiv = document.createElement("div");
        descriptionDiv.innerHTML = element.description;
        newCell.appendChild(descriptionDiv);
        newRow.appendChild(newCell);
    }
    console.log(helpArr)
}

function getAndRender() {
    getHelpInfo(render);
}

function createHelp() {
    let name = document.getElementById("name");
    let phone = document.getElementById("phone");
    let city = document.getElementById("city");
    let category = document.getElementById("category");
    let description = document.getElementById("exampleMessage");
    let help = {
        name: name.value,
        description: description.value,
        contact: phone.value,
        city: city.options[city.selectedIndex].value,
        helpType: category.options[category.selectedIndex].value,
    };
    createHelpInfo(successCallbackForPost, help);
    return false;
}

function successCallbackForPost(data) {
    console.log("data ", data);
    alert("धन्यवाद");
    this.document.location.href="/";
    return false;
}
