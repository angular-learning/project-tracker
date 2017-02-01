// for now swagger-tools does not support relative $ref in sagger.yaml
// so we need to manually compile single swagger.yaml from set of sources

// setup dependencies
var gulp = require('gulp');

//var YAML = require('yaml-js');
var SwaggerParser = require('swagger-parser');
var YAML = SwaggerParser.YAML;
var resolve = require('json-refs').resolveRefs;
var fs = require('fs');

var swaggerDir = './api/swagger';
var swaggerIndex = `${swaggerDir}/sources/index.yaml`;

// exports
module.exports = {};

// initialization

// private methods
gulp.task('compileSwagger', function () {
    SwaggerParser.dereference(swaggerIndex)
        .then(function (api) {
            api.host = 'localhost:' + process.env.PORT;
            fs.writeFile(`${swaggerDir}/swagger.yaml`, YAML.stringify(api), console.error);
        })
        .catch(function (err) {
            console.error('Compilation of swagger failed! ' + err.message);
        });
});



