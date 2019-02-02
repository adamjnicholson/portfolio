<?php
/**
 * The template part for displaying results in search pages
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <?php
    echo '<h2><a href="' . get_permalink() . '">' . $post->post_title . '</a></h2>';
    content($post->post_excerpt);

    echo '<p class="read-more"><a href="' . get_permalink() . '" class="button">Read More</a></p>';
  ?>
</article>