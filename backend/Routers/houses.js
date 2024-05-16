const express = require('express')
const houseModel = require('../modules/houses-model')
const bodyParser = require('body-parser')


const router = express.Router()
router.use(bodyParser.json())


router.get('/', (req, res) => {
    res.send("houses")
})


router.post('/post', (req, res) => {
    const newHouse = new houseModel(req.body)
    newHouse.save()
        .then(response => console.log(response))
    res.send("post")
})

router.get('/get', (req, res) => {
    houseModel.find()
        .then(response => res.send(response))
})


router.put('/update/:id', (req, res) => {
    houseModel.findByIdAndUpdate(req.params.id,req.body)
        .then(response => console.log(response))
    res.send("updated")
})


router.delete('/delete/:id', (req, res) => {
    houseModel.findByIdAndDelete(req.params.id)
        .then(response => console.log(response))
    res.send("deleted")
})


module.exports = router