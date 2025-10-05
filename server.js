const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Importamos Multer para manejar archivos

const app = express();

// Usamos multer.memoryStorage() para que el archivo se guarde en la memoria RAM
// y no en el disco, ya que solo necesitamos sus metadatos.
const upload = multer({ storage: multer.memoryStorage() });

// Establecer el puerto
const port = process.env.PORT || 3000;

// ================================================
// MIDDLEWARES
// ================================================

app.use(cors({ optionsSuccessStatus: 200 })); // Permitir peticiones de otros dominios
app.use(express.static('public')); // Servir archivos estáticos

// ================================================
// RUTAS
// ================================================

// Ruta principal que sirve el formulario HTML
app.get('/', (req, res) => {
  // Asumiendo que index.html está dentro de la carpeta 'views'
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta de la API para analizar el archivo
// upload.single('upfile') es el middleware de Multer.
// 'upfile' debe coincidir con el atributo 'name' del input del formulario HTML.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // req.file contiene la información del archivo subido por Multer
  
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded. Please select a file." });
  }

  // Devolver el JSON con los metadatos requeridos por freeCodeCamp
  res.json({
    name: req.file.originalname, // Nombre original del archivo
    type: req.file.mimetype,     // Tipo MIME del archivo (ej: image/png)
    size: req.file.size          // Tamaño del archivo en bytes
  });
});

// ================================================
// INICIO DEL SERVIDOR
// ================================================

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
