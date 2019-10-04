$(document).ready(function() {
  const socket = io.connect('http://localhost:4200');
  socket.on('connect', function(data) {
    socket.emit('join','Hello backend');
  })
  socket.on('sendMess', function(data) {
    $('#receivedMes').append(`
    <div class="message-item">
        <div class="message-content">${data}</div>
        <div class="message-action">| Pm 14:20</div>
    </div>`);
  })
  $('#chatBar').submit(function(e){
    e.preventDefault();
    const message = $('#chatMess').val();
    socket.emit('messages', message);
  });
});

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
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
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
    $('#logout').click(function(event) {      
      event.preventDefault();
      console.log('got die');
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
    const email = $('input[name="email"]').val();
    const body = {
      email
    }
    $.ajax({
      type: "POST",
      url: "/add-friend",
      data: body,
      success: function(data) {
        if (data.sent) {
          console.log('hello');
          $('#success').css('display','block');
        }
        else {
          $('#alert').css('display','block');
        }
      }
    })
  })
})

$(document).ready(function() {
  $('#AcceptReq').click(function(event) {
    event.preventDefault();
    const friendId = $('#AcceptReq').attr('data-id');
    alert(friendId);
    
    $.ajax({
      type: "POST",
      url: "/accept-friend",
      data: { friendId },
      success: function() {
          window.location.reload();
      }
    })
  })
})

$(document).ready(function() {
  $('#customFile').change(function(e){
    e.stopPropagation();
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = function(progressEvent) {
      const url = reader.result;
      console.log(url);
      
      const fd = new FormData();
      fd.append('avatar',url);
        $.ajax({
          type: "POST",
          data: fd,
          url: "/upload-profile-image",
          processData: false,
          enctype: "multipart/form-data",
          contenType: false,
          success: function(data) {
            console.log('hello');
            }
          })
    }
    reader.readAsDataURL(file);
    // $('#personelForm').submit(function(event) {
    //   event.preventDefault();
  });
})

$(document).ready(function(){
  $('#Unfriend').click(function(event) {
    event.preventDefault();
    const friendId = $('#AcceptReq').attr('data-id');
    $.ajax({
      type: "POST",
      data: { friendId },
      url: "/unfriend",
      success: function(data){
        if(data) {
          alert('success');
        }
        else alert('die');
      }
    })
  })
});