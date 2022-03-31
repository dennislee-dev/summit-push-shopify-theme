const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('src/scripts/main.js', 'assets/ifit.js').vue().sourceMaps(false)
    .sass('src/styles/main.scss', 'assets/ifit.css')
    .options({
        postCss: [ tailwindcss('./tailwind.config.js') ],
    }); 

mix.disableNotifications();