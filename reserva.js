const form = document.querySelector('form');
const nom = document.querySelector("#nom");
const llin1 = document.querySelector("#llin1");
const telefon = document.querySelector("#telefon");
const dia = document.querySelector("#dia");
const hora = document.querySelector("#hora");


const usuaris = ["daniel82", "manuel223", "darknight1", "mrNum.1234"];

form.onsubmit = function (event) {
    form.querySelectorAll("input").forEach(element => {
        element.dispatchEvent(new Event("input"));
    });

    validaCaptcha();

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Revisau les errades abans de continuar");
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
function comprovaUsuari(input, array) {
    return array.includes(input) ? "Aquest username ja está agafat" : "";
}
function comprovaPassword(input) {
    var regex = /^(?=.*\d)(?=.*[\W])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    return regex.test(input) ? "" : "Password no segur";
}
function nomesNumeros(input) {
    var reg = /^[0-9]*$/;
    return reg.test(input) ? "" : "Només es peremeten números.";
}
function validaDNI(input) {
    var numero, let, letra;
    var expresion_regular_dni = /^\d{8}[A-Z]$/;

    input = input.toUpperCase();

    if (expresion_regular_dni.test(input) === true) {
        numero = input.substr(0, input.length - 1);
        let = input.substr(input.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        return letra != let ? "Lletra inválida" : "";
    } else {
        var num = /^[0-9]*$/;
        return num.test(input) ? "" : "DNI inválid";
    }
}