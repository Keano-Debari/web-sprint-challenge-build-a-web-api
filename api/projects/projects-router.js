// Write your "projects" router here!

const express = require('express')

const { validateProjectId, validateProject } = require('./projects-middleware')

const Projects = require('./projects-model')

const router = express.Router()

// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.

router.get('/', (req, res, next) => {
    Projects.get(req.query)
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

// - [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.post('/', validateProject, (req, res, next) => {
    Projects.insert({name: req.name, description: req.description})
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, {name: req.name, description: req.description})
        .then(() => {
            return Projects.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
    }
    catch (err) {
        next(err)
    }
})

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get('/:id/actions', validateProjectId,  async (req, res, next) => {
    try {
        const action = await Projects.getProjectActions(req.params.id)
        res.json(action)
    }
    catch (err) {
        next(err)
    }
})