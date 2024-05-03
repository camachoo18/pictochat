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

  const socket = io();
  let pincelSize = 10; // Tamaño inicial del pincel
let pincelColor = '#000000'; // Color inicial del pincel
  const form = document.getElementById('formulario');
const input = document.getElementById('inputTexto');
const messages = document.getElementById('mensajes');
let prevMouseX;
let prevMouseY;

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
  if (msg.startsWith("https://")) {
    const link = document.createElement("a");
    link.href = msg;
    link.textContent = msg;
    item.appendChild(link);
  } else {
    item.textContent = msg;
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('drawing', (data) => {
  fill(pincelColor);
  ellipse(data.x, data.y, pincelSize, pincelSize);
});

function setup() {
  createCanvas(1920, 740);
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function draw() {
  if (mouseIsPressed && (mouseX !== prevMouseX || mouseY !== prevMouseY)) {
    socket.emit('drawing', { x: mouseX, y: mouseY });
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

function getRange() {
  const rango = document.querySelector("#brushSizeInput").value;
  pincelSize = rango;
}

function getColor() {
  const color = document.querySelector("#InputColor").value;
  pincelColor = color;
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
      //ellipse(mouseX, mouseY, 1)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }
}

 