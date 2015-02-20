# jquery.imagePlaceholder

**! Very beta, use at your own risk !**

Using complex layout algorithms like [Masonry](http://masonry.desandro.com/) with image-heavy content, you usually need something like [imagesLoaded](http://masonry.desandro.com/appendix.html#imagesloaded) to wait for the images to be completely loaded. This is because  image dimensions are – despite using height and width attributes on the `<img>`  – unknown to the browser until loading is completed.

**jquery.imagePlacegolder** takes a different approach to this issue. It replaces each image with an empty `<canvas>` element using the image's values for `width` and `height` attributes and places the image on top of this placeholder. Since `<canvas>` behaves exactly like `<img>` regarding its intrinsic aspect ratio you can start calculating your layout as soon as the DOM is ready. Since the image's classes are copied, the CSS of your images applies to the placeholder as well.

### Pro's
+ Calculate layout before images are loaded
+ Give a visual feedback on the loading process

### Limitations
+ Only works with images that have `width` and `height` attributes (most CMSs can do that for you)
+ images have to be `position: relative` or `static` 
+ **Very beta, use at your own risk**

## Usage 
+ include jquery.imagePlaceholder
+ add the following lines of CSS

```css
.placeholder {
  position: relative;
}

.has-placeholder {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
```

+ call the plugin like `$( '.container' ).imagePlaceholder()`

### Using jquery.imagePlaceholder with Masonry

Just call imagePlaceholder before you append items to the masonry layout. 

So instead of...

```js
$( '.item-to-append' )
    .addClass( 'hidden' )
    .appendTo( $( '.layout-container' ) );

// might take a while
$( '.item-to-append' ).imagesLoaded( function() {
    $( '.layout-container' )
      .masonry( 'appended', $( '.item-to-append' ) )

    $( '.item-to-append' )
      .removeClass( 'hidden' );    
} );
```

... do this 

```js 
$( '.item-to-append' )
    .addClass( 'hidden' )
    .appendTo( $( '.layout-container' ) )
    .imagePlaceholder();

$( '.layout-container' )
    .masonry( 'appended', $( '.item-to-append' ) );

$( '.item-to-append' )
    .removeClass( 'hidden' );        
```

## Demo 

[Check out this pen](http://codepen.io/superstructure-net/pen/azVjWY/)

(In this demo `imagesLoaded()` is used to destroy the placeholder after the images have loaded completely)

## Credits
+ I used the [jquery plugin boilerplate by Jonathan Nicol](http://jonathannicol.com/blog/2012/05/06/a-jquery-plugin-boilerplate/)
+ Everything started in [here](https://github.com/desandro/imagesloaded/issues/175). 
