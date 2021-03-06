const d = document,
    $main = d.querySelector("main");
console.log($main);

const getHTML = (options) => {
    let { url, success, error } = options; //crear objeto options.
    const xhr = new XMLHttpRequest(); //objeto request.
    //esperando objeto readystatechange
    xhr.addEventListener("readystatechange", e => {
        if (xhr.status >= 200 && xhr.status < 300) { //errores
            let html = xhr.responseText;
            success(html);
        } else {
            let message = xhr.statusText || "Ocurrio un error"
            error(`Error ${xhr.status} : ${message}`)
        }
    });
    //cabeceras 
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "text/html; charset=utf-8")
    xhr.send();

}
//carga de contenido.
d.addEventListener("DOMContentLoaded", e => { 
 
    getHTML({ //cabeceras
        url: "assets/home.html", // url a cargar
        success: (html) => $main.innerHTML = html,
        error: (err) => $main.innerHTML = `<h1>${error}</h1>`
    })
});

d.addEventListener("click", e => {
    alert('hola');
    if (e.target.matches(".menu a")) {
        e.preventDefault();
        getHTML({
            url: e.target.href,
            success: (html) => $main.innerHTML = html,
            error: (err) => $main.innerHTML = `<h1>${err}</h1>`
        })
    }
})