const d = document,
    $main = d.querySelector("main"),
    // $files = d.getElementById('files');
    $dropZone = d.querySelector(".drop-zone");
const uploader = (file) => {
    const xhr = new XMLHttpRequest(); //object xhr.
    const formData = new FormData(); //simulated forms.
    formData.append('file', file);

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

    //Petition to the server.
    xhr.open("POST", "server/uploader.php") //open peticion for procesing server.
    xhr.setRequestHeader("enc-type", "multipart/form-data") //creating headers for data extriction (especified extrict type of  files for procesed)  
    xhr.send(formData); //send you forms. 
}

const progressUpload = (file) => {
    const $progress = d.createElement("progress"), //creating elements.
        $span = d.createElement("span");

    $progress.value = 0; //add values
    $progress.max = 100;
    $main.insertAdjacentElement("beforeend", $progress); //insert elements 
    $main.insertAdjacentElement("beforeend", $span);

    const fileReader = new FileReader(); //creating ibject fileReader
    fileReader.readAsDataURL(file);

    fileReader.addEventListener("progress", e => {
        //
        let progress = parseInt((e.loaded * 100) / e.total);
        $progress.value = progress; //set values.
        $span.innerHTML = `<b>${file.name}- ${progress} %</b>`;
    });

    fileReader.addEventListener("loadend", e => {
        //upload info in server.

        uploader(file);
        setTimeout(() => {
            $main.removeChild($progress),
                $main.removeChild($span);
            //$files.value = ""
        }, 3000);
    });
}

$dropZone.addEventListener("dragover", e => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();

    e.target.classList.add("is-active")
});

$dropZone.addEventListener("dragleave", e => {
    e.preventDefault();
    e.stopPropagation();

    e.target.classList.remove("is-active")
})


$dropZone.addEventListener("drop", e => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    files.forEach(element => progressUpload(element))
    e.target.classList.remove("is-active")
})

/*
d.addEventListener("change", e => { //Get files input.
    if (e.target === $files) {
        const files = Array.from(e.target.files); // get all files. with foreach in method Array.
        files.forEach(element => progressUpload(element))
    }
})
*/