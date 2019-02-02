<?php
/**
 * The template for displaying search results pages.
 */

get_header(); ?>

    <?php
      if(have_posts()){
        while(have_posts()){
          the_post();
          
          get_template_part( 'content', 'search');
        }
      }else{
        get_template_part( 'content', 'none');
      }
    ?>

<?php get_footer(); ?>
