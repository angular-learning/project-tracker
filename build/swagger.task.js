// for now swagger-tools does not support relative $ref in sagger.yaml
// so we need to manually compile single swagger.yaml from set of sources

// setup dependencies
var gulp = require('gulp');

var SwaggerParser = require('swagger-parser');
var YAML = SwaggerParser.YAML;
var resolve = require('json-refs').resolveRefs;
var fs = require('fs');

var swaggerDir = './api/swagger';
var swaggerIndex = `${swaggerDir}/sources/index.yaml`;
var swaggerCompiled = `${swaggerDir}/swagger.yaml`;

// exports
module.exports = {};

// initialization

// private methods
gulp.task('swagger', function () {
    return SwaggerParser.dereference(swaggerIndex)
        .then(function (api) {            
            fs.writeFileSync(swaggerCompiled, YAML.stringify(api));
            return _validateFile(swaggerCompiled);
        })
        .catch(function (err) {
            console.error('Compilation of swagger failed! ' + err.message);
        });
});

function _validateFile(file) {
    SwaggerParser.validate(file)
        .then(function (api) {
            console.log("API name: %s, Version: %s", api.info.title, api.info.version);
        })
        .catch(function (err) {
            console.error(err);
        });
}



