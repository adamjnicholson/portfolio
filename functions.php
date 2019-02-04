<?php
  $acfEnabled = function_exists('get_field');
  function and_setup() {
    add_theme_support( 'post-thumbnails' );
    add_theme_support('title-tag');

    register_nav_menus( array(
      'main' => __('Main Menu', 'and' ),
      'mobile' => __('Mobile Menu', 'and' ),
      'footer' => __('Footer Menu', 'and' ),
    ));

  }
  add_action( 'after_setup_theme', 'and_setup' );


  function and_scripts(){
    wp_enqueue_style( 'and-css', get_stylesheet_directory_uri() . '/dist/css/style.css', array(), null, false);
    wp_enqueue_script( 'google-maps', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDa6I0ToHrAdFGjYZMK1DXDaY1CVZUnGI8', array(), null, true);

    wp_enqueue_script( 'and-js-footer', get_stylesheet_directory_uri() . '/dist/js/scripts.min.js', array(), null, true);

    $localize = [
      'prevArrow' => genSvg('icon-arrow-left'),
      'nextArrow' => genSvg('icon-arrow-right'),
      'imageDir' => get_stylesheet_directory_uri() . '/dist/images/'
    ];
    wp_localize_script( 'and-js-footer', 'localize', $localize );

    
    

  }
  add_action( 'wp_enqueue_scripts', 'and_scripts' );

  // Adding stylesheet for formats in tinyMCE
  function my_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
  }
  // Register our callback to the appropriate filter
  add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

  //Adds items to formats in TinyMCE
  function my_mce_before_init_insert_formats( $init_array ) {
    $style_formats = array(
      array(
        'title' => 'Section Heading',
        'selector' => 'h2',
        'classes' => 'section-heading'
      ),
      array(
        'title' => 'Title',
        'selector' => 'h2',
        'classes' => 'title'
      )
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );
    return $init_array;
  }
  // Attach callback to 'tiny_mce_before_init'
  add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );


    // acf_add_options_page();

    require_once('inc/custom_functions.php');
    require_once('inc/custom_filters.php');
    require_once('inc/custom_shortcodes.php');
    require_once('inc/generate_content.php');
 

