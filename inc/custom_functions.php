<?php
  function debug($data = '', $type = 'echo'){
      $html = '';

      $html .= '<pre style="padding: 15px; font-family: \'courier new\'; font-size: 12px; border: 1px dashed #800">';
        $html .= print_r($data, true);
      $html .= '</pre>';

      switch($type){
        case 'log':
          $file = fopen(get_stylesheet_directory_uri() . 'log.txt', 'a') or die('Unable to open file!');
          fwrite($file, print_r($data, true) . PHP_EOL . '====================' . PHP_EOL . PHP_EOL);
          fclose($file);
          break;

        case 'echo':
          echo $html;
          break;

        case 'return':
        default:
          return $html;
          break;
      }
  }

  /*
    #########################################################
    #########################################################
    ###################                   ###################
    ###################      MENUS      ####################
    ###################                   ###################
    #########################################################
    #########################################################
  */



  /*
    #########################################################
    #########################################################
    ###################                   ###################
    ###################      SEARCH      ####################
    ###################                   ###################
    #########################################################
    #########################################################
  */

  //SEARCH ALL META FUNCTIONALITY - START
  function cf_search_join( $join ) {
      global $wpdb;

      if ( is_search() ) {
          $join .=' LEFT JOIN '.$wpdb->postmeta. ' ON '. $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
      }

      return $join;
  }
  add_filter('posts_join', 'cf_search_join' );

  function cf_search_where( $where ) {
      global $pagenow, $wpdb;

      if ( is_search() ) {
          $where = preg_replace(
              "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
              "(".$wpdb->posts.".post_title LIKE $1) OR (".$wpdb->postmeta.".meta_value LIKE $1)", $where );
      }

      return $where;
  }
  add_filter( 'posts_where', 'cf_search_where' );

  function cf_search_distinct( $where ) {
      global $wpdb;

      if ( is_search() ) {
          return "DISTINCT";
      }

      return $where;
  }
  add_filter( 'posts_distinct', 'cf_search_distinct' );
