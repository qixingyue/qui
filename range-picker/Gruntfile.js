/* global module */

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            },

            check: {
                files: {
                    src: ["src/**/*.js"]
                }
            }
        },

        concat: {
            dist: {
                src: ["src/range_picker.js"],
                dest: "dist/js/range_picker.js",
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
                }
            }
        },

        uglify: {
            compress: {
                options: {
                    sourceMap: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    "dist/js/range_picker.min.js" : ["dist/js/range_picker.js"]
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    "dist/css/range-picker.min.css" : ["css/range-picker.css"]
                }
            }
        },
        copy: {
            main: {
                src: "css/range-picker.css",
                dest: "dist/css/range-picker.css"
            }
        },

        mocha: {

            test: {
                options: {
                    run: true,
                    log: true,
                    logErrors: true,
                    reporter: "Nyan",
                },
                src: ["test/**/*.html"]
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-mocha");

    grunt.registerTask("test", ["mocha:test"]);
    grunt.registerTask("compile", ["jshint:check", "mocha:test",
                                   "concat:dist", "uglify:compress", "cssmin", "copy"]);
    grunt.registerTask("default", ["compile"]);
};
