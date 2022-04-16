document.getElementById("change").addEventListener("click", change);

function change() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://api.exchangeratesapi.io/v1/latest?access_key=ad045528d9f2769f95bc1d4d022e9b9a&format=1");

    xhr.onload = function () {
        if (this.status) {
            const response = JSON.parse(this.responseText);
            //console.log(this.responseText);
            const rate = response.rates.TRY
            const amount = Number(document.getElementById("amount").value);

            document.getElementById("tl").value = amount * rate;
        }
    }

    xhr.send();
}