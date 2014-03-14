/**
 * Gruntfile
 *
 * If you created your Sails app with `sails new foo --linker`,
 * the following files will be automatically injected (in order)
 * into the EJS and HTML files in your `views` and `assets` folders.
 *
 * At the top part of this file, you'll find a few of the most commonly
 * configured options, but Sails' integration with Grunt is also fully
 * customizable.  If you'd like to work with your assets differently
 * you can change this file to do anything you like!
 *
 * More information on using Grunt to work with static assets:
 * http://gruntjs.com/configuring-tasks
 */

module.exports = function(grunt) {


    require('load-grunt-tasks')(grunt);


    /**
     * CSS files to inject in order
     * (uses Grunt-style wildcard/glob/splat expressions)
     *
     * By default, Sails also supports LESS in development and production.
     * To use SASS/SCSS, Stylus, etc., edit the `sails-linker:devStyles` task
     * below for more options.  For this to work, you may need to install new
     * dependencies, e.g. `npm install grunt-contrib-sass`
     */

    var cssFilesToInject = [
        'linker/**/*.css'
    ];


    /**
     * Javascript files to inject in order
     * (uses Grunt-style wildcard/glob/splat expressions)
     *
     * To use client-side CoffeeScript, TypeScript, etc., edit the
     * `sails-linker:devJs` task below for more options.
     */

    var jsFilesToInject = [

        // Below, as a demonstration, you'll see the built-in dependencies 
        // linked in the proper order order

        // Bring in the socket.io client
        'linker/js/socket.io.js',

        // then beef it up with some convenience logic for talking to Sails.js
        'linker/js/sails.io.js',

        // A simpler boilerplate library for getting you up and running w/ an
        // automatic listener for incoming messages from Socket.io.
        'linker/js/app.js',

        // *->    put other dependencies here   <-*

        // All of the rest of your app scripts imported here
        'linker/**/*.js'
    ];


    /**
     * Client-side HTML templates are injected using the sources below
     * The ordering of these templates shouldn't matter.
     * (uses Grunt-style wildcard/glob/splat expressions)
     *
     * By default, Sails uses JST templates and precompiles them into
     * functions for you.  If you want to use jade, handlebars, dust, etc.,
     * edit the relevant sections below.
     */

    var templateFilesToInject = [
        'linker/**/*.html'
    ];



    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    //
    // DANGER:
    //
    // With great power comes great responsibility.
    //
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // Modify css file injection paths to use 
    cssFilesToInject = cssFilesToInject.map(function(path) {
        return '.tmp/public/' + path;
    });

    // Modify js file injection paths to use 
    jsFilesToInject = jsFilesToInject.map(function(path) {
        return '.tmp/public/' + path;
    });


    templateFilesToInject = templateFilesToInject.map(function(path) {
        return 'assets/' + path;
    });


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowerrc: grunt.file.readJSON('.bowerrc'),

        app: {
            vendor: '<%= bowerrc.directory %>'
        },

        copy: {
            imgs: {
                files: [{
                    expand: true,
                    cwd: './assets/images',
                    src: ['**/*'],
                    dest: '.tmp/public/images'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: './assets/js',
                    src: ['sails.io.js', 'socket.io.js', 'app.js'],
                    dest: '.tmp/public/js'
                }]
            },
            vendorcss: {
                files: [{
                    expand: true,
                    cwd: '<%= app.vendor %>',
                    src: ['./bootstrap/less/*.less', './bootstrap-datepicker/less/*.less', './summernote/dist/summernote.less'],
                    dest: '.tmp/public/styles'
                }]
            },
            appcss: {
                files: [{
                    expand: true,
                    cwd: './assets/styles',
                    src: ['*.**'],
                    dest: '.tmp/public/styles'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '.tmp/public',
                    src: ['**/*'],
                    dest: 'www'
                }]
            }
        },

        clean: {
            dev: ['.tmp/public/**'],
            build: ['www']
        },

        jst: {
            dev: {

                // To use other sorts of templates, specify the regexp below:
                // options: {
                //   templateSettings: {
                //     interpolate: /\{\{(.+?)\}\}/g
                //   }
                // },

                files: {
                    '.tmp/public/jst.js': templateFilesToInject
                }
            }
        },

        less: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '.tmp/public/styles/',
                    src: ['app.less'],
                    dest: '.tmp/public/styles/',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'assets/linker/styles/',
                    src: ['*.less'],
                    dest: '.tmp/public/linker/styles/',
                    ext: '.css'
                }]
            }
        },

        browserify: {
            vendor: {
                src: [
                    '<%= app.vendor %>/jquery/dist/jquery.js',
                    '<%= app.vendor %>/lodash/dist/lodash.js',
                    '<%= app.vendor %>/backbone/backbone.js'
                ],
                dest: '.tmp/public/js/vendor.js',
                options: {
                    debug: false,
                    shim: {
                        jquery: {
                            path: '<%= app.vendor %>/jquery/dist/jquery.js',
                            exports: '$'
                        },
                        lodash: {
                            path: '<%= app.vendor %>/lodash/dist/lodash.js',
                            exports: '_'
                        },
                        backbone: {
                            path: '<%= app.vendor %>/backbone/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                jquery: '$',
                                lodash: '_'
                            }
                        },
                        bootstrap: {
                            path: '<%= app.vendor %>/bootstrap/dist/js/bootstrap.min.js',
                            exports: 'bootstrap',
                            depends: {
                                jquery: '$'
                            }
                        },
                        'bootstrap-datepicker': {
                            path: '<%= app.vendor %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            exports: null,
                            depends: { 
                                jquery: '$' 
                            }
                        },
                        summernote: {
                            path: '<%= app.vendor %>/summernote/dist/summernote.js',
                            exports: null,
                            depends: {
                                jquery: '$'
                            }
                        }                       
                    },
                    alias: [
                        '<%= app.vendor %>/lodash/dist/lodash.js:underscore',
                        '<%= app.vendor %>/backbone/backbone.js:backbone'
                    ]
                }
            },
            dev: {
                src: ['assets/js/main.js'],
                dest: '.tmp/public/js/main.js',
                options: {
                    debug: true,
                    transform: [require('grunt-react').browserify],
                    external: ['jquery', 'lodash', 'backbone', 'bootstrap', 'bootstrap-datepicker', 'summernote']
                }
            }
        },

        concat: {
            js: {
                src: jsFilesToInject,
                dest: '.tmp/public/concat/production.js'
            },
            css: {
                src: cssFilesToInject,
                dest: '.tmp/public/concat/production.css'
            }
        },

        uglify: {
            dist: {
                src: ['.tmp/public/concat/production.js'],
                dest: '.tmp/public/min/production.js'
            }
        },

        cssmin: {
            dist: {
                src: ['.tmp/public/concat/production.css'],
                dest: '.tmp/public/min/production.css'
            }
        },

        'sails-linker': {

            devJs: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '.tmp/public'
                },
                files: {
                    '.tmp/public/**/*.html': jsFilesToInject,
                    'views/**/*.html': jsFilesToInject,
                    'views/**/*.ejs': jsFilesToInject
                }
            },

            prodJs: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '.tmp/public'
                },
                files: {
                    '.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
                    'views/**/*.html': ['.tmp/public/min/production.js'],
                    'views/**/*.ejs': ['.tmp/public/min/production.js']
                }
            },

            devStyles: {
                options: {
                    startTag: '<!--STYLES-->',
                    endTag: '<!--STYLES END-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '.tmp/public'
                },

                // cssFilesToInject defined up top
                files: {
                    '.tmp/public/**/*.html': cssFilesToInject,
                    'views/**/*.html': cssFilesToInject,
                    'views/**/*.ejs': cssFilesToInject
                }
            },

            prodStyles: {
                options: {
                    startTag: '<!--STYLES-->',
                    endTag: '<!--STYLES END-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '.tmp/public'
                },
                files: {
                    '.tmp/public/index.html': ['.tmp/public/min/production.css'],
                    'views/**/*.html': ['.tmp/public/min/production.css'],
                    'views/**/*.ejs': ['.tmp/public/min/production.css']
                }
            },

            // Bring in JST template object
            devTpl: {
                options: {
                    startTag: '<!--TEMPLATES-->',
                    endTag: '<!--TEMPLATES END-->',
                    fileTmpl: '<script type="text/javascript" src="%s"></script>',
                    appRoot: '.tmp/public'
                },
                files: {
                    '.tmp/public/index.html': ['.tmp/public/jst.js'],
                    'views/**/*.html': ['.tmp/public/jst.js'],
                    'views/**/*.ejs': ['.tmp/public/jst.js']
                }
            },


            /*******************************************
             * Jade linkers (TODO: clean this up)
             *******************************************/

            devJsJADE: {
                options: {
                    startTag: '// SCRIPTS',
                    endTag: '// SCRIPTS END',
                    fileTmpl: 'script(type="text/javascript", src="%s")',
                    appRoot: '.tmp/public'
                },
                files: {
                    'views/**/*.jade': jsFilesToInject
                }
            },

            prodJsJADE: {
                options: {
                    startTag: '// SCRIPTS',
                    endTag: '// SCRIPTS END',
                    fileTmpl: 'script(type="text/javascript", src="%s")',
                    appRoot: '.tmp/public'
                },
                files: {
                    'views/**/*.jade': ['.tmp/public/min/production.js']
                }
            },

            devStylesJADE: {
                options: {
                    startTag: '// STYLES',
                    endTag: '// STYLES END',
                    fileTmpl: 'link(rel="stylesheet", href="%s")',
                    appRoot: '.tmp/public'
                },
                files: {
                    'views/**/*.jade': cssFilesToInject
                }
            },

            prodStylesJADE: {
                options: {
                    startTag: '// STYLES',
                    endTag: '// STYLES END',
                    fileTmpl: 'link(rel="stylesheet", href="%s")',
                    appRoot: '.tmp/public'
                },
                files: {
                    'views/**/*.jade': ['.tmp/public/min/production.css']
                }
            },

            // Bring in JST template object
            devTplJADE: {
                options: {
                    startTag: '// TEMPLATES',
                    endTag: '// TEMPLATES END',
                    fileTmpl: 'script(type="text/javascript", src="%s")',
                    appRoot: '.tmp/public'
                },
                files: {
                    'views/**/*.jade': ['.tmp/public/jst.js']
                }
            }
            /************************************
             * Jade linker end
             ************************************/
        },

        watch: {
            api: {

                // API files to watch:
                files: ['api/**/*']
            },
            assets: {
                // Assets to watch:
                files: ['assets/**/*'],
                tasks: ['compileAssets']
            }
        }
    });

    // When Sails is lifted:
    grunt.registerTask('default', [
        'compileAssets',
        'watch'
    ]);

    grunt.registerTask('compileAssets', [
        'clean:dev',
        // 'jst:dev',
        'copy:imgs',
        'copy:js',
        'copy:vendorcss',
        'copy:appcss',
        'less:dev',
        'browserify:dev',
        'browserify:vendor'
    ]);


    // Build the assets into a web accessible folder.
    // (handy for phone gap apps, chrome extensions, etc.)
    grunt.registerTask('build', [
        'compileAssets',
        'linkAssets',
        'clean:build',
        'copy:build'
    ]);

    // When sails is lifted in production
    grunt.registerTask('prod', [
        'clean:dev',
        'jst:dev',
        'less:dev',
        'copy:dev',
        'concat',
        'uglify',
        'cssmin',
        'sails-linker:prodJs',
        'sails-linker:prodStyles',
        'sails-linker:devTpl',
        'sails-linker:prodJsJADE',
        'sails-linker:prodStylesJADE',
        'sails-linker:devTplJADE'
    ]);

    // When API files are changed:
    // grunt.event.on('watch', function(action, filepath) {
    //   grunt.log.writeln(filepath + ' has ' + action);

    //   // Send a request to a development-only endpoint on the server
    //   // which will reuptake the file that was changed.
    //   var baseurl = grunt.option('baseurl');
    //   var gruntSignalRoute = grunt.option('signalpath');
    //   var url = baseurl + gruntSignalRoute + '?action=' + action + '&filepath=' + filepath;

    //   require('http').get(url)
    //   .on('error', function(e) {
    //     console.error(filepath + ' has ' + action + ', but could not signal the Sails.js server: ' + e.message);
    //   });
    // });
};