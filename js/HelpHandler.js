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
            sangli: ' सांगली  ',
            kolhapur: ' कोल्हापुर ',
        };
        return map[value];
    }

    function getPhoneLink(value) {
        if (value == null) {
            return '-';
        }
        let element = document.createElement("a");
        element.innerHTML = value;
        element.setAttribute("href", "tel:" + value);
        return element;
    }

    for (let i = 0; i < helpArr.length; i++) {
        let newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        let newCell = document.createElement("td");
        let element = helpArr[i];
        let div = document.createElement("div");
        div.innerHTML = getField(element.name) + " " + getCity(getField(element.city));
        div.appendChild(getPhoneLink(element.contact));
        newCell.appendChild(div);
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

function validateFields() {
    var err_str = "";
    var rc = true;

    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var description = document.getElementById("exampleMessage");

    if (name.value.length <= 3) {
        err_str = "वैध नाव प्रविष्ट करा\n";
        rc = false
    }

    if(phone.value.length !== 10) {
        err_str += "वैध फोन नंबर प्रविष्ट करा\n";
        rc = false;
    }
    if (description.value.length < 1){
        err_str += "वैध वर्णन प्रविष्ट करा\n";
        rc = false;
    }

    if (rc === false) {
        alert(err_str);
    }

    return rc;
}
function createHelp() {
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var city = document.getElementById("city");
    var category = document.getElementById("category");
    var description = document.getElementById("exampleMessage");

    if (!validateFields()) {
        return false;
    }
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
    alert("धन्यवाद!");
    this.document.location.href="/";
    return false;
}
