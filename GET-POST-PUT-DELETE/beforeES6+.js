class Request {
    // işlemlerin yürütüleceği request objesi oluşturuldu.
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    // GET Request
    get(url, callback) {

        this.xhr.open("GET", url); // bağlantı açıldı.
        this.xhr.onload = () => {

            // 200 kodu başarılı şekilde bağlantı sağlandığını ve response döndüğünü temsil eder.
            if (this.xhr.status === 200) {
                callback(null, this.xhr.responseText); // istek burada bitti.
            }
            else {
                // hata olma durumu
                callback("GET Req: Bir hata oluştu !", null);
            }
        };

        this.xhr.send(); // istek gönderildi.
    }

    // POST Request
    post(url, data, callback) {

        this.xhr.open("POST", url);
        // json formatında bir veri göndereceğimizi ifade ettik.
        this.xhr.setRequestHeader("Content-Type", "application/json");

        this.xhr.onload = () => {
            if (this.xhr.status === 201) {
                // başarılı
                callback(null, this.xhr.responseText);
            }
            else {
                callback("POST Req: Bir hata oluştu !", null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }

    //PUT Request
    put(url, data, callback) {

        this.xhr.open("PUT", url);
        this.xhr.setRequestHeader("Content-Type", "application/json");  // JSON verisi

        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                // başarılı
                callback(null, this.xhr.responseText);
            }
            else {
                callback("PUT Req: Bir hata oluştu !", null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }

    // DELETE Request
    delete(url, callback) {

        this.xhr.open("DELETE", url);

        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, this.xhr.responseText);
            }
            else {
                callback("DELETE Req: Bir hata oluştu !", null);
            }
        }
        this.xhr.send();
    }
}

const request = new Request();

// request.get("https://jsonplaceholder.typicode.com/albums",function(err,response){
//     if (err === null){
//         // Başarılı
//         console.log(response);
//     }
//     else {
//        // Hata
//        console.log(err); 
//     }

// });
// request.get("https://jsonplaceholder.typicode.com/albums/51",function(err,response){
//     if (err === null){
//         // Başarılı
//         console.log(response);
//     }
//     else {
//        // Hata
//        console.log(err); 
//     }

// });

// request.post("https://jsonplaceholder.typicode.com/albums",{userId:2,title:"Thriller"},function(err,album){

//     if (err === null){
//         console.log(album);
//     }
//     else {
//         // Hata
//         console.log(err);
//     }


// })

// request.put("https://jsonplaceholder.typicode.com/albums/10",{userId:143,title:"Tarkan Karma"},function(err,album){

//     if (err === null){
//         console.log(album);
//     }
//     else {
//         // Hata
//         console.log(err);
//     }


// })
request.delete("https://jsonplaceholder.typicode.com/albums/10", function (err, response) {
    if (err === null) {
        // Başarılı
        console.log(response);
    }
    else {
        // Hata
        console.log(err);
    }

});
































