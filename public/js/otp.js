const queryParams = new URLSearchParams(location.search);
const whatsappNumber = queryParams.get("whatsappNumber");
const countryCode = queryParams.get("countryCode");

const inputs = document.querySelectorAll("input");
inputs[1].value = whatsappNumber;
inputs[2].value = countryCode;