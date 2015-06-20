'use strict';

var getLibs = function (min) {
    var basePath = 'public/bower_components/';
    var target = '';

    if (min) {
        target = '.min';
    }

    return [
        basePath + 'angular/angular' + target + '.js',
        basePath + 'lodash/dist/lodash' + target + '.js',
        basePath + 'angular-bootstrap/ui-bootstrap-tpls' + target + '.js',
        basePath + 'angular-ui-router/release/angular-ui-router' + target + '.js',
        basePath + 'alertify.js/lib/alertify' + target + '.js',
        basePath + 'angular-ui-tree/dist/angular-ui-tree' + target + '.js',
        basePath + 'ng-tags-input/ng-tags-input' + target + '.js',
        basePath + 'ngDialog/js/ngDialog' + target + '.js'
    ];
};


module.exports = function (grunt) {
    grunt.initConfig({
        meta: {
            buildPath: 'public/build',
            cssPath: 'public/css',
            fontsPath: 'public/fonts',
            bowerPath: 'public/bower_components',
            jsPath: 'public/js',
            lessPath: 'public/less',
            libsFile: '<%= meta.buildPath %>/libs.js',
            appFile: '<%= meta.buildPath %>/app.js',
            cssFile: '<%= meta.cssPath %>/styles.css',
            lessFile: '<%= meta.lessPath %>/styles.less'
        },

        browserify: {
            dev: {
                options: {
                    watch: true,
                    keepAlive: true,
                    browserifyOptions: {
                        debug: true
                    },
                    watchifyOptions: {
                        debug: true
                    }
                },
                files: {
                    '<%= meta.appFile %>': '<%= meta.jsPath %>/index.js'
                }
            },
            prod: {
                files: {
                    '<%= meta.appFile %>': '<%= meta.jsPath %>/index.js'
                }
            }
        },

        clean: {
            build: ['<%= meta.buildPath %>', '<%= meta.cssPath %>', '<%= meta.fontsPath %>']
        },

        concat: {
            options: {
                separator: ';'
            },
            dev: {
                files: {
                    '<%= meta.libsFile %>': getLibs()
                }
            },
            prod: {
                files: {
                    '<%= meta.libsFile %>': getLibs(true)
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['browserify:dev', 'concat:dev', 'copy:fonts', 'less:all', 'nodemon:all'],
                options: {
                    logConcurrentOutput: true
                }
            },
            prod: {
                tasks: ['browserify:prod', 'concat:prod', 'copy:fonts', 'less:all', 'nodemon:all'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        copy: {
            fonts: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: ['<%= meta.bowerPath %>/bootstrap/fonts/**'],
                dest: '<%= meta.fontsPath %>/'
            }
        },

        less: {
            all: {
                options: {
                    paths: [
                        '<%= meta.bowerPath %>',
                        '<%= meta.lessPath %>'
                    ]
                },
                files: {
                    '<%= meta.cssFile %>': '<%= meta.lessFile %>'
                }
            }
        },

        nodemon: {
            all: {
                script: 'worker.js'
            }
        },

        uglify: {
            prod: {
                files: {
                    '<%= meta.appFile %>': '<%= meta.jsPath %>/index.js'
                }
            }
        },

        watch: {
            less: {
                options: {
                    livereload: true
                },
                files: ['<%= meta.lessPath %>/**/*.less'],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['<%= meta.appFile %>']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('dev', ['clean', 'concurrent:dev', 'watch']);
    grunt.registerTask('prod', ['clean', 'concurrent:prod', 'watch', 'uglify:prod']);
};
