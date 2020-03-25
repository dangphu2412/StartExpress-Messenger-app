$(document).ready(function () {

  addNewFriend();
  logOut();


  function addNewFriend() {
    // add-friends-modal
    $('#addFriend').on('submit', async (event) => {
      event.preventDefault();
      const email = $('#emailAddFriend').val();
      const message = $('#messageAddFriend').val();
      const url = '/api/friends';
      const data = {
        email,
        message
      };
      const token = window.localStorage.getItem('sc');
      console.log(token);
      let hasEmail = email.trim() !== '' ? true : false;
      if (hasEmail) {
        $('#alert').addClass('hidden');
        $.ajax({
          type: 'POST',
          url,
          data,
          beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
          },
          success: () => {
            console.log('hello');
          },
          error: () => {
            console.log('Failed');
          }
        })
      }
      
      $('#alert').removeClass('hidden');
    })

  }

  function logOut() {
    // Log out
    try {
      $('#logout').on('click', async function(event) {      
        event.preventDefault();
        await firebase.auth().signOut();
        const url = '/api/logout';
        $.ajax({
          type: 'POST',
          url,
          success: (xhr) => window.location.href = '/',
          error: (error) => alert('Can\'t sign out')
        })
      })
    } catch (error) {
      alert(error);
    }
  }
})