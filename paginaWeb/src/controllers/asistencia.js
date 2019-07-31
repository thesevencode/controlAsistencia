const db = require('../database');

module.exports = async function() {
    const { Participant } = await db();

    function index(req, res) {
        res.render('index');
        // await Image
        //     .find()
        //     .sort({ timeStamp: 1 })
        //     .then(images => {
        //         res.render('index', { images: images });
        //     })
    }

    async function findAll(req, res) {

        let participants

        try {
            participants = await Participant.findAll()

            res.status(200).json({
                participants
            })
        } catch (error) {
            if (error) res.satatus(500).json({ error })
        }


    }

    async function create(req, res) {

        let body = req.body;
        let participant

        try {
            participant = await Participant.findByDni(body.dni)
        } catch (error) {
            return res.status(200).json({
                status: false,
                message: "El dni ya ha sido registrado"
            })
        }


        try {

            if (!participant) {
                participant = await Participant.createOrUpdate(body)
            } else {
                return res.status(200).json({
                    status: false,
                    message: "El dni ya ha sido registrado"
                })
            }


        } catch (error) {
            return res.status(200).json({
                status: false,
                message: "Imposible realizar el registro, revisa tus datos"
            })
        }

        res.status(200).json({
            status: true,
            message: "registro exitoso"
        })



    }

    async function addAssistanceByDni(req, res) {

        let body = req.body;
        let date = new Date()
        let participant

        try {
            participant = await Participant.addAssistanceByDni(body.dni, date)
        } catch (error) {
            return res.status(200).json({
                status: false,
                message: "La asistencia de hoy ya ha sido registrada"
            })
        }

        if (!participant) {
            res.status(200).json({
                status: false,
                message: "La asistencia de hoy ya ha sido registrada"
            })
        }



        res.status(200).json({
            status: true,
            participant: participant,
            message: "Perfecto, Asistencia registrada"
        })



    }

    async function findByDni(req, res) {

        let params = req.params
        let participant

        try {
            participant = await Participant.findByDni(params.dni)


        } catch (error) {
            return res.status(200).json({
                status: false,
                message: "Imposible realizar la operacion"
            })
        }

        if (!participant) {
            return res.status(200).json({
                status: false,
                message: "Usuario no encontrado"
            })
        }

        res.status(200).json({
            status: true,
            participant
        })
    }



    return {
        index,
        create,
        findAll,
        findByDni,
        addAssistanceByDni
    }
}