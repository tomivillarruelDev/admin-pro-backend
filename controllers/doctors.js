const { response } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    const doctors = await Doctor.find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');
    res.json({
        ok: true,
        doctors,
    });
};

const createDoctor = async (req, res = response) => {
    const uid = req.uid;

    const doctor = new Doctor({
        user: uid,
        ...req.body,
    });

    try {
        const dbDoctor = await doctor.save();
        res.json({
            ok: true,
            msg: dbDoctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error inesperado',
        });
    }
};

const updateDoctor = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const dbDoctor = await Doctor.findById(id);

        if (!dbDoctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no encontrado por id',
            });
        }

        const changesDoctor = {
            ...req.body,
            user: uid,
        };

        const updateDoctor = await Doctor.findByIdAndUpdate(id, changesDoctor, {
            new: true,
        });

        res.json({
            ok: true,
            updateDoctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error inesperado',
        });
    }
};

const deleteDoctor = async (req, res = response) => {
    const id = req.params.id;
    try {
        const dbDoctor = await Doctor.findById(id);

        if (!dbDoctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no encontrado por id',
            });
        }
        await Doctor.findByIdAndDelete(dbDoctor);

        return res.json({
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
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};
