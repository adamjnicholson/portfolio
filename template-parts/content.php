<?php
/**
 * The default template for displaying content
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <?php
    echo '<h2><a href="' . get_permalink() . '">' . $post->post_title . '</a></h2>';
    content($post->post_excerpt);

    echo '<p class="read-more-wrapper"><a href="' . get_permalink() . '" class="button read-more">Read More</a></p>';
  ?>
</article>