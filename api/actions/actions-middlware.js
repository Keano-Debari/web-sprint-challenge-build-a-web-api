// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(action) {
            req.action = action
            next()
        }
        else {
            next({status: 404, message: 'action not found'})
        }
    }
    catch (err) {
        res.status(500).json({message: 'cant find action'})
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body
    if(!project_id || !description || !notes) {
        req.status(400).json({message: 'missing required fields'})
    }
    else {
        next()
    }
}


module.exports = { validateActionId, validateAction }