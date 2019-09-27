$(document).ready(function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  $('#register-phone-number').submit(function (event) {
    event.preventDefault();
    const lastName = $('input[name="lastName"]').val();
    const firstName = $('input[name="firstName"]').val();
    const phoneNumber = $('input[name="phoneNumber"]').val();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        $('#register-phone-step1').remove();
        $('#register-phone-step2').css('display', 'block');
        $('#register-number-verify').submit(function (event) {
          event.preventDefault();
          const code = $('input[name="code"]').val();
          confirmationResult.confirm(code).then(function (result) {
            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
              const user = result.user;
              console.log(user);
              const body = {
                lastName,
                firstName,
                phoneNumber,
                idToken
              }
              console.log(body);
              $.ajax({
                type: "POST",
                url: "/register-phone-number",
                data: body,
                success: function(data) {
                  if (data.success) {
                    window.location.href = '/login-phone-number';
                  }
                  else {
                    $('#alert').css('display','block');
                  }
                }
              })
            })            
          });
        });
      });
  })
});

$(document).ready(function() {
  $('#register-email').submit(function(event) {
    event.preventDefault();
    const firstName = $('input[name="firstName"]').val();
    const lastName = $('input[name="lastName"]').val();
    const email = $('input[name="email"]').val();
    const password = $('input[name="password"]').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        const user = firebase.auth().currentUser;
        user.sendEmailVerification();
        window.localStorage.setItem('emailForSignIn', email);
        const body = {
          firstName,
          lastName,
          email,
          password,
        }
        $.ajax({
          type: 'POST',
          url: '/register-email',
          data: body,
          success: function (data) {            
            if (data.success) {
              $('#block-register').remove();
              $('#verify-email').css('display','block');
            }
            else {
              window.location.href = '/register-email';
            }
          }
        })
      })  
    .catch(function(error) {
      event.preventDefault();
      $('#alertRegister').css('display','block');
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
        console.log(user);
          const body = {
            email,
            password
          }
          $.ajax({
            type: 'POST',
            url: '/login-email',
            data: body,
            success: function (data) {            
              if (data.href) {
                window.location.href = `${data.href}`;
              }
              else {
                event.preventDefault();
                $('#alertLogin').css('display','block');
              }
            }
          })
      } 
      else {
        console.log(user.emailVerified);
        
        event.preventDefault();
        $('#alertverifyLogin').css('display','block');
      }
  });
});

  $(document).ready(function () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    $('#login-phone-number').submit(function (event) {
      event.preventDefault();
      const phoneNumber = $('input[name="phoneNumber"]').val();
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          window.confirmationResult = confirmationResult;
          $('#login-phone-step1').remove();
          $('#login-phone-step2').css('display', 'block');
          $('#login-number-verify').submit(function (event) {
            event.preventDefault();
            const codeLoginPhone = $('input[name="codeLoginPhone"]').val();          
            confirmationResult.confirm(codeLoginPhone).then(function (result) {
              firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                console.log(idToken);
                const body = {
                  phoneNumber,
                  idToken
                }
                console.log(body);
                $.ajax({
                  type: "POST",
                  url: "/login-phone-number",
                  data: body,
                  success: function(data) {
                    console.log(data);
                    if (data.success) {
                      window.location.href = '/';
                    }
                    else {
                      $('#alertauthenLogin').css('display','block');
                    }
                  }
                })
              })            
            }).catch((error) => {
              window.location.reload();
              console.log(error);
            });
          })
      });
    })
  });

$(document).ready(function() {
    $("#logout").submit(function(event) {
      console.log('got die');
      
      event.preventDefault();
      firebase.auth().signOut().then(function() {
        window.location.href = '/logout'
      }).catch((error) => {
        console.log('got raped');
      })
    })
});

$(document).ready(function() {
  $("#addFriend").submit(function(event) {
    event.preventDefault();
    const name = $('input[name="email"]').val();
    $.ajax({
      type: "POST",
      url: "/add-friend",
      data: email,
      success: function(data) {
        if (data.sended) {
          $('#success').css('display','block');
        }
        else {
          $('#alert').css('display','block');
        }
      }
    })
  })
})