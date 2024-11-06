const { response } = require('express');

const Hospital = require('../models/hospital');
const hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find().populate('user', 'name img');

    res.json({
        ok: true,
        hospitals,
    });
};

const createHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body,
    });

    try {
        const dbHospital = await hospital.save();

        res.json({
            ok: true,
            hospital: dbHospital,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error inesperado',
        });
    }
};

const updateHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const dbHospital = await Hospital.findById(id);

        if (!dbHospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id',
            });
        }

        const changesHospital = {
            ...req.body,
            user: uid, //conserva la referencia del usuario que lo actualizo
        };

        const updateHospital = await Hospital.findByIdAndUpdate(
            id,
            changesHospital,
            { new: true }
        );

        res.json({
            ok: true,
            updateHospital,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error inesperado',
        });
    }
};

const deleteHospital = async (req, res = response) => {
    const id = req.params.id;
    try {
        const dbHospital = await Hospital.findById(id);

        if (!dbHospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id',
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Registro eliminado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error inesperado',
        });
    }
};

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
};
