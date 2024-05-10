// Importa o Gulp
const { src, dest, parallel, watch } = require('gulp');
// Importa o Gulp-Sass
const sass = require('gulp-sass')(require('sass'));
// Importa o Gulp-Imagemin
const imagemin = require('gulp-imagemin');
// Importa o Gulp-Uglify
const uglify = require('gulp-uglify');

// Tarefa para minificar scripts
function scripts() {
    return src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(dest('./dist/js'));
}

// Tarefa para compilar estilos SCSS
function styles() {
    return src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('./dist/css'));
}

// Tarefa para otimizar imagens
function images() {
    return src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(dest('./dist/images'));
}

// Tarefa padrão que executa as tarefas de styles, images e scripts em paralelo
exports.default = parallel(styles, images, scripts);

// Tarefa watch para observar alterações nos arquivos e executar as tarefas correspondentes
exports.watch = function() {
    watch('./src/styles/*.scss', styles);
    watch('./src/scripts/*.js', scripts);
}
