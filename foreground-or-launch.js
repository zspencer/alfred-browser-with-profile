// const alfy = require('alfy');
// const input = alfy.input;
const input = process.argv[2]
const child_process = require('child_process')
const os = require('os')
const path = require('path')

const exec = (command) => {
  console.log(command)
  return new Promise(function (resolve, reject) {
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) { reject(error) }
      if (stderr) { reject(stderr) }
      resolve(stdout)
    })
  })
}

const launchIfNecessary = (pids) => {
  if (pids && pids.length > 0) return pids

  launch()
  return exec(pidEmitter).then(capturePids)
}
const launch = () => exec(`/Applications/Firefox.app/Contents/MacOS/firefox-bin -profile "${input}" -new-instance  > /dev/null 2>&1 &`)
const dedup = (collection) => collection.filter((e, pos) => e && collection.indexOf(e) == pos)
const findParent = (pid) => exec(`ps -l ${pid} | tail -n 1 | awk '{print $3}'`)
const findParents = (pids) => Promise.all(pids.map(findParent)).then(dedup)
const foreground = (pids) => {
  if (!pids || pids.length === 0) { return }
  pids.forEach((pid) => exec(`osascript foreground-pid.scpt ${pid}`))
}
const capturePids = (stdout) => stdout.split(os.EOL).filter(pid => pid.length > 0)

const pidEmitter = `ps aux | grep '${input}' | grep -v grep | grep -v ${path.basename(__filename)} | awk '{print $2}'`

const log = (value) => {
  console.log(value, typeof value, value.length)
  return value
}
exec(pidEmitter)
  .then(capturePids)
  .then(launchIfNecessary)
  .then(findParents)
  .then(dedup)
  .then(foreground)
  .catch(console.error)
