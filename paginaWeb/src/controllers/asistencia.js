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

    return {
        index,
        create,
        findAll
    }
}