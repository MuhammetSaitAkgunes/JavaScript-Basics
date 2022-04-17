class Storage {

    static getSearchedUsersFromStorage(){
        // tüm kullanıcılar alındı

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"))
        }

        return users;
    }

    static addSearchedUserToStorage(username){
        // kullanıcı ekle

        let users = this.getSearchedUsersFromStorage();

        // IndexOf
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage(){
        // tüm kullanıları sil

        localStorage.removeItem("searched");

    }
}