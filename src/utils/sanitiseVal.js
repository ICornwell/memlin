function sanitiseVal(val) {
  const isNumberOrBoolean = (typeof val === 'number') || (typeof val === 'boolean')
  if (typeof val === 'string')
      return `'${val.replace(/[\\]/g, "\\\\'" ).replace(/[']/g, "\\'" )}'`
  else 
      return isNumberOrBoolean? val: `'${val}'`
}

export default sanitiseVal