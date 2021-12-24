const d  = document;

d.addEventListener("DOMContentLoaded", e => {
    const includeHTML = (el, url) => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", e => {

            if (xhr.status !==4) {
                
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                el.outerHTML = xhr.responseText;
            }else{
                let mensaje = `${xhr.statusText} || error al cargar archivos `
                el.outerHTML = `<div><p>${mensaje}<p></div>`
            }
        })

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-type", "text/html; charset= utf-8");
        xhr.send();
    }
    
    d.querySelectorAll("[data-include]").forEach(el => includeHTML(el, el.getAttribute("data-include")));
})