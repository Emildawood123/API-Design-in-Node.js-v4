const fs = require('fs')
const path = require('path')
const result = fs.readFile(path.join(__dirname, 'package.json'), "utf-8", (err, data) => { 
 console.log(data)
 })
console.log('hello')
