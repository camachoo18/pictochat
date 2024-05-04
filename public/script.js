const socket = io();
const form = document.getElementById('formulario');
const input = document.getElementById('inputTexto');
const messages = document.getElementById('mensajes');
let pincelSize = 10; // Tamaño inicial del pincel
let pincelColor = '#000000'; // Color inicial del pincel
let prevMouseX;
let prevMouseY;

let isDragging = false;

$( function() {
    $("section").draggable({
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
  });

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
  if (mouseIsPressed && !isDragging) {
    // Dibujar línea localmente
    stroke(pincelColor);
    strokeWeight(pincelSize);
    line(prevMouseX, prevMouseY, mouseX, mouseY);
    
    // Emitir los puntos de inicio y fin de la línea
    const data = {
      x1: prevMouseX,
      y1: prevMouseY,
      x2: mouseX,
      y2: mouseY,
      size: pincelSize,
      color: pincelColor
    };
    socket.emit('drawing', data);

    // Actualizar las coordenadas previas del ratón
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

socket.on('drawing', (data) => {
  // Dibujar la línea recibida desde el servidor
  stroke(data.color);
  strokeWeight(data.size);
  line(data.x1, data.y1, data.x2, data.y2);
});

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

function getRange() {
    const rango = document.querySelector("#brushSizeInput").value;
    pincelSize = rango;
}

function getColor() {
    const color = document.querySelector("#InputColor").value;
    pincelColor = color;
}
