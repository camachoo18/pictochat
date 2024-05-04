const socket = io();
const form = document.getElementById('formulario');
const input = document.getElementById('inputTexto');
const messages = document.getElementById('mensajes');

let isDragging = false;
const elemento = $('section')
  $( function() {
    $( "section" ).draggable({
      start: function() {
        isDragging = true;
      },
      drag: function() {
        console.log("arrastrando")

      },
      stop: function() {
        console.log("me has soltado")
        isDragging = false;
      }
    });
  } );

function toggleChat(){
  const lista = document.querySelector("ul")
  const form = document.querySelector("form")
  lista.hidden = !lista.hidden;
  if(form.style.display === "none"){
    form.style.display = "flex";
  } else {
    form.style.display = "none"
  }
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    if(mouseIsPressed && !isDragging) {
        const datos = {
            x: mouseX,
            y: mouseY
        }
        //socket.emit("paint", datos)
      fill(0);
      //ellipse(mouseX, mouseY, 20)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }
}


form.addEventListener('submit', (e) => {
e.preventDefault();
if (input.value) {
socket.emit('chat message', input.value);
input.value = '';
}
});

socket.on('init chat', (mensajes) => {
  mensajes.reverse().forEach(mensajeOBJ => { // Invertir el orden de los nuevos mensajes del chat
    const li = document.createElement("li");
    if (mensajeOBJ.mensaje.startsWith("https://")) {
      const link = document.createElement("a");
      link.href = mensajeOBJ.mensaje;
      link.textContent = mensajeOBJ.mensaje;
      li.appendChild(link);
    } else {
      li.textContent = mensajeOBJ.mensaje;
    }
    messages.appendChild(li);
  });
});

socket.on('chat message', (msg) => {
const item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});

socket.on('paint', (datos) => {
ellipse(datos.x, datos.y, 20)
});

 