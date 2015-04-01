// es2099

var falafel = require('falafel')
var babel = require('babel-core')
var standard = require('standard')
var util = require('util')

function ES2099 (input, cb) {
  if (!(this instanceof ES2099)) return new ES2099(input, cb)

  this.input = input
  this.cb = (cb || function noop () {})
  this._errors = []
  this._nodeIndex = 0
  this._quirks = false
  this._quirksTimeouts = 0
  this._mainExists = false

  this.parse()
}

var globals = '/*global Monad*/\n'
var callMain = '\n(function () { main() })()\n'

ES2099.prototype.parse = function () {
  var self = this

  var output = falafel(this.input, { ecmaVersion: 6 }, function (node) {
    if (self._quirks) return

    // first declaration must be directive
    if (self._nodeIndex === 0) {
      if (node.type !== 'Literal' || node.value !== 'use stricter+strictest-superstrict+es2099ready') {
        // if not... quirks mode for you!
        return self.quirks()
      }

      // gotta get rid of it for those old time browsers
      node.update('')
    }

    // all variables must be const
    if (node.type === 'VariableDeclaration' && node.kind !== 'const') {
      self._errors.push('All variables must be constants.')
    }

    // a main() function must be defined in the root
    if (node.type === 'FunctionDeclaration' && node.id.name === 'main' && node.parent.type === 'Program') {
      self._mainExists = true
    }

    // Promises are now Monads
    if (node.type === 'Identifier' && node.name === 'Promise') {
      self._errors.push('Promises are now called Monads.')
    }
    if (node.type === 'Identifier' && node.name === 'Monad') {
      node.update('Promise')
    }

    // null is now a string
    if (node.type === 'UnaryExpression' && node.argument.raw === 'null') {
      node.update('"string"')
    }

    self._nodeIndex++
  })

  if (this._quirks) return

  if (!this._mainExists) {
    this._errors.push('There was no main function specified.')
  } else {
    output = output + callMain
  }

  // es2099 only uses standard format, to stop fighting
  // globals is to support Monad
  // callMain needs to be added to avoid an eslint error about an unused var
  standard.lintText(globals + this.input + callMain, function (err, result) {
    if (err) return self.cb(err)

    if (result.errorCount !== 0) {
      self._errors.push('The code is not ES2099 Standard Style.')
      result.results.forEach(function (result) {
        result.messages.forEach(function (message) {
          self._errors.push(util.format(
            '  %d:%d: %s',
            message.line || 0, message.column || 0, message.message
          ))
        })
      })

    }

    if (self._errors.length > 0) {
      var e = new Error('Your code is not ES2099-strict. The following errors occured:\n' + self._errors.join('\n'))
      return self.cb(e)
    }

    try {
      output = babel.transform(output)
      self.cb(null, output.code)
    } catch (e) {
      self.cb(e)
    }
  })
}

ES2099.prototype.quirks = function () {
  var self = this
  if (!this._quirks) this._quirks = true

  var output = falafel(this.input, { ecmaVersion: 6 }, function (node) {
    if (node.type === 'CallExpression') {
      self._quirksTimeouts++
      node.update('\nsetTimeout(function QuirksModeTimeout () { ' + node.source() + ' }, ' + self._quirksTimeouts * 10000 + ')')
    }

    // while es2099 is a troll, if people put their main but still have errors
    // at least run it in quirks... to be nice
    if (node.type === 'FunctionDeclaration' && node.id.name === 'main' && node.parent.type === 'Program') {
      self._mainExists = true
    }
  })

  output = '(function(){console.log("WARNING: This code did not specify the ES2099 directive. Running in quirks mode, to ensure full compatibility.")})()\n' + output
  output = output + (self._mainExists ? callMain : '')
  try {
    output = babel.transform(output)
    self.cb(null, output.code)
  } catch (e) {
    self.cb(e)
  }
}

module.exports = ES2099
