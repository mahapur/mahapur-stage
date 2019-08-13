let helpData;

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
            sangli: ', सांगली  ',
            kolhapur: ', कोल्हापुर ',
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
        element.setAttribute("onclick", "ga('send', 'event', 'usage', 'phone number clicked', " + value + ");")
        return element;
    }

    for (let i = 0; i < helpArr.length; i++) {
        let newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        let newCell = document.createElement("td");
        let element = helpArr[i];
        let div = document.createElement("div");
        // div.style.fontWeight = 'bold';
        // div.innerHTML = getField(element.name) + getCity(getField(element.city));
        div.innerHTML = getField(element.name) + " (" + getField(element.helpType) + ")";
        newCell.appendChild(div);
        let phoneCell = document.createElement("div");
        phoneCell.innerHTML = "फोन - ";
        phoneCell.appendChild(getPhoneLink(element.contact));
        newCell.appendChild(phoneCell);
        let descriptionDiv = document.createElement("div");
        descriptionDiv.innerHTML = element.description;
        newCell.appendChild(descriptionDiv);
        newRow.appendChild(newCell);
    }
}

function getAndRender() {
    getHelpInfo((data) => {
        this.helpData = data;
        render(data);
    });
}

function renderWithFilter() {
    const city = document.getElementById("city").value;
    const category = document.getElementById("category").value;
    let helpList = this.helpData;
    const finalList = helpList.filter(help => {
        return (city === '-' || help.city === city) && (category === '-' || help.helpType === category);
    });
    render(finalList);
}

function validateFields() {
    let err_str = "";
    let rc = true;

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const description = document.getElementById("exampleMessage");

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
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const category = document.getElementById("category");
    const description = document.getElementById("exampleMessage");

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
