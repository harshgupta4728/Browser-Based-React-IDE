import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import app from '../src/server.js'
import Project from '../src/projects.model.js'

let mongo

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

afterEach(async () => {
  await Project.deleteMany({})
})

test('POST /api/projects creates project', async () => {
  const body = { name: 'Test', files: [{ path: '/index.jsx', content: 'console.log(1)' }], entry: '/index.jsx' }
  const res = await request(app).post('/api/projects').send(body)
  expect(res.status).toBe(201)
  expect(res.body.projectId).toBeDefined()
})

test('GET /api/projects/:id returns project', async () => {
  const body = { name: 'Test', files: [{ path: '/index.jsx', content: 'console.log(1)' }], entry: '/index.jsx' }
  const create = await request(app).post('/api/projects').send(body)
  const id = create.body.projectId
  const res = await request(app).get(`/api/projects/${id}`)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe('Test')
})

test('PUT /api/projects/:id updates project', async () => {
  const body = { name: 'A', files: [{ path: '/a.js', content: '' }], entry: '/a.js' }
  const create = await request(app).post('/api/projects').send(body)
  const id = create.body.projectId
  const res = await request(app).put(`/api/projects/${id}`).send({ name: 'B', files: body.files, entry: body.entry, autosaveEnabled: true })
  expect(res.status).toBe(200)
  expect(res.body.ok).toBe(true)
})


