$(document).ready(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDejfStDoByVKifD7hdO2brhgSp4Tmnpiw",
    authDomain: "messager-demo-b0470.firebaseapp.com",
    databaseURL: "https://messager-demo-b0470.firebaseio.com",
    projectId: "messager-demo-b0470",
    storageBucket: "",
    messagingSenderId: "664606940941",
    appId: "1:664606940941:web:9ae2ab459eb2c231e71a44"
  };

  firebase.initializeApp(firebaseConfig);

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  $('#login-phone-number').submit(function (event) {
    event.preventDefault();

    const phoneNumber = $('input[name="phoneNumber"]').val();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        const firstName = $('input[name="firstName"]').val();
        const lastName = $('input[name="lastName"]').val();
        $('#login-phone-step1').remove();
        $('#login-phone-step2').css('display', 'block');

        $('#phone-number-verify').submit(function (event) {
          event.preventDefault();
          const code = $('input[name="code"]').val();
          confirmationResult.confirm(code).then(function (result) {
            var user = result.user;
            console.log(user);

            const body = {
              firstName,
              lastName,
              phoneNumber,
              forceRefresh: user.refreshToken
            }
            $.post('/login-phone-number', body);

          }).catch(function (error) {
            console.log('error2', error);
          });
        });
      }).catch(function (error) {
        console.log('error', error);
      });
  })
});
