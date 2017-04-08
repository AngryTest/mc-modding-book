/**
 * Building book
 */

/* Exiting with error if no arguments were passed to process */
if(process.argv[2] === undefined || process.argv[3] === undefined) { process.exit(1); }

/* Getting passed arguments */
const par_version_dir = process.argv[2];
const par_api_dir =     process.argv[3];

/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const utils =           require('../../../../tools/modules/utils');
const mustache_render = require('../../../../tools/modules/mustache-render');

/* ================================================================================================================== */
/* Global config */
/* ================================================================================================================== */
let global_config = utils.get_config('./');

/* ================================================================================================================== */
/* Building navigation */
/* ================================================================================================================== */

let nav_view = {};

/* ------------------------------------------------------------------------------------------------------------------ */
/* Handling versions and APIs */
/* ------------------------------------------------------------------------------------------------------------------ */

let categories_order;

nav_view['version_choose'] = { release: {}, beta: {}, alpha: {} };

nav_view.version_choose.release = { show: false, versions: [] };
nav_view.version_choose.beta = { show: false, versions: [] };
nav_view.version_choose.alpha = { show: false, versions: [] };

let versions_dirs = utils.get_directories('book');
versions_dirs.forEach((version_dir) => {

    let version_config = utils.get_config(`book/${version_dir}`);

    let link_to_version = `${global_config.url}/book/${version_dir}/${version_config['default-api-dir']}/index`;

    let version_option = `<option data-link="${ link_to_version }" ${ (version_dir === par_version_dir ? 'selected' : '') }>${ version_config.number }</option>`;

    switch (version_config['dev-state']) {
        case 'Release':
            nav_view.version_choose.release.show = true;
            nav_view.version_choose.release.versions.push(version_option);
            break;
        case 'Beta':
            nav_view.version_choose.beta.show = true;
            nav_view.version_choose.beta.versions.push(version_option);
            break;
        case 'Alpha':
            nav_view.version_choose.alpha.show = true;
            nav_view.version_choose.alpha.versions.push(version_option);
            break;
    }

    nav_view['APIs'] = [];

    let APIs_dirs = utils.get_directories(`book/${version_dir}`);
    APIs_dirs.forEach((API_dir) => {

       let API_config = utils.get_config(`book/${version_dir}/${API_dir}`);

       categories_order = API_config['categories-order'];

       let link_to_API = `${global_config.url}/book/${version_dir}/${API_dir}/index`;

       let API_option = `<option data-link="${link_to_API}" ${(API_dir === par_api_dir ? 'selected' : '')}>${API_config['api-name']}</option>`;

       nav_view['APIs'].push(API_option);
    });
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Handling categories and articles */
/* ------------------------------------------------------------------------------------------------------------------ */

categories_order.forEach((category_dir) => {



});

console.log(categories_order);