/**
 * Building all books
 */

/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const mkdirp =          require('mkdirp');
const rimraf =          require('rimraf');
const utils =           require('../../../../tools/modules/utils');
const mustache_render = require('../../../../tools/modules/mustache-render');

/* Requiring views */
const nav_view =        require('../views/nav.view');
const header_view =     require('../views/header.view');
const article_view =    require('../views/article.view');
const head_view =       require('../views/head.view');

/* Removing 'book' directory from 'docs' directory */
rimraf.sync('./');

/* Generating book pages */
let versions_dirs = utils.get_directories(`book`);
versions_dirs.forEach((version_dir) => {

    let APIs_dirs = utils.get_directories(`book/${version_dir}`);
    APIs_dirs.forEach((API_dir) => {

        let categories_dirs = utils.get_config(`book/${version_dir}/${API_dir}`)['categories-order'];
        categories_dirs.forEach((category_dir) => {

            let articles_dirs = utils.get_config(`book/${version_dir}/${API_dir}/${category_dir}`)['articles-order'];
            articles_dirs.forEach((article_dir) => {

                build_book(version_dir, API_dir, category_dir, article_dir);

            });

        });

    });

});

function build_book(version_dir, API_dir, category_dir, article_dir) {

    let view = Object.assign({},
        nav_view(version_dir, API_dir, category_dir, article_dir),
        header_view(),
        article_view(version_dir, API_dir, category_dir, article_dir),
        head_view(version_dir, API_dir, category_dir, article_dir)
    );

    /* Saving page */
    let path = `book/${version_dir}/${API_dir}/${category_dir}/${article_dir}`;

    mkdirp.sync(path);

    fs.writeFileSync(`${path}/index.html`, mustache_render('site/book/templates/index.mustache', view));
}