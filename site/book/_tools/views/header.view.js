/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const utils =           require('../../../../tools/modules/utils');

/* Global site config */
const CONFIG = utils.get_config('./');

module.exports = () => {

    let view = { logotype_cube_sides: [] };

    let textures_dirs = utils.get_directories('site/book/images/logotype');

    let random_dir = textures_dirs[Math.floor(Math.random() * textures_dirs.length)];

    let textures = fs.readdirSync(`site/book/images/logotype/${random_dir}`);

    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach((side) => {

        view.logotype_cube_sides.push({
            link: `${CONFIG.url}/book/images/logotype/${random_dir}/${side}.png`,
            side: side
        });

    });

    return view;

};