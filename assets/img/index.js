const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const utmSource = urlParams.get("utm_source");
const utmCampaign = urlParams.get("utm_campaign");
const utmContent = urlParams.get("utm_content");
const utmTerm = urlParams.get("utm_term");

let origem = "";
let origem_completa = "";

if (utmSource) {
    if (utmSource === "google") {
        origem = "Google";
        origem_completa = `${utmCampaign}/${utmContent}/${utmTerm}`;
    } else if (utmSource === "facebook") {
        origem = "Facebook";
        origem_completa = `${utmCampaign}/${utmContent}`;
    }
} else {
    origem = "Orgânico";
    origem_completa = "Orgânico";
}

console.log(origem_completa);

document.querySelectorAll('[id^="cf_duna_origem_lead"]').forEach(e => {
    e.value = origem;
});

document.querySelectorAll('[id^="cf_duna_origem_completa"]').forEach(e => {
    e.value = origem_completa;
});

document.addEventListener("DOMContentLoaded", function () {
    function showError(element, message, input) {
        element.innerHTML = message;
        element.classList.add("show");
        element.classList.remove("success");
        input.classList.add("error");
        input.classList.remove("success");
    }

    function clearError(element, input) {
        element.innerHTML = "";
        element.classList.remove("show");
        input.classList.remove("error");
        input.classList.add("success");
    }

    function validateForm(form) {
        const nome = form.querySelector(".nome");
        const email = form.querySelector(".email");
        const telefone = form.querySelector(".telefone");
        const errorContainer = form.querySelector(".error-message-container");

        const isNameValid = nome.value.length >= 3;
        const isEmailValid = email.value.length >= 6 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        const isPhoneValid = /^\d{11,}$/.test(telefone.value.replace(/[^\d]/g, ""));

        if (!isNameValid) {
            showError(errorContainer, "Por favor, insira um nome válido com pelo menos 3 caracteres.", nome);
            return false;
        }
        clearError(errorContainer, nome);

        if (!isEmailValid) {
            showError(errorContainer, "Por favor, insira um e-mail válido com pelo menos 6 caracteres.", email);
            return false;
        }
        clearError(errorContainer, email);

        if (!isPhoneValid) {
            showError(errorContainer, "Por favor, insira um telefone válido com pelo menos 11 caracteres.", telefone);
            return false;
        }
        clearError(errorContainer, telefone);

        return true;
    }

    function handleFormSubmission(formSelector) {
        const form = document.querySelector(formSelector);
        const submitButton = form.querySelector("button[type='submit']");
        const errorContainer = form.querySelector(".error-message-container");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            errorContainer.classList.remove("show", "success", "error");
            errorContainer.classList.add("carregando");

            setTimeout(function () {
                if (validateForm(form)) {
                    document.querySelectorAll(".sumir-btn").forEach(e => (e.style.display = "none"));
                    document.querySelectorAll('button[type="submit"]').forEach(e => (e.style.display = "none"));

                    errorContainer.innerHTML = "Formulário enviado com sucesso!";
                    errorContainer.classList.add("show", "success");
                    errorContainer.classList.remove("error");

                    setTimeout(function () {
                        window.location.href = "sucesso.php";
                    }, 100);
                }
            }, 500);
        });

        form.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", function () {
                submitButton.disabled = !validateForm(form);
            });
        });
    }

    handleFormSubmission(".contact-form-1");
    handleFormSubmission(".contact-form-2");
    handleFormSubmission(".contact-form-3");
});

document.querySelectorAll(".data-button").forEach(button => {
    button.addEventListener("click", function () {
        const content = this.getAttribute("data-button-content");

        document.querySelectorAll(".data-button-content").forEach(e => {
            e.textContent = content;
        });

        document.querySelectorAll(".local-form").forEach(e => {
            e.value = content;
        });
    });
});

const telefoneInputs = document.querySelectorAll(".mask-tel");
telefoneInputs.forEach(input => {
    input.addEventListener("input", e => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, "($1");
        } else if (value.length <= 7) {
            value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        }

        e.target.value = value;
    });
});