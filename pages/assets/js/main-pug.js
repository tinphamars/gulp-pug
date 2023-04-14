var inputName = document.getElementsByName("flexRadioDefaultName_discount");
if (inputName && inputName.length > 0) {
  Array.from(inputName).forEach((itemInputDiscount) => {
    itemInputDiscount.addEventListener("change", (event) => {
      var discountPercent = document.getElementsByClassName("discount-percent");
      var discountNumber = document.getElementsByClassName("discount-number");
      if (event.target.value == 1) {
        discountPercent[0].classList.remove("show-discount");
        discountNumber[0].classList.add("show-discount");
      } else {
        discountPercent[0].classList.add("show-discount");
        discountNumber[0].classList.remove("show-discount");
      }
    });
  });
}

// focus event for textarea
var textareaForm = document.getElementById("textarea-content");
textareaForm &&
  textareaForm.addEventListener("focus", () => {
    textareaForm.setAttribute("rows", "15");
  });
textareaForm &&
  textareaForm.addEventListener("blur", () => {
    textareaForm.setAttribute("rows", "5");
  });
// end focus event

// modal when change active field
var cryptoActive = document.getElementsByClassName("crypto-active");
var confirmModalElement = document.getElementById("modalConfirmActiveCrypto");
var modalConfirmUnActiveCrypto = document.getElementById("modalConfirmUnActiveCrypto");
if (confirmModalElement) {
  var confirmModal = new bootstrap.Modal(confirmModalElement, {
    keyboard: false,
  });
}

if (modalConfirmUnActiveCrypto) {
  var confirmModalUn = new bootstrap.Modal(modalConfirmUnActiveCrypto, {
    keyboard: false,
  });
}

if (cryptoActive.length > 0) {
  Array.from(cryptoActive).forEach(function (element) {
    element.addEventListener("change", (e) => {
      if (!e.target.checked) {
        confirmModal && confirmModal.show();
      }else {
        confirmModalUn && confirmModalUn.show();
      }
    });
  });
}
// end modal when change active field

var focusShowModal = document.getElementsByClassName("focus-show-modal");
var modalEditorElement = document.getElementById("modal-editor");

if (modalEditorElement) {
  var modalEditor = new bootstrap.Modal(modalEditorElement, {
    keyboard: false,
  });
}

if (focusShowModal.length > 0) {
  Array.from(focusShowModal).forEach(function (element) {
    element.addEventListener("focus", (e) => {
      modalEditor && modalEditor.show();
    });
  });
}

var showCryptoInSurchargeFeature = document.getElementById("change-stripe-fmc");
var showCryptoInSurchargeForm = document.getElementById("hidden-crypto");
if (showCryptoInSurchargeFeature && showCryptoInSurchargeForm) {
  showCryptoInSurchargeFeature.addEventListener("change", () => {
    if (showCryptoInSurchargeFeature.value === "STRIPE") {
      showCryptoInSurchargeForm.classList.remove("show");
    } else {
      showCryptoInSurchargeForm.classList.add("show");
    }
  });
}

// tinyEditor
tinymce.init({
  selector: ".textarea-editor",
  plugins: ["autoresize"],
  width: "100%",
  height: "50vh",
});

var offcanvasExample = document.getElementById("offcanvasAllowNotify");
var modalConform = document.getElementById("modalConform");
var modalReject = document.getElementById("modalReject");
var offcanvas = new bootstrap.Offcanvas(offcanvasExample);

modalConform.addEventListener("show.bs.modal", function () {
  offcanvas.hide();
});

modalReject.addEventListener("show.bs.modal", function () {
  offcanvas.hide();
});
