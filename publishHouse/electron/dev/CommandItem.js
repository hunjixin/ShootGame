const cSet = new Set([
  new CommandItem('/output', 'text', '', '', '', false),
  new CommandItem('/text', 'check', '', '', '', false),
  new CommandItem('/html', 'check', '', '', '', false),

  new CommandItem('/bytes', 'check', '', '', '', false),
  new CommandItem('/caverbal', 'check', '', '', '', false),
  new CommandItem('/linenum', 'check', '', '', '', false),
  new CommandItem('/nobar', 'check', '', '', '', false),
  new CommandItem('/noca', 'check', '', '', '', false),
  new CommandItem('/project', 'check', '', '', '', false),
  new CommandItem('/quoteallnames', 'check', '', '', '', false),
  new CommandItem('/raweh', 'check', '', '', '', false),
  new CommandItem('/source', 'check', '', '', '', false),
  new CommandItem('/tokens', 'check', '', '', '', false),

  new CommandItem('/visibility:PUB', 'check', '', '', '', false),
  new CommandItem('/visibility:PRI', 'check', '', '', '', false),
  new CommandItem('/visibility:FAM', 'check', '', '', '', false),
  new CommandItem('/visibility:ASM', 'check', '', '', '', false),
  new CommandItem('/visibility:FAA', 'check', '', '', '', false),
  new CommandItem('/visibility:FOA', 'check', '', '', '', false),
  new CommandItem('/visibility:PSC', 'check', '', '', '', false),

  new CommandItem('/all', 'check', '', '', '', false),
  new CommandItem('/classlist', 'check', '', '', '', false),
  new CommandItem('/forward', 'check', '', '', '', false),
  new CommandItem('/headers', 'check', '', '', '', false),
  new CommandItem('/noil', 'check', '', '', '', false),
  new CommandItem('/stats', 'check', '', '', '', false),
  new CommandItem('/typelist', 'check', '', '', '', false),
  new CommandItem('/unicode', 'check', '', '', '', false),
  new CommandItem('/utf8', 'check', '', '', '', false),
  new CommandItem('/output', 'check', '', '', '', false),
  new CommandItem('/output', 'check', '', '', '', false)
])

class CommandItem {
  constructor (name, type, value, useFor, description, enable) {
    this.name = name
    this.value = value
    this.type = 'check'
    this.useFor = useFor
    this.description = description
    this.enable = enable
  }
  makeCommand () {
    if (type == 'check') {
      if (value == true) {
        return ' ' + this.name + ' '
      }else {
        return ''
      }
    }else {
      return ' ' + this.name + ' ' + this.value + ' '
    }
  }
}

module.exports.CommandSet = cSet
