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
                    nodeArgs: [],
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
        },
        coverage: {
          options: {
            stdout: true,
            stderr: true
          },
          command: [
                'rm -rf coverage cov-unit',
                'env NODE_PATH=. ./node_modules/.bin/istanbul cover --dir cov-unit ./node_modules/.bin/turbo -- test/unit',
                './node_modules/.bin/istanbul report',
                'echo "See html coverage at: `pwd`/coverage/lcov-report/index.html"'
            ].join('&&')
        }
      }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');

    // turbo task
    grunt.registerTask('test', ['shell:turbo']);
    grunt.registerTask('coverage', ['shell:coverage']);

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('serve', ['concurrent']);
    grunt.registerTask('default', ['serve']);
};
