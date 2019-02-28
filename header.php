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


  <body <?php body_class('landing'); ?>>
    <header>
      <nav id="main-menu"> 
        <ul class="no-list">
          <li class="logo"><?php echo genSvg('and', 'absolute-center'); ?></li>
          <li class="name">
            <span>Adam</span>
            <span>Nicholson</span>
            <span>Designs</span>
          </li>
          <li class="link"><?php echo genSvg('rocket', 'absolute-center'); ?></li>
          <li class="link"><?php echo genSvg('chat', 'absolute-center'); ?></li>
        </ul>
      </nav>
    </header>

    