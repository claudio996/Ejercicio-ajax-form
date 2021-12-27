const d = document;

const contactForm = () => {
    const $form = d.querySelector(".contact-form"),
        $inputRequired = d.querySelectorAll(".contact-form [required]");

    $inputRequired.forEach(input => { //set inputs required
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
        input.insertAdjacentElement("afterend", $span);
    })

    d.addEventListener("keyup", e => {

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
        // alert("enviado a mis amigos") //

        const $loader = d.querySelector(".contact-form-loader"),
            $response = d.querySelector('.contact-form-response'); //loader
        $loader.classList.remove("none"); //removemos la clase  none
        alert("procesando")
            //simulando una peticion a ajax--- u axios.
        setTimeout(() => {
            $loader.classList.add("none"); //removemos la clase  none
            $response.classList.remove("none") //loader
            $form.reset();

            setTimeout(() => {
                $response.classList.add("none")
            }, 3000);
        }, 3000);
    })
}