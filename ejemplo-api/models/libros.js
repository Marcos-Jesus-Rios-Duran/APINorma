import { ObjectId } from 'mongodb';
import dbClient from '../config/dbClient.js';

class librosModel {
    async create(libroData) {
        try {
            if (typeof libroData.titulo !== 'string' || !isNaN(libroData.titulo)) {
                throw new Error("El título debe ser un string y no un número");
            }

            const db = dbClient.getDB();
            const librosCollection = db.collection('libros');

            const result = await librosCollection.insertOne(libroData);

            if (result.acknowledged) {
                return { ...libroData, _id: result.insertedId };
            } else {
                throw new Error("No se pudo crear el libro");
            }
        } catch (error) {
            console.error("Error al crear el libro:", error.message);
            throw new Error("Error al crear el libro: " + error.message);
        }
    }

    async getAll() {
        const collibros = dbClient.getDB().collection('libros');
        try {
            return await collibros.find({}).toArray();
        } catch (e) {
            console.error("Error al obtener todos los libros:", e);
            throw e;
        }
    }

    async getOne(id) {
        try {
            const collibros = dbClient.getDB().collection('libros');
            
            if (!ObjectId.isValid(id)) {
                throw new Error("ID no válido");
            }

            return await collibros.findOne({ _id: new ObjectId(id) });
        } catch (e) {
            console.error("Error al obtener el libro:", e);
            throw new Error("Error en el servidor: " + e.message);
        }
    }

    async update(id, libroData) {
        try {
            if (libroData.titulo && (typeof libroData.titulo !== 'string' || !isNaN(libroData.titulo))) {
                throw new Error("El título debe ser un string y no un número");
            }

            const collibros = dbClient.getDB().collection('libros');

            if (!ObjectId.isValid(id)) {
                throw new Error("ID no válido");
            }

            const libroExistente = await collibros.findOne({ _id: new ObjectId(id) });

            if (!libroExistente) {
                throw new Error("No se encontró el libro para actualizar");
            }

            const result = await collibros.updateOne(
                { _id: new ObjectId(id) },
                { $set: libroData }
            );

            if (result.modifiedCount === 1) {
                return { ...libroData, _id: id };
            } else {
                throw new Error("No se modificaron campos del libro");
            }
        } catch (e) {
            console.error("Error al actualizar el libro:", e);
            throw new Error("Error en el servidor: " + e.message);
        }
    }

    async delete(id) {
        try {
            const collibros = dbClient.getDB().collection('libros');

            if (!ObjectId.isValid(id)) {
                throw new Error("ID no válido");
            }

            const result = await collibros.deleteOne({ _id: new ObjectId(id) });

            return result.deletedCount === 1;
        } catch (e) {
            console.error("Error al eliminar el libro:", e);
            throw new Error("Error en el servidor: " + e.message);
        }
    }
}

export default new librosModel();