'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'application.js', 'lib/**/*.js', 'test/**/*.js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/views/**', 'app/views/**'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'application.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
      shell: {
        turbo: {
          options: {
            stdout: true,
            stderr: true
          },
          command: 'env NODE_PATH=. ./node_modules/.bin/turbo test/unit'
        }
      }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');

    // turbo task
    grunt.registerTask('test', ['shell']);

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('serve', ['concurrent']);
    grunt.registerTask('default', ['serve']);
};
