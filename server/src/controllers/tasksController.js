const moment = require('moment')
const db = require('../config/db');



const getTasks = (req, res) => {
    const date = req.query.date ? req.query.date
        : moment().endOf('day').toDate()

    db('tasks')
        .where({ userId: req.user.id })
        .where('estimateAt', '<=', date)
        .orderBy('estimateAt')
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json(err))
}

const insert = (req, res) => {
    if (!req.body.desc.trim()) {
        return res.status(400).send('Descrição é um campo obrigatório')
    }

    req.body.userId = req.user.id

    db('tasks')
        .insert(req.body)
        .then(_ => res.status(204).send())
        .catch(err => console.log(err))
}

const remove = (req, res) => {
    db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .del()
        .then(rowsDeleted => {
            if (rowsDeleted > 0) {
                res.status(204).send()
            } else {
                const msg = `Não foi encontrada task com id ${req.params.id}.`
                res.status(400).send(msg)
            }
        })
        .catch(err => res.status(400).json(err))
}

const updateTaskDoneAt = (req, res, doneAt) => {
    db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .update({ doneAt })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
}

const toggleTask = (req, res) => {
    db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(task => {
            if (!task) {
                const msg = `Task com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg)
            }

            const doneAt = task.doneAt ? null : new Date()
            updateTaskDoneAt(req, res, doneAt)
        })
        .catch(err => res.status(400).json(err))
}
module.exports = {
    getTasks, insert, remove, toggleTask
}
