const fs = require('fs');
const PDFParser = require('pdf-parse');

// Ruta al archivo PDF
const pdfFilePath = 'Don_Quijote_de_la_Mancha-Cervantes_Miguel.pdf';

// Lee el contenido del PDF y cuenta las palabras
const contarPalabrasEnPDF = async () => {
  try {
    const dataBuffer = fs.readFileSync(pdfFilePath);
    const data = await PDFParser(dataBuffer);

    // Obtén el texto del PDF
    const textoPDF = data.text;

    // Divide el texto en palabras
    const palabras = textoPDF.split(/\s+/);

    // Crea un objeto para almacenar el recuento de palabras
    const recuentoPalabras = {};

    // Cuenta las palabras y su frecuencia
    palabras.forEach(palabra => {
      palabra = palabra.toLowerCase().trim();
      if (palabra !== '') {
        if (recuentoPalabras[palabra]) {
          recuentoPalabras[palabra]++;
        } else {
          recuentoPalabras[palabra] = 1;
        }
      }
    });

    // Filtra las palabras que se repiten
    const palabrasRepetidas = Object.keys(recuentoPalabras).filter(palabra => recuentoPalabras[palabra] > 1);

    // Ordena las palabras por frecuencia descendente
    const palabrasOrdenadas = Object.keys(recuentoPalabras).sort((a, b) => recuentoPalabras[b] - recuentoPalabras[a]);

    // Muestra las palabras más repetidas
    console.log('Palabras más repetidas:');
    for (let i = 0; i < 10 && i < palabrasOrdenadas.length; i++) {
      const palabra = palabrasOrdenadas[i];
      console.log(`${palabra}: ${recuentoPalabras[palabra]} veces`);
    }

    // Muestra las palabras menos repetidas
    console.log('Palabras menos repetidas:');
    for (let i = palabrasOrdenadas.length - 1; i >= 0 && i >= palabrasOrdenadas.length - 10; i--) {
      const palabra = palabrasOrdenadas[i];
      console.log(`${palabra}: ${recuentoPalabras[palabra]} veces`);
    }

    // Muestra el total de palabras en el PDF
    const totalPalabras = palabras.length;
    console.log(`Total de palabras en el PDF: ${totalPalabras}`);
  } catch (error) {
    console.error('Error al contar las palabras en el PDF:', error);
  }
};

// Ejecuta la función
contarPalabrasEnPDF();
