window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  // Register by phone number
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

  // register by email address
  $('#register-email').submit(async function(event) {
    event.preventDefault();
    const firstName = $('input[name="firstName"]').val(),
          lastName  = $('input[name="lastName"]').val(),
          email     = $('input[name="email"]').val(),
          password  = $('input[name="password"]').val();

    const data = {
          firstName,
          lastName,
          email,
          password,
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const user = firebase.auth().currentUser;
      user.sendEmailVerification();
      window.localStorage.setItem('emailForSignIn', email);

      $.ajax({
        type: 'POST',
        url: '/api/register-email',
        data: data,
        success: function (result, status, xhr) { 
            $('#block-register').remove();
            $('#verify-email').css('display','block');
            setTimeout(function() {
              // Reload the pages
              window.location.href = '/login-email';
            }, 3000);
        },
        error: function (xhr, status, error) {
          event.preventDefault();
          $('#alertRegister').css('display','block');
        }
      }) 

    } catch (error) {
      event.preventDefault();
      $('#alertRegister').css('display','block');
    }
  });

  // Login by email
  $('#login-form').submit(async function(event) {
    event.preventDefault();
    const email = $('input[name="email"]').val(),
          password = $('input[name="password"]').val(); 

    const data = {
      email,
      password
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (user.emailVerified) {
          $.ajax({
            type: 'POST',
            url: '/api/login-email',
            data: data,
            success: function (xhr) {            
                window.location.href = '/';
            },
            error: function (error) {
              event.preventDefault();
              $('#alertLogin').css('display','block');
            }
          })
      }
    } catch (error) {
      event.preventDefault();
      $('#alertverifyLogin').css('display','block');
    }
  });

  // Login by phonenumber
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