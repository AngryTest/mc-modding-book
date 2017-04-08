/* Requiring modules */
const fs =              require('fs');
const showdown =        require('showdown');
const utils =           require('../../../../tools/modules/utils');

module.exports = (par_version_dir, par_API_dir, par_category_dir, par_article_dir) => {

    return {
        link: `https://github.com/mc-modding/mc-modding-book/blob/master/book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}/article.md`,
        article: (new showdown.Converter()).makeHtml(fs.readFileSync(`book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}/article.md`, { encoding: 'UTF-8' }))
    };

};