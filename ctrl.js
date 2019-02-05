var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function getevents() {
    branch = document.getElementById("branch");
    branch = branch.value;
    sel = document.getElementById("event");
    sel.innerHTML = '<option value="">select...</option>';
    firebase.database().ref('/events/' + branch).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {

            s = '"' + child.key + '"';
            console.log(s);
            sel = document.getElementById("event");
            sel.innerHTML += '<option value=' + s + ">" + child.key + "</option>"
        })
        // ...
    });
}

number = 1;

function adduser() {

    user = document.getElementById("userBlock");
    userblock = document.createElement('div');
    userblock.innerHTML = '<label>Name : </label><input type="text" id="name' + number + '"><br><br><label>Email : </label><input type="text" id="email' + number + '"><br><br>';
    user.appendChild(userblock);
    number += 1
}

function submituser() {
    event = document.getElementById("event").value;
    branch = document.getElementById("branch").value;
    if (event === "") {
        return
    }

    jso = {};
    jsu = {};
    var reg = firebase.database().ref('/registration/' + event);
    var user = firebase.database().ref('/users');
    for(var i=0;i<number;i++){
        var us = document.getElementById("name"+i).value;
        var em= document.getElementById("email"+i).value;
        if (check(em))
            alert("Checked true")
        else {
            alert("email is wrong ")
            return
        }
        jso[us] = "attended";
        jsu[us] = {
            name:us,
            email:em
        }
    }


    reg.update(jso);
    user.update(jsu).catch(function (error ) {
        alert(error.message)
    })


}

function login() {
    var email = document.getElementById("email").value;
    if (/^\w+([\.-]?\w+)*@dhishna.org+$/.test(email))
    {
    }
    else {
        alert("email incorrect");
        return
    }
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        alert("logged in.");
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("You do not have the neccesary permissions to do this.")
    });

}

function check(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
    else {
        alert("You have entered an invalid email address!")
        return (false)
    }
}
function resetuser() {
    number =0;
    user = document.getElementById("userBlock");
    user.innerHTML = '<div><label>Name : </label><input type="text" id="name' + number + '"><br><br><label>Email : </label><input type="text" id="email' + number + '"><br><br></div>'
    number+=1
}