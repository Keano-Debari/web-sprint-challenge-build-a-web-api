// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if(project) {
            req.project = project
            next()
        }
        else {
            next({status: 404, message: 'project not found'})
        }
    }
    catch (err) {
        res.status(500).json({message: 'cant find project'})
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if(!name || !description) {
        req.status(400).json({message: 'missing required name or description field'})
    }
    else {
        next()
    }
}


module.exports = { validateProjectId, validateProject }

