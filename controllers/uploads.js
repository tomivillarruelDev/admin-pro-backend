const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = (req, res = response) => {
    const { type, id } = req.params;

    const validTypes = ['hospitals', 'doctors', 'users'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo no valido',
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir',
        });
    }

    //Procesar la imagen...
    const file = req.files.image;

    const nameSplit = file.name.split('.');
    const fileExtension = nameSplit[nameSplit.length - 1];
    console.log(fileExtension);

    //Validar extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension no valida',
        });
    }

    //Generar el nombre del archivo
    const fileName = `${uuidv4()}.${fileExtension}`;

    //Path para guardar la imagen
    const path = `./uploads/${type}/${fileName}`;

    //Mover la imagen
    file.mv(path, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }

        const updated = await updateImage(type, id, fileName);

        if (!updated) {
            return res.status(400).json({
                ok: false,
                msg: 'Tipo o ID no válido',
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName,
        });
    });
};

const returnFile = (req, res = response) => {
    const { type, img } = req.params;

    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg);
    }
};

module.exports = {
    fileUpload,
    returnFile,
};
