/*get document for user - prepared solicitude  - process-server - send-response to the fronted */
const d = document,
    $main = d.querySelector(".main"),
    $files = d.getElementById('files');

const uploader = (file) => {
    const xhr = new XMLHttpRequest(); //object xhr.

    const formData = new FormData(); //simulated forms.
    formData.append('file', file);

    //Petition to the server.
    xhr.open("POST", "server/uploader.php")//open peticion for procesing server.
    xhr.setRequestHeader("enc-type", "multipart/form-data")//creating headers for data extriction (especified extrict type of  files for procesed)  
    xhr.send(formData); //send you forms. 

    xhr.addEventListener('readystatechange', e => { //listening status.
        if (xhr.readyState !== 4) return; //validate  code errorStatus.

        if (xhr.status >= 200 && xhr.status < 300) { //validate code status ok.
            let json = JSON.parse(xhr.responseText); //parse response,
            console.log(json);
        } else {
            let message = xhr.statusText;
            console.log(message);
        }
    });
}

d.addEventListener("change", e => {//Get files input.
    if (e.target === $files) {
        const files = Array.from(e.target.files); // get all files. with foreach in method Array.
        files.forEach(element => uploader(element))
    }
})


