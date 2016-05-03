module.exports = function(grunt) {
  
  grunt.initConfig({
    clean: ['public', 'temp'],
    // uglify: {
    //   options: {
    //       banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> / '
    //   },
    //   build: {
    //       src: 'temp/js/application.js',
    //       dest: 'public/js/application.min.js'
    //   }
    // },
    concat:{
      task1: {
          src: ['js/*.js', 'static/js/*/*.js'], 
          // dest: 'temp/js/application.js' 
          dest: 'public/js/application.js' 
      },
      task2: {
          src: ['temp/css/static/css/*/*.css','temp/css/*/*.css' ], 
          dest: 'public/css/application.min.css' 
      }
    },
    cssmin:{
      minify:{
        expand: true,
        // cwd: 'temp/css/',
        src: ['static/css/*/*.css', 'css/*.css'],
        dest: 'temp/css',
        ext: '.min.css'
      },
      options:{
        keepSpecialComments: 0
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['clean', 'cssmin', 'concat']); //, 'uglify'

}