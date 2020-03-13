window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  // Register by phone number
  $('#register-phone-number').submit(async function (event) {
    try {
      event.preventDefault();
      const lastName = $('input[name="lastName"]').val(),
            firstName = $('input[name="firstName"]').val(),
            phoneNumber = $('input[name="phoneNumber"]').val();
  
      const appVerifier = window.recaptchaVerifier;
  
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
  
      window.confirmationResult = confirmationResult;
  
      $('#register-phone-step1').remove();
      $('#register-phone-step2').css('display', 'block');
  
      $('#register-number-verify').submit(async function (event) {
        event.preventDefault();
        const code = $('input[name="code"]').val();
        await confirmationResult.confirm(code);
  
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        
        const body = {
          lastName,
          firstName,
          phoneNumber,
          idToken
        }
  
        $.ajax({
          type: "POST",
          url: "/api/register-phone-number",
          data: body,
          success: function(xhr) {
            if (xhr.status === 201) {
              window.location.href = '/login-phone-number';
            }
          },
          error: function(xhr) {
              $('#alert').css('display','block');
          }
        })
      });  
    } 
    catch (error) {
      $('#alert').css('display','block');
    }
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
            success: function (xhr,status) {
                localStorage.setItem('token', JSON.stringify(xhr.token));   
                window.location.href = '/';
            },
            error: function (error) {
              console.log(error);
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
  $('#login-phone-number').submit(async function (event) {
    try {
      event.preventDefault();

      const phoneNumber = $('input[name="phoneNumber"]').val();
      const appVerifier = window.recaptchaVerifier;
      
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);

      window.confirmationResult = confirmationResult;

      $('#login-phone-step1').remove();
      $('#login-phone-step2').css('display', 'block');

      $('#login-number-verify').submit(async function (event) {
        event.preventDefault();

        const codeLoginPhone = $('input[name="codeLoginPhone"]').val(); 

        await confirmationResult.confirm(codeLoginPhone);

        const idToken = await firebase.auth().currentUser.getIdToken(true);
            
        const body = {
          phoneNumber,
          idToken
        }

        $.ajax({
          type: "POST",
          url: "/api/login-phone-number",
          data: body,
          success: function(xhr) {
            if (xhr.status === 201) {
              window.location.href = '/';
            }
          },
          error: function(xhr) {
              $('#alertauthenLogin').css('display','block');
          }
        });          
      });
    }
    catch (error) {
      window.location.reload();
    }
  });