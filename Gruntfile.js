module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
	  // define the files to lint
	  files: ['Gruntfile.js', 'scripts/main.js', 'scripts/modules/*.js', 'scripts/modules/navigation/*.js'],
	  // configure JSHint (documented at http://www.jshint.com/docs/)
	  options: {
	      // more options here if you want to override JSHint defaults
	    globals: {
	      jQuery: true,
	      console: true,
	      module: true
	    }
	  }
	},
	requirejs: {
	  compile: {
	    options: {
	      baseUrl: "scripts",
	      include: ['main'],
    	  insertRequire: ['main'],
	      name: "almond",
	      out: "release/all.js"
	    }
	  }
	},
	cssmin: {
	  combine: {
	  	files: {
	      'release/all.css': ['styles/*.css']
	    }
	  }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('min', ['requirejs', 'cssmin']);

};