import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
  path: { type: String, required: true },
  content: { type: String, default: '' }
}, { _id: false })

const ProjectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  files: { type: [FileSchema], default: [] },
  entry: { type: String, default: '/index.jsx' },
  autosaveEnabled: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Project', ProjectSchema)


