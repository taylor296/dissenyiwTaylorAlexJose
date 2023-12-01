const form = document.querySelector('form');
const nom = document.querySelector("#nom");
const llin1 = document.querySelector("#llin1");
const telefon = document.querySelector("#telefon");
const dia = document.querySelector("#dia");
const hora = document.querySelector("#hora");
const mensaje = document.querySelector("#mensaje");

form.onsubmit = function (event) {
    form.querySelectorAll("input").forEach(element => {
        element.dispatchEvent(new Event("input"));
    });

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Revisau les errades abans de continuar");
    }else{
        mensaje.textContent="Reserva realitzada.";
    }
    form.classList.add('was-validated');
};

/* Attach events oninput*/
nom.oninput = function () {
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomesLletres(this.value));
};
llin1.oninput = function () {
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomesLletres(this.value));
};
/* Funció que marca els inputs com a vàlids/invàlids*/
function setValidity(element, msgError) {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");

    if (msgError.length == 0) {
        element.classList.add("is-valid");
    } else {
        element.classList.add("is-invalid");
    }

    element.setCustomValidity(msgError);
    document.querySelector(`#error-${element.id}`).textContent = msgError;
}


function validaLlargaria(input, min, max) {
    if (input.length < min) return `La mida mínima és ${min}. `;
    else if (input.length > max) return `La mida máxima és ${max}. `;
    return "";
}
function nomesLletres(input) {
    var regExp = /^[A-Za-zñçáéíóúÁÉÍÓÚ\s]*$/;

    return regExp.test(input) ? "" : "Només es peremeten lletres.";
}
function nomesNumeros(input) {
    var reg = /^[0-9]*$/;
    return reg.test(input) ? "" : "Només es peremeten números.";
}