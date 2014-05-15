module.exports = function( grunt ){

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		build: 'build',
		dist: {
			root: 'dist',
			html: '<%= dist.root %>/html',
			"public": '<%= dist.root %>/public'
		},
		src: {
			root: 'src',
			html: '<%= src.root %>/html',
			"public": '<%= src.root %>/public'
		},

		clean: {
			dist: { src: '<%= dist.root %>' }
		},

		copy: {
			html: {
				files: [{
					expand: true,
					cwd: '<%= src.html %>',
					src: [ '**/*.html' ],
					dest: '<%= dist.html %>'
				}]
			},
			assets: {
				files: [{
					expand: true,
					cwd: '<%= src.public %>',
					src: [ '{img,font}/**/*' ],
					dest: '<%= dist.public %>'
				}]
			}
		},

		uglify: {
			options: {
				mangle: {},
				compress: false,
				report: 'gzip'
			}
		},

		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			assets: {
				files: [{
					src: [
						'<%= dist.public %>/img/**/*.*',
						'<%= dist.public %>/font/**/*.*',
						'<%= dist.public %>/js/**/*.js',
						'<%= dist.public %>/css/**/*.css'
					]
				}]
			}
		},

		cssmin: {
			options: {
				report: 'gzip'
			}
		},

		useminPrepare: {
			// we want the generated files to be output to 'dist'
			options: { 
				dest: '<%= dist.public %>/',
				staging: '<%= build %>'
			},
			html: '<%= dist.html %>/*.html'
		},

		usemin: {
			html: {
				src: '<%= dist.html %>/*.html'
			},
			css: {
				src: '<%= dist.public %>/css/*.css'
			}
		},

		jshint: {
			all: '<%= dist.public %>/js/**/*.js',
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-rev' );
	grunt.loadNpmTasks( 'grunt-usemin' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	grunt.registerTask( 'default', [ 'clean:dist', 'copy', 'useminPrepare:html', 'concat', 'cssmin', 'uglify', 'rev', 'usemin', 'jshint' ] );

};
