module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    'assets/js/*.js', // All JS in the libs folder
                    'assets/js/main.js'  // This specific file
                ],
                dest: 'assets/js/build/production.js',
            }
        },
        uglify: {
            build: {
                src: 'assets/js/build/production.js',
                dest: 'assets/js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/build/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true,
                    spawn: false,
                },
            },
            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    compass: true,
                },
                files: {
                    'assets/css/build/main.css': 'assets/sass/main.scss'
                }
            } 
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'watch', 'sass', 'compass']);

};