<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 */

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <?php wp_head(); ?>
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
  </head>


  <body <?php body_class('natureworks'); ?>>
    <header>
      <nav id="main-menu" class="expand"> 
        <ul class="no-list">
          <li><span class="absolute-center">&</span></li>
          <li class="name right"><span class="absolute-center">Adam<br>Nicholson<br>Designs</span></li>
          <li class="link"><span class="absolute-center">&</span></li>
          <li class="link"><span class="absolute-center">&</span></li>
        </ul>
      </nav>
    </header>

    