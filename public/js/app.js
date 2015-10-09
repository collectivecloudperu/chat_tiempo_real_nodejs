var socket = io.connect('http://localhost:4000');

function addMessage (data) {
$('#mensajes').prepend('<li class="list-group-item">' +
    '<h4 class="list-group-item-heading">' + data.nombre + '</h4>' +
    '<p class="list-group-item-text">' + data.mensaje + '</p>' +
  '</li>');
};

socket.on('messages-available', function (data) {
  for (var i = 0; i < data.length; i++) {
    addMessage(data[i]);
  }
});

socket.on('message-added', addMessage);

$('#create-message').submit(function (e) {

    e.preventDefault();

    socket.emit('add-message', {
    nombre: $('input[name="nombre"]').val(),
    mensaje: $('textarea[name="mensaje"]').val()
  });

    $('textarea[name="mensaje"]').val('');

});