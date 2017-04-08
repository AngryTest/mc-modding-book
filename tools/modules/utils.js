/**
 * Useful functions
 */
const fs = require('fs');
const path = require('path');
const yml = require('js-yaml');

let e = module.exports = {};

e.get_directories = (path_to_scan) => {
    return fs.readdirSync(path_to_scan).filter(file => fs.statSync(path.join(path_to_scan, file)).isDirectory());
};

e.get_config = (path_to_config_dir) => {
    return yml.safeLoad(fs.readFileSync(path.join(path_to_config_dir, '/config.yml'), { encoding: 'UTF-8' }));
};