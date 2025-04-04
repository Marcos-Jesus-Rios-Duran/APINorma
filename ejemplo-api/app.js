import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import routeslibros from './routes/libros.js';
import swaggerDocs from './swagger.js'; // Asegúrate de que la ruta sea correcta

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/libros', routeslibros);

// Configuración de Swagger
swaggerDocs(app);

try {
    const PORT =  5000;
    app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
} catch (e) {
    console.log(e);
}