// Generated on 2015-10-05 using
// generator-webapp 1.1.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    require('dotenv').config();

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required grunt tasks
    require('jit-grunt')(grunt);


    // Configurable paths
    var config = {
            app: 'src/public',
            dist: 'dist',
            tmp: '.tmp',
            server: 'src',
            serverDist: 'compiled'
        }

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*',
                        '<%= config.serverDist %>/*'
                    ]
                }]
            },
            client: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp'
                    ]
                }]
            },
            server: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.serverDist %>/*'
                    ]
                }]
            }
        },

        // Compiles ES6 with Babel
        babel: {
            options: {
                sourceMap: false
            },
            client: {
                files: [{
                    expand: true,
                    src: ['<%= config.tmp %>/scripts/{,**/}*.js', '!<%= config.tmp %>/scripts/vendor/{,**}*.js'],
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: '<%= config.tmp %>/modules',
                    src: ['{,**/}*.js'],
                    dest: '<%= config.tmp %>/modules',
                    ext: '.js'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    src: ['<%= config.serverDist %>/{,**/}*.js', '!<%= config.serverDist %>/{,**/}*.marko.js', '!<%= config.serverDist %>/mock/{,**/}*.js'],
                    ext: '.js'
                }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/**/}*.js',
                    '!<%= config.dist %>/scripts/vendor/*.js',
                    '<%= config.dist %>/scripts/main.*',
                    '<%= config.dist %>/modules/{,*/**/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*'
                ]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'images/*'             
                    ]
                }]
            },
            tmpDev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.tmp %>',
                    src: [
                        'modules/{,**/}*.*',
                        'scripts/{,**/}*.*',
                    ]
                }]
            },
            tmpProd: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.tmp %>',
                    src: [
                        'modules/{,**/}*.*',
                        'scripts/{,**/}*.*',
                        'bower_components/{,**/}*.*'
                    ]
                }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.server %>',
                    dest: '<%= config.serverDist %>',
                    src: ['**', '!public/**', '!{,**/}*.marko.js', 'public/scripts/common/*.js']
                }]
            }
        },
        watch: {
            js: {
                options: {
                    spawn: false
                },
                files: [
                    '<%= config.app %>/modules/{,**/}*.js',
                    '<%= config.app %>/modules/{,**/}*.html',
                    '<%= config.app %>/scripts/{,**/}*.js',
                    '!<%= config.app %>/scripts/vendor/{,**/}*.js'
                ],
                tasks: ['clean:client', 'copy:tmpDev', 'babel:client']
            }
        },
        concurrent: {
            copy: [
                'copy:tmpProd',
                'copy:server'
            ],
            compile: [
                'babel'
            ]
        },
        usemin: {
            html: ['<%= config.serverDist %>/templates/*.marko', '<%= config.serverDist %>/routes/views/*.marko'],
            options: {
                assetsDirs: [
                    '<%= config.dist %>'
                ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./",
                    appDir: config.tmp,
                    optimize: 'uglify2',
                    mainConfigFile: config.tmp + '/scripts/main.js',
                    dir: config.dist,
                    findNestedDependencies: true,
                    skipDirOptimize: true,
                    modules: [{
                        name: 'app'
                    }]
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:copy',
        'concurrent:compile',
        'requirejs',
        'copy:dist',
        'filerev',
        'usemin',
    ]);

    grunt.registerTask('default', [
        'clean:dist',
        'concurrent:distCompile'
    ]);
    grunt.registerTask('serve', [
        'clean:client',
        'copy:tmpDev',
        'babel:client',
        'watch'
    ]);
};
