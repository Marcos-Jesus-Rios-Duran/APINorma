import express from 'express';
const route = express.Router();
import libroController from '../controllers/libros.js';

/**
 * @swagger
 * /libros:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       500:
 *         description: Error al crear el libro
 */
route.post('/', libroController.create);

/**
 * @swagger
 * /libros/{id}:
 *   get:
 *     summary: Obtener un libro por su ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
route.get('/:id', libroController.getOne);

/**
 * @swagger
 * /libros:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 *       500:
 *         description: Error en el servidor
 */
route.get('/', libroController.getAll);

/**
 * @swagger
 * /libros/{id}:
 *   put:
 *     summary: Actualizar un libro por su ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       200:
 *         description: Libro actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al actualizar el libro
 */
route.put('/:id', libroController.update);

/**
 * @swagger
 * /libros/{id}:
 *   delete:
 *     summary: Eliminar un libro por su ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro eliminado con éxito
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al eliminar el libro
 */
route.delete('/:id', libroController.delete);

export default route;