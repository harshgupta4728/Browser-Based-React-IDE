# Automated Checklist

- [ ] Create / rename / delete files
- [ ] Edit files (.js/.jsx/.css/.html) in editor
- [ ] Live preview updates on edit
- [ ] Console shows runtime logs and errors
- [ ] Save to localStorage and load via projectId
- [ ] Backend persistence to MongoDB via API
- [ ] README with run/deploy/test steps

Manual steps:
1. Start frontend `npm run dev` and backend `npm run start:dev`.
2. Create a new component file and verify preview updates.
3. Rename and delete a file; verify behavior.
4. Trigger `console.log` and an error; verify console shows entries.
5. Refresh page; confirm autosave and `projectId` query param.
6. Use curl to POST/GET/PUT project on backend; verify DB changes.
