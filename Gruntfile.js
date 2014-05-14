module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {src: 'build'}
		},

		copy: {
			html: {
				files: [{
					expand: true,
					cwd: 'src/html',
					src: [ '**/*.html' ],
					dest: 'build/html'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: [ '**/*.*' ],
					dest: 'build/img'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					cwd: 'src/fonts',
					src: [ '**/*.*' ],
					dest: 'build/fonts'
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
						'build/img/**/*.*',
						'build/fonts/**/*.*',
						'build/js/**/*.js',
						'build/css/**/*.css'
					]
				}]
			}
		},

		useminPrepare: {
			html: 'src/html/*.html',

			// we want the generated files to be output to 'build'
			options: { dest: 'build' }
		},

		usemin: {
			html: {
				src: 'build/html/*.html'
			},
			css: {
				src: 'build/css/*.css'
			}
		},

		jshint: {
			all: 'build/js/**/*.js',
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

	grunt.registerTask('default', ['clean:build', 'copy', 'useminPrepare:html', 'concat', 'rev', 'cssmin', 'usemin', 'jshint']);

};
