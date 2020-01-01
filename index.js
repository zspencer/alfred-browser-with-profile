const alfy = require('alfy')
const fs = require('fs')
const os = require('os')
const path = require('path')

profileDir = path.join(os.homedir(), 'Library', 'Application Support', 'Firefox', 'Profiles')
const pathToProfile = (profile) => path.join(profileDir, profile)
const convertProfileFolderNamesToItems = (profiles) => (
  profiles.map((profile) => ({
    title: profile,
    arg: pathToProfile(profile)
  }))
)

fs.promises.readdir(profileDir)
  .then(convertProfileFolderNamesToItems)
  .then((profiles) => alfy.inputMatches(profiles, 'title'))
  .then((items) => alfy.output(items))
  // .then(alfy.log)

// .then((items) => items.map((e) => ({ title: e })))
