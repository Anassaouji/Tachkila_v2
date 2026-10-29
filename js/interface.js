

export function modalOpenAndClose() {
    const modalAjout = document.querySelector(".modal-ajout");
    const btnAjout = document.querySelector(".btn-ajout");
    const btnHidden = document.querySelector(".btn-hidden");
    const btnAnulle = document.querySelector(".btn-annule");

    btnAjout.addEventListener("click", () => {


        const inputName = document.querySelector("input[type='text']");
        const numberInput = document.querySelector('input[name="numero"]');
        const inputAge = document.querySelector('input[name="age"]');
        const selectPost = document.querySelector('select[name="post"]');
        const selectStatus = document.querySelector('select[name="status"]');
        inputName.value = "";
        numberInput.value = "";
        inputAge.value = "";
        selectPost.value = "";
        selectStatus.value = "";


        modalAjout.classList.remove("hidden");

    })
    btnHidden.addEventListener("click", () => {
        modalAjout.classList.add("hidden");
    })
    btnAnulle.addEventListener("click", () => {
        modalAjout.classList.add("hidden");
    });
}

export function initialiserModalAjout() {
    const inputName = document.querySelector("input[type='text']");
    const inputNumber = document.querySelector('input[name="numero"]');
    const inputAge = document.querySelector('input[name="age"]');
    const selectPost = document.querySelector('select[name="post"]');
    const selectStatus = document.querySelector('select[name="status"]');

    inputName.value="";
    inputNumber.value="";
    inputAge.value="";
    selectPost.value="";
    selectStatus.value="";
}