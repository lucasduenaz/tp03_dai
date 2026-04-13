import fs from "fs";
import dayjs from "dayjs";

// 1. Mostrar productos
function mostrarProductos() {
  try {
    const contenido = fs.readFileSync("productos.json", "utf8");
    const lista = JSON.parse(contenido);

    lista.forEach(prod => {
      console.log(`Producto: ${prod.nombre} | $${prod.precio}`);
    });
  } catch (e) {
    console.log("Error al leer productos");
  }
}


// 2. Añadir producto
function nuevoProducto(nombre, precio) {
  try {
    const contenido = fs.readFileSync("productos.json", "utf8");
    const lista = JSON.parse(contenido);

    const productoNuevo = { nombre: nombre, precio: precio };
    lista.push(productoNuevo);

    fs.writeFileSync("productos.json", JSON.stringify(lista, null, 2));
  } catch (e) {
    console.log("No se pudo guardar el producto");
  }
}


// 3. Fecha y hora
function verFechaHora() {
  const ahora = dayjs();

  console.log(`Hoy es: ${ahora.format("DD-MM-YYYY")}`);
  console.log(`Hora: ${ahora.format("HH:mm:ss")}`);
}


// 4. API países
async function traerPais(paisBuscado) {
  try {
    const respuesta = await fetch(`https://restcountries.com/v3.1/name/${paisBuscado}`);
    const info = await respuesta.json();

    const p = info[0];

    console.log(`País: ${p.name.common}`);
    console.log(`Capital: ${p.capital?.[0]}`);
    console.log(`Zona: ${p.region}`);
    console.log(`Habitantes: ${p.population}`);
  } catch (e) {
    console.log("No se pudo obtener la info del país");
  }
}


// 5. Buscar producto
function encontrarProducto(nombre) {
  const contenido = fs.readFileSync("productos.json", "utf8");
  const lista = JSON.parse(contenido);

  const resultado = lista.find(item =>
    item.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (resultado) {
    console.log("Encontrado:");
    console.log(resultado);
  } else {
    console.log("No existe ese producto");
  }
}


// 6. Exportar CSV
function exportarCSV() {
  const contenido = fs.readFileSync("productos.json", "utf8");
  const lista = JSON.parse(contenido);

  const filas = lista.map(p => `${p.nombre},${p.precio}`);
  const csvFinal = ["nombre,precio", ...filas].join("\n");

  fs.writeFileSync("productos.csv", csvFinal);
}


// 7. Contador
function contadorSimple() {
  let i = 1;

  const timer = setInterval(() => {
    console.log(i);

    if (i >= 10) {
      console.log("Contador terminado");
      clearInterval(timer);
    }

    i++;
  }, 1000);
}


// 8. Analizar texto
function statsTexto(texto) {
  const totalChars = texto.length;
  const totalWords = texto.trim().split(/\s+/).length;
  const totalVowels = (texto.match(/[aeiou]/gi) || []).length;
  const totalCons = (texto.match(/[bcdfghjklmnñpqrstvwxyz]/gi) || []).length;

  return {
    totalChars,
    totalWords,
    totalVowels,
    totalCons
  };
}


// 9. Validar contraseña
function checkPassword(pass) {
  const largoOK = pass.length >= 8;
  const numeroOK = /\d/.test(pass);
  const mayusOK = /[A-Z]/.test(pass);

  if (largoOK && numeroOK && mayusOK) {
    console.log("Contraseña segura");
  } else {
    console.log("Contraseña no cumple requisitos");
  }
}