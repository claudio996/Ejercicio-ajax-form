//El dom puede trabajar en todos los ambitos del html-  html-css-logica.
const d = document;

const contactForm = () => { //
    const $form = d.querySelector(".contact-form"),
        $inputRequired = d.querySelectorAll(".contact-form [required]");

    $inputRequired.forEach(input => { //set inputs required
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
        input.insertAdjacentElement("afterend", $span);
    })

    d.addEventListener("keyup", e => { //validations

        if (e.target.matches(".contact-form [required]")) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern; //buscar expresion regular-
            //console.log($input,pattern);

            if (pattern && $input.value !== "") {
                let regex = new RegExp(pattern)
                return !regex.exec($input.value) ?
                    d.getElementById($input.name).classList.add("is-active") :
                    d.getElementById($input.name).classList.remove("is-active")

            }
            if (!pattern) {
                return $input.value === "" ?
                    d.getElementById($input.name).classList.add("is-active") :
                    d.getElementById($input.name).classList.remove("is-active")

            }
        }
    })

    d.addEventListener("submit", e => { //del lado del servidor poner loader
        e.preventDefault();

        const $loader = d.querySelector(".contact-form-loader"),
            $response = d.querySelector('.contact-form-response'); //loader
        $loader.classList.remove("none"); //removemos la clase  none

        fetch("https://formsubmit.co/ajax/desarrollopas2@gmail.com", {
                method: "POST",
                body: new FormData(e.target)
            })
            .then(resp => resp.ok ? resp.json() : Promise.reject(resp)) // wait prommise
            .then(json => { // to receibe in format json.
                console.log(json);
                $loader.classList.add("none"); //remove class none.
                $response.classList.remove("none") //loader
                $response.innerHTML = `<p>${json.message}</p>`
                $form.reset();

            })
            .catch(err => {
                console.log(err);

                let message = err.statusText || "Ocurrio un error al enviar, Intenta nuevamente";
                $response.innerHTML = `<p>Error ${err.status}, ${message}</p>`
            }).finally(() =>
                setTimeout(() => {
                    $response.classList.add("none")
                    $response.innerHTML = ""
                }, 3000))
    });
}


d.addEventListener("DOMContentLoaded", contactForm);