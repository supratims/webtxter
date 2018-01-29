var signin = (function(){
  var singleton;

  var _init = function(){
    $('.js-root').on('submit', '.js-sigin', function(event){
      event.preventDefault();
      var email = $(this).find('[name="email"]').val();
      var password = $(this).find('[name="pass"]').val();
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    });

  };

  singleton = {
    init: _init
  };

  return singleton;
})();

var signup = (function(){
  var singleton;

  var _init = function(){
    $('.js-root').on('submit', '.js-sigup', function(event){
      event.preventDefault();
      var email = $(this).find('[name="email"]').val();
      var password = $(this).find('[name="pass"]').val();
      var confirmPassword = $(this).find('[name="cnfpass"]').val();
      if (password!==confirmPassword){
        alert("Passwords must match ..");
        return false;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    });
  }

  singleton = {
    init: _init
  };

  return singleton;
})();

var messages = (function(){
  var singleton;

  var _init = function(){

  }

  singleton = {
    init: _init
  };

  return singleton;
})();

var page = (function(){
  var singleton;

  function onLogin(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        alert("Logged in user ");
        console.log(user);
      } else {
        alert("No user found");
      }
    });
  }

  function loadUser(){
    var user = firebase.auth().currentUser;
    if (user != null){
      alert("User found ");
    }
    else {
      alert("User not found ");
    }
  }

  function _init(){
    loadUser();
  }

  singleton = {
    init: _init
  };

  return singleton;
})();

var signout = (function(){

  function doSignout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
})();

$(document).ready(function(){
  $('.js-goto-signin').click(function(event){
    event.preventDefault();

    $('.js-signup').addClass('d-none');
    $('.js-signin').removeClass('d-none');
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCMa8bKOi05lOOdyrTdATJMYqaWj7QielU",
    authDomain: "webtxter.firebaseapp.com",
    databaseURL: "https://webtxter.firebaseio.com",
    //storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "701929446885",
  };
  firebase.initializeApp(config);

  signup.init();
  signin.init();
  page.init();
});
