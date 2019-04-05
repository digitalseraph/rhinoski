export function camelToSnakeCase(value) {
  return value.replace(/([A-Z])/g, function($1) {
    return "_" + $1.toLowerCase();
  });
}

export function loadFiles(directory) {
  // var files = fs.readdirSync('/assets/img/');
}
