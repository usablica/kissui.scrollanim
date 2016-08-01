module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      basic: {
        src: ['./bower_components/kissui.position/position.js', './scrollanim.js'],
        dest: './build/scrollanim.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './build/scrollanim.js',
        dest: 'build/scrollanim.min.js'
      }
    },
    cssmin: {
      target: {
        files: {
          './build/scrollanim.min.css': ['./scrollanim.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);

};
