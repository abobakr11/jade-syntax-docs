module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          "js/script.js": "js/script.coffee"
        }
      }
    },
    jade: {
      compile: {
        files: {
          "index.html": "index.jade"
        }
      }
    },
    stylus: {
      compile: {
        options: {
          compress: true,
          paths: ['node_modules']
        },
        files: {
          'css/screen.css': 'css/screen.styl'
        }
      }
    },
    uglify: {
      bootstrap: {
        src: 'js/bootstrap.js',
        dest: 'assets/temp/bootstrap.js'
      },
      script: {
        src: 'js/script.js',
        dest: 'assets/temp/script.js'
      },
      tab: {
        src: 'js/taboverride.js',
        dest: 'assets/temp/taboverride.js'
      }
    },
    concat: {
      dist: {
        src: ['js/jquery.js', 'js/jade.js', 'assets/temp/*.js'],
        dest: 'assets/global.min.js'
      }
    },
    cssmin: {
      compile: {
        files: {
          "assets/global.min.css": ["assets/temp/bootstrap.needed.css", "css/screen.css"]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: './'
        }
      }
    },
    watch: {
      files: ['js/server.coffee', 'css/*', 'index.jade'],
      tasks: 'compile'
    },
    uncss: {
      dist: {
        options: {
          stylesheets: ['css/bootstrap.css']
        },
        files: {
          'assets/temp/bootstrap.needed.css': ['index.html']
        }
      }
    },
    inline: {
      main: {
        options:{
          tag: ''
        },
        files: {
          src: ['index.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-inline');

  grunt.registerTask('default', ['compile', 'connect', 'watch']);
  grunt.registerTask('compile', ['coffee', 'jade', 'uncss', 'stylus', 'uglify', 'cssmin', 'concat', 'inline']);
};