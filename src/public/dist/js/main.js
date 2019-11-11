$(document).ready(function() {
  const socket = io('/conversations');
  socket.on('connect', function(data) {
    socket.emit('join','Hello backend');;
  })

  socket.on('sendMess', function(msg) {
    if ($.trim(msg)) {
      $('#receivedMes').append(`
      <div class="message-item">
        <div class="message-content">${msg}</div>
        <div class="message-action">NO not socket Pm 14:20</div>
      </div>`);
      const chat_body = $('.layout .content .chat .chat-body');
      chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
        cursorcolor: 'rgba(66, 66, 66, 0.20)',
        cursorwidth: "4px",
        cursorborder: '0px'
      }).resize();
    }
  })
  socket.on('sendFriendReq', function(data) {
    console.log(data[0]);
    $('#friendReqList').append(`
      <li class="list-group-item">
        <div class="users-list-body">
            <h5>${data[0].firstName}</h5>
            <p>I know how important this file is to you. You can trust me ;)
                <div class="users-list-action action-toggle">
                    <div class="dropdown">
                        <a data-toggle="dropdown" href="#"><i class="ti-more"></i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" id="AcceptReq" data-id="${data[0].userId}" href="#">Accept</a>
                          <a class="dropdown-item" href="#">Forward</a>
                          <a class="dropdown-item" href="#">Delete</a></div>
                    </div>
                </div>
            </p>
        </div> 
      </li>
    `)
  })

  $('#logout').click(function(event) {      
      event.preventDefault();
      firebase.auth().signOut().then(function() {
        window.location.href = '/logout'
      }).catch((error) => {
        alert('Can t log out');
      })
    })


  $('#addFriend').submit(function(event) {
    event.preventDefault();
    const email = $('input[name="email"]').val();
    const body = {
      email
    }
    socket.emit('addFriend');
    $.ajax({
      type: "POST",
      url: "/add-friend",
      data: body,
      success: function(data) {
        if (data!='sent') {
          $('#addFriends').modal('hide');
        }
        else {
          $('#alert').css('display','block');
          setTimeout(function() {
            $('#addFriends').modal('hide');
            $('#alert').css('display','none');
          },200);
        }
      }
    })
  })


  $('#AcceptReq').click(function(event) {
    event.preventDefault();
    const friendId = $('#AcceptReq').attr('data-id');
    $.ajax({
      type: "POST",
      url: "/accept-friend",
      data: { friendId },
      success: function(data) {
        if (data == 'success') {
          alert('Add friend successed');
        }
      }
    })
  })


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


  $('#Unfriend').click(function(event) {
    event.preventDefault();
    const friendId = $('#friendId').attr('data-friend');
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

  $('#newGroup').submit((event) => {
    event.preventDefault();
    const id = []; 
    const idObj = [];
    $("#userFriend option:selected").each(function() {
        id.push($(this).attr('data-id'));
        idObj.push($(this).attr('data-objId'));
    });
    const data = {
      name: $("#group_name").val(),
      description: $("#description").val(),
      id: id,
      _id: idObj,
    }
    $.ajax({
      type: "POST",
      data: data,
      url: '/createGroup',
      success: function(data) {
        window.location.href = '/conversations';
      }
    })
  })

  $('#searchUser').keyup(function() {
    const value = $(this).val();
    if ($.trim(value)) {
      const data = { value };
      $.ajax({
        type: "POST",
        data: data,
        url: '/searchUser',
        success: function(data) {
          if (data) {
                $('#menuSearchUser > .dropdown-item').each(function() {
                  $(this).remove();
                });
                $('#userOption').addClass('hidden');
                data.forEach((e) => {
                  $('#menuSearchUser').append(`
                    <div class="dropdown-item">
                      <figure class="avatar">
                        <img class ="rounded-circle" src="dist/images/man_avatar2.jpg">
                      </figure>
                      <a href='#' data-id= ${e.id} data-objId=${e._id} data-name=${e.name}> ${e.name} </a>
                    </div>
                    `);
                })
            }
            else {
              $('#userOption').addClass('hidden');
            }
        }
      })  
    }
    else {
      $('#userOption').removeClass('hidden');
      $('#menuSearchUser > .dropdown-item').each(function() {
        $(this).remove();
      });
    }    
  })

  $('#menuSearchUser').on('click','a',function() {
    const id = $(this).attr('data-id');
    const _id = $(this).attr('data-objId');
    const name = $(this).attr('data-name');
    let check = 0;
    $('#userChosenGroup .avatar').each(function () {
      if ($(this).attr('data-id') == id) {
        check++;
      }
    })
    if (!check) {
      $('#userChosenGroup').append(`                  
      <figure class = "avatar del-avatar" data-toggle="tooltip" data-placement="top" title="${name}" data-id=${id}>
        <img class = "rounded-circle" src='dist/images/women_avatar1.jpg'>
      </figure> `);
      $('#userFriend').append(`
        <option selected="selected" data-id=${id} data-objId=${_id} > ${name} </option>
      `);
    }
    else {
      $('#userChosenGroup .avatar' + id).remove();
    }
  })

  $('#userChosenGroup ').on('click', '.avatar', function() {
    const id = $(this).attr('data-id');
    $('#userFriend option').each(function () {
      if ($(this).attr('data-id') == id) {
        $(this).remove();
      }
    })
    $(this).remove();
  })

  $('#FakeUser').click(function() {
    const firstName = ['','','','','','','',''];
  });

  $('#listGroup').on('click','.list-group-item', function(event) {
    event.preventDefault();
    const idConversation = $(this).attr('data-_id');
    const name = $(this).attr('data-name');
    $('.chat .messages .message-item').each(function() {
      $(this).remove();
    })
    $('#friendName').html(() => name);
    $('#chatMess').attr('data-idChat', () => idConversation);
    const room = $('#chatMess').attr('data-idChat');
    console.log(room);
    socket.emit('joinRoom', room);
  })


  $('.chat-footer').on('submit', '#chatBar', function(e) {
    e.preventDefault();
    socket.emit('messages',$('#chatMess').val());
    const mess = $('#chatMess').val();
    const idChat = $('#chatMess').attr('data-idChat');
    $.ajax({
      type: 'POST',
      data: { mess, idChat },
      url: '/sendMess',
      success: function(data) {
        console.log(data);
      }
    })
  })

})