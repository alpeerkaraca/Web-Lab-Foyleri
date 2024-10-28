function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            listStudents(this);
        }
    }
    xhttp.open("GET", "data/datalist.xml", true);
    xhttp.send();
};

listStudents = (xml) => {
    var xmlDoc = xml.responseXML;
    const students = xmlDoc.getElementsByTagName("student");
    let output = "";
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const name = student.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        const number = student.getElementsByTagName("number")[0].childNodes[0].nodeValue;
        output += `<tr onclick="getStudentDetails(${i})"><td>${name}</td><td>${number}</td></tr>`;
    }
    document.getElementById("table-body").innerHTML = output;
}

window.onload = loadDoc;


getStudentDetails = (index) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showStudentDetails(this, index);
        }
    }
    xhttp.open("GET", "data/datalist.xml", true);
    xhttp.send();
}

showStudentDetails = (xml, index) => {
    var xmlDoc = xml.responseXML;
    const students = xmlDoc.getElementsByTagName("student");
    const student = students[index];
    const name = student.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    const number = student.getElementsByTagName("number")[0].childNodes[0].nodeValue;
    const year = student.getElementsByTagName("year")[0].childNodes[0].nodeValue;
    const major = student.getElementsByTagName("major")[0].childNodes[0].nodeValue;

    const output = 
    "<div id='container'>" + "<div id='student-details'>" +
    `
    <p>
        <strong>Ad - Soyad:</strong> ${name}<br>
        <strong>Numara:</strong> ${number}<br>
        <strong>Yıl:</strong> ${year}<br>
        <strong>Bölüm:</strong> ${major}<br>
    </p>
    ` +
    "</div> </div>" ;
    document.getElementById("student-det").innerHTML = output;
}

