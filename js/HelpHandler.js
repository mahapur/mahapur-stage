function render(helpArr) {
    let tableBody = document.getElementById("table-id");
    tableBody.innerHTML = "";
    for (let i = 0; i < helpArr.length; i++) {
        let newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        let newCell = document.createElement("td");
        newCell.textContent = helpArr[i].description;
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
    createHelpInfo(successCallback, help);
    return false;
}

function successCallback(data) {
    console.log("data ", data);
    alert("Help created, Thank you");
    this.window.location.replace("/mahapur-stage/index.html");
    return false;
}
