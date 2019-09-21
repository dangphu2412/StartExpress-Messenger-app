const firebaseConfig = {
  apiKey: "AIzaSyC3v9mPibbjAKwzx7nAAJGz0GGvOS6oga4",
  authDomain: "messenger-app-13147.firebaseapp.com",
  databaseURL: "https://messenger-app-13147.firebaseio.com",
  projectId: "messenger-app-13147",
  storageBucket: "",
  messagingSenderId: "889064671267",
  appId: "1:889064671267:web:5c698c3d471ae6b1a3c996"
};
firebase.initializeApp(firebaseConfig);
$(document).ready(function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  $('#login-phone-number').submit(function (event) {
    event.preventDefault();

    const phone_number = $('input[name="phone_number"]').val();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phone_number, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        const firstname = $('input[name="firstname"]').val();
        const lastname = $('input[name="lastname"]').val();
        $('#login-phone-step1').remove();
        $('#login-phone-step2').css('display', 'block');
        $('#phone-number-verify').submit(function (event) {
          event.preventDefault();
          const code = $('input[name="code"]').val();
          confirmationResult.confirm(code).then(function (result) {
            const user = result.user;
            const body = {
              firstname,
              lastname,
              phone_number,
              forceRefresh: user.refreshToken
            }
            $.ajax({
              type: "POST",
              url: "/phone-register",
              data: body,
              success: function(data) {
                console.log(data);
                if (data) {
                  $('#alert').css('display','block');
                }
                else {
                  window.location.href = '/';
                }
              }
            })

          }).catch(function (error) {
            console.log('error2', error);
          });
        });
      }).catch(function (error) {
        console.log('error', error);
      });
  });
});

$(document).ready(function() {
  const actionCodeSettings = {
    url: 'https://messenger-app-13147.firebaseapp.com/__/auth/action?mode=<action>&oobCode=<code>',
    handleCodeInApp: true,
  }
  $('#register-email').submit(function(event) {
    event.preventDefault();
    const firstname = $('input[name="firstname"]').val();
    const lastname = $('input[name="lastname"]').val();
    const email = $('input[name="email"]').val();
    const password = $('input[name="password"]').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
        $('#block-register').remove();
        $('#verify-email').css('display','block');
        window.localStorage.setItem('emailForSignIn', email);
        const body = {
          firstname,
          lastname,
          email,
          password,
        }
        $.post('/register', body);
      })  
    .catch(function(error) {
      console.log(error + "got raped");
    });
  });
});

$(document).ready(function() {
  $('#login-form').submit(function(event) {    
    event.preventDefault();
    const email = $('input[name="email"]').val();
    const password = $('input[name="password"]').val();    
    const user = firebase.auth().currentUser;
    if (user.emailVerified) {
        const body = {
          email,
          password
        }
        $.ajax({
          type: 'POST',
          url: '/authenEmail',
          data: body,
          success: function (data,error) {
            if (data.href) {
              window.location.href = `${data.href}`;
            }
            else {
              window.location.href = '/login';
            }
          }
        })
    } 
    else {
      window.location.href = '/login';
    }
  });
});
