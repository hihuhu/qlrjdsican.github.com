/**
 * jquery.lable.js v1.0.0
 * 参考
*/

( function( window, $, undefined ) {
	
	'use strict';

	var Modernizr			= window.Modernizr;

	jQuery.fn.reverse		= [].reverse;
	
	$.lable			= function( options, element ) {
		
		this.$el	= $( element );
		this._init( options );
		
	};

	$.lable.defaults	= {
		// 初始位置
		center		: 6,
		// 每个条目之间的度数
		angleInc	: 8,
		speed		: 700,
		easing		: 'ease',
		// 打开后的角度
		proximity	: 45,
		// 未打开的角度
		neighbor	: 4,
		// 动画重载
		onLoadAnim	: true,
		// 默认关闭
		initclosed	: false,
		// 点击时触发打开功能
		// 默认
		closeIdx	: -1
	};

	$.lable.prototype	= {

		_init			: function( options ) {
			
			this.options	= $.extend( true, {}, $.lable.defaults, options );

			this.$items		= this.$el.children( 'div' );
			this.itemsCount	= this.$items.length;
			this.current	= -1;
			this.support	= Modernizr.csstransitions;
			this.cache		= [];
			
			if( this.options.onLoadAnim ) {

				this._setTransition();

			}

			if( !this.options.initclosed ) {

				this._center( this.options.center, this.options.onLoadAnim );

			}
			else {

				this.isClosed	= true;
				if( !this.options.onLoadAnim ) {

					this._setTransition();

				}

			}
			
			this._initEvents();
			
		},
		_setTransition	: function() {

			if( !this.support ) {

				return false;

			}

			this.$items.css( {
				'-webkit-transition': '-webkit-transform ' + this.options.speed + 'ms ' + this.options.easing,
				'-moz-transition'	: '-moz-transform ' + this.options.speed + 'ms ' + this.options.easing,
				'-o-transition'		: '-o-transform ' + this.options.speed + 'ms ' + this.options.easing,
				'-ms-transition'	: '-ms-transform ' + this.options.speed + 'ms ' + this.options.easing,
				'transition'		: 'transform ' + this.options.speed + 'ms ' + this.options.easing
			} );

		},
		_openclose		: function() {

			var _self = this;

			if( this.isClosed ) {

				this._center( this.options.center, true );

			}
			else {

				this.$items.each( function( i ) {

					var transformStr	= 'rotate(0deg)';

					$( this ).css( {
						'-webkit-transform'	: transformStr,
						'-moz-transform'	: transformStr,
						'-o-transform'		: transformStr,
						'-ms-transform'		: transformStr,
						'transform'			: transformStr
					} );

				} );

			}

			this.isClosed = !this.isClosed;

		},
		_center			: function( idx, anim ) {

			var _self = this;

			this.$items.each( function( i ) {

				var transformStr	= 'rotate(' + ( _self.options.angleInc * ( i - idx ) ) + 'deg)';

				$( this ).css( {
					'-webkit-transform'	: transformStr,
					'-moz-transform'	: transformStr,
					'-o-transform'		: transformStr,
					'-ms-transform'		: transformStr,
					'transform'			: transformStr
				} );

			} );

		},
		_initEvents		: function() {

			var _self = this;

			this.$items.on( 'click.lable', function( event ) {

				var $item	= $( this ),
					itmIdx	= $item.index();

				if( itmIdx !== _self.current ) {

					if( _self.options.closeIdx !== -1 && itmIdx === _self.options.closeIdx ) {

						_self._openclose();
						_self._setCurrent();

					}
					else {

						_self._setCurrent( $item );

						var transformStr	= 'rotate(0deg)';

						$item.css( {
							'-webkit-transform'	: transformStr,
							'-moz-transform'	: transformStr,
							'-o-transform'		: transformStr,
							'-ms-transform'		: transformStr,
							'transform'			: transformStr
						} );

						_self._rotateSiblings( $item );

					}

				}

			} );

		},
		_rotateSiblings	: function( $item ) {

			var _self		= this,
				idx			= $item.index(),
				$cached		= this.cache[ idx ],
				$siblings;

			if( $cached ) {

				$siblings = $cached;

			}
			else {

				$siblings = $item.siblings();
				this.cache[ idx ] = $siblings;

			}

			$siblings.each( function( i ) {

				var rotateVal	= ( i < idx ) ?
									_self.options.angleInc * ( i - idx ) :
									( i - idx === 1 ) ? _self.options.proximity : _self.options.proximity + ( i - idx - 1 ) * _self.options.neighbor;

				var transformStr	= 'rotate(' + rotateVal + 'deg)';

				$( this ).css( {
					'-webkit-transform'	: transformStr,
					'-moz-transform'	: transformStr,
					'-o-transform'		: transformStr,
					'-ms-transform'		: transformStr,
					'transform'			: transformStr
				} );

			} );

		},
		_setCurrent		: function( $el ) {

			this.current = $el ? $el.index() : -1;
			this.$items.removeClass( 'ff-active' );
			if( $el ) {

				$el.addClass( 'ff-active' );

			}

		}

	};
	
	var logError			= function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.lable			= function( options ) {
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'lable' );
				
				if ( !instance ) {

					logError( "cannot call methods on lable prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for lable instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'lable' );
				if ( !instance ) {

					$.data( this, 'lable', new $.lable( options, this ) );
				
				}

			});
		
		}
		
		return this;
		
	};
	
} )( window, jQuery );