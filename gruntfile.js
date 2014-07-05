'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['source/styles/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer:dist']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            }
        },

        // compile stylesheets from sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    require: 'susy'
                },
                files: {
                    'styles/style.css': 'source/styles/style.scss'
                }
            }
        },

        // auto-prefix the css
        autoprefixer: {
            dist: {
                expand: true,
                flatten: true,
                src: 'styles/*.css',
                dest: 'styles'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'gruntfile.js',
                'source/scripts/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                files: {
                    'scripts/plugins.min.js': [
                        'source/scripts/plugins.js'
                    ]
                }
            },
            main: {
                files: {
                    'scripts/main.min.js': [
                        'source/scripts/main.js'
                    ]
                }
            }
        },

        // build modernizr
        modernizr: {
            dist: {
                'devFile': 'source/vendor/modernizr/modernizr.js',
                'outputFile': 'scripts/modernizr.min.js',
                'parseFiles': false
            }
        }

    });

    // register tasks
    grunt.registerTask('default', ['sass', 'watch']);

};
