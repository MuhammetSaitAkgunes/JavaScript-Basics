// elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

// request atarken kullanılacak nesneyi üretildi.
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    
    let username = nameInput.value.trim();

    if (username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz !");
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                // geçeersiz kullanıcı adı girildi hata mesajı
                ui.showError("Kullanıcı adı geçersiz !")
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfos(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); // input alanı temizleme
    e.preventDefault();
}

function clearAllSearched(){
    //tüm arananlar temizlenecek

    if(confirm("Emin misiniz ?")){
        Storage.clearAllSearchedUsersFromStorage(); // storage clear
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    // arananlar storagedan alınıp arayüze eklenecek.

    let users = Storage.getSearchedUsersFromStorage();

    let results = "";
    users.forEach(user => {

        results += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = results;
}