/**
 * jquery.imagePlaceholder plugin
 * https://github.com/hatsumatsu/jquery.imagePlaceholder
 * 
 * HATSUMATSU
 * http://hatsumatsu.de
 * 2015
 * 
 * Based on the jquery plugin boilerplate by Jonathan Nicol
 * http://jonathannicol.com/blog/2012/05/06/a-jquery-plugin-boilerplate/
 */
;( function( $ ) {
	var pluginName = 'imagePlaceholder';

	function Plugin( element, options ) {
		var el = element;
		var $el = $( element );

		options = $.extend( {}, $.fn[pluginName].defaults, options );

		function init() {						
			buildPlaceholder();
			
			hook( 'onInit' );
		}
		
		function buildPlaceholder() {
			console.log( $el );
			var images = $el.find( 'img[height][width]' );
			images.each( function() {
				var image = $( this );
							
				console.log( image );
							
				var top = image.position().top;
				var left = image.position().left;
							
				var placeholder = $( '<canvas></canvas>');
				placeholder
					.attr( 'class', image.attr( 'class' ) )
					.attr( 'id', image.attr( 'id' ) )
					.attr( 'width', image.attr( 'width' ) )
					.attr( 'height', image.attr( 'height' ) )
					.addClass( 'placeholder' );
							
				image
					.addClass( 'has-placeholder' )
					.css( {
						'left': left + 'px',
						'top': top + 'px'
					} );
							
					image.after( placeholder );
				} );	
		}

		function option( key, val ) {
			if( val ) {
				options[key] = val;
			} else {
				return options[key];
			}
		}

		function destroy() {
			$el.each( function() {
				
				$( this )
					.find( '.placeholder' )
					.remove();
				$( this )
					.find( '.has-placeholder' )
					.removeClass( 'has-placeholder' );
				
				var el = this;
				var $el = $( this );

				hook( 'onDestroy' );
				$el.removeData( 'plugin_' + pluginName );
			} );
		}

		function hook( hookName ) {
			if( options[hookName] !== undefined ) {
				options[hookName].call( el );
			}
		}

		init();

		return {
			option: option,
			destroy: destroy
		};
	}

	$.fn[pluginName] = function( options ) {
		if( typeof arguments[0] === 'string' ) {
			var methodName = arguments[0];
			var args = Array.prototype.slice.call( arguments, 1 );
			var returnVal;
			this.each( function() {
				if( $.data( this, 'plugin_' + pluginName ) && typeof $.data( this, 'plugin_' + pluginName )[methodName] === 'function' ) {
					returnVal = $.data( this, 'plugin_' + pluginName )[methodName].apply( this, args );
				} else {
					throw new Error( 'Method ' +  methodName + ' does not exist on jQuery.' + pluginName );
				}
			} );
			if( returnVal !== undefined ) {
				return returnVal;
			} else {
				return this;
			}
		} else if( typeof options === "object" || !options ) {
			return this.each( function() {
				if( !$.data( this, 'plugin_' + pluginName ) ) {
					$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
				}
			});
		}
	};

	$.fn[pluginName].defaults = {
		onInit: function() {},
		onDestroy: function() {}
	};

} )( jQuery );