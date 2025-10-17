import { Router } from 'express'
import Joi from 'joi'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import Project from './projects.model.js'

const router = Router()

const fileSchema = Joi.object({ path: Joi.string().min(1).max(256).required(), content: Joi.string().allow('') })
const projectSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).optional(),
  name: Joi.string().min(1).max(128).required(),
  files: Joi.array().items(fileSchema).default([]),
  entry: Joi.string().min(1).max(256).required(),
  autosaveEnabled: Joi.boolean().default(true)
})

router.post('/', async (req, res) => {
  const { value, error } = projectSchema.validate(req.body, { stripUnknown: true })
  if (error) return res.status(400).json({ error: error.message })
  const projectId = value.projectId || uuidv4()
  try {
    const doc = await Project.create({ ...value, projectId })
    res.status(201).json({ projectId: doc.projectId })
  } catch (e) {
    res.status(500).json({ error: 'Failed to create project' })
  }
})

router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params
  if (!uuidValidate(projectId)) return res.status(400).json({ error: 'Invalid projectId' })
  const doc = await Project.findOne({ projectId }).lean()
  if (!doc) return res.status(404).json({ error: 'Not found' })
  res.json({ projectId: doc.projectId, name: doc.name, files: doc.files, entry: doc.entry, createdAt: doc.createdAt, updatedAt: doc.updatedAt, autosaveEnabled: doc.autosaveEnabled })
})

router.put('/:projectId', async (req, res) => {
  const { projectId } = req.params
  if (!uuidValidate(projectId)) return res.status(400).json({ error: 'Invalid projectId' })
  const { value, error } = projectSchema.validate(req.body, { stripUnknown: true })
  if (error) return res.status(400).json({ error: error.message })
  try {
    const doc = await Project.findOneAndUpdate({ projectId }, { ...value }, { new: true, upsert: false })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to update project' })
  }
})

export default router


