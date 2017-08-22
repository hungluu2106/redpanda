const util = require('util')
const RedPanda = require('./src/main')

let net = new RedPanda()
net.set('a', {method: 'GET'})
net.set('b', {url: 'https://jsonplaceholder.typicode.com/posts/1', inherits: ['a']})
net.set('c', {url: 'https://jsonplaceholder.typicode.com/posts/2'})
net.set('d', [{url: 'https://jsonplaceholder.typicode.com/posts/5'}, {url: 'https://jsonplaceholder.typicode.com/posts/6'}])
net.set('e', {url: 'https://jsonplaceholder.typicode.com/posts/3'})
net.set('f', {url: 'https://jsonplaceholder.typicode.com/posts/4'})
net.set('all', ['b', 'c', 'e', 'f', 'd'])
// net.set('e', {url: 'https://'})

// console.log(util.inspect(net.get('b'), {showHidden: false, depth: null}))

// let net2 = new RedPanda()
// net2.set('b', {b : 5})
// console.log(util.inspect(net2.get('b'), {showHidden: false, depth: null}))
// console.log(util.inspect(net.get('d'), {showHidden: false, depth: null}))

net.sendSequence('all')
  .then(data => data[0].json())
  .then(json => console.log('Sequence ' + json.id))
  .catch(err => console.log(err))

net.send('all')
  .then(data => data.json())
  .then(json => console.log('Parallel ' + json.id))
  .catch(err => console.log(err))
  // .all()
  // .then(data => Promise.all(data.map(item => item.json())))
  // .then(jsonStack => jsonStack.forEach(json => console.log(json)))
