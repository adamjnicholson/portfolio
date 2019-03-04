<?php

  /*
  #########################################################
  #########################################################
  ###################                   ###################
  ###################      CONTENT      ###################
  ###################                   ###################
  #########################################################
  #########################################################
  */

  function genSiteLogo($position = 'header', $return = false) {

    $html = '';
    $logo = get_field('logo', 'options');
    $logo = empty($logo) ? get_bloginfo('name') : genImageTag($logo, 'full', true);

    $logo = '<a class="no-hover" href="' . get_site_url() . '">' . $logo  . '</a>';
    if (is_front_page() && $position === 'header') {
      $html = '<h1 id="site-logo" class="site-logo">' . $logo . '</h1>';
    } else{
      $html = '<div class="site-logo">' . $logo . '</div>';
    }

    if ($return) {
      return $html;
    }

    echo $html;
  }

  function genCopyright() {
    echo '<div class="copyright">';
      echo '<p>&copy; ' . get_bloginfo('name') . ' ' . date('Y') . '</p>';
    echo '</div>';
  }


  function genSocialMenu($cirlces = false, $position = 'header') {
    $accounts = get_field('accounts', 'options');
    if (!empty($accounts)) {
      $circleClass = $cirlces ? ' circles' : '';
      echo '<ul class="social-menu' . $circleClass . ' horizontal no-list">';
        foreach ($accounts as $account) {
          echo '<li><a href="' . $account['url'] . '">' . genSvg('icon-' . $account['icon']) . '</a></li>';
        }
      echo '</ul>';
    }
  }

  function genExcerpt($content, $words = 55) {
    if (has_excerpt()) {
      return the_excerpt();
    } else {
      return '<p>' . wp_trim_words($content, $words, '') . '</p>';
    }
  }

  function genPostMeta($cats) {
    $published = is_singular('post') ? 'Published On: ': '';
  ?>
    <div class="post-meta horizontal">
      <?php genCatsList($cats); ?>
      <p class="date"><?php echo $published . get_the_date('j M Y'); ?></p>
    </div>
  <?php
  }

  function genCatsList($cats) {
    if (!empty($cats)) : ?>
      <ul class="cats no-list horizontal">
        <?php foreach ($cats as $cat) : ?>
          <li><a class="no-hover" href="<?php echo get_category_link($cat->term_id);?>"><?php echo $cat->name; ?></a></li>   
        <?php endforeach; ?>
      </ul>
    <?php endif;
  }

  function genSideMenu($cats,  $currentTerm = null) {
  ?>
    <aside id="sidebar-menu" class="col col-m-12 col-t-3 col-d-2">
      <div class="sidebar-inner">
        <h3>Categories</h3>
        <ul class="no-list">
          <?php foreach( $cats as $cat): ?>
            <?php $active = $currentTerm->slug === $cat->slug ? ' active' : ''; ?>
            <li><a class="no-hover<?php echo $active; ?>" href="<?php echo get_category_link($cat->term_id);?>"><?php echo $cat->name; ?></a></li>   
          <?php endforeach ?>
        </ul>
      </div>
    </aside>
  <?php }

  function genFavicon() {
    $imgDir = get_stylesheet_directory_uri() . '/dist/images/favicon';
  ?>

    <link rel="apple-touch-icon" sizes="57x57" href="<?php echo $imgDir; ?>/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="<?php echo $imgDir; ?>/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo $imgDir; ?>/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="<?php echo $imgDir; ?>/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo $imgDir; ?>/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="<?php echo $imgDir; ?>/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="<?php echo $imgDir; ?>/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="<?php echo $imgDir; ?>/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $imgDir; ?>/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="<?php echo $imgDir; ?>/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $imgDir; ?>/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="<?php echo $imgDir; ?>/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $imgDir; ?>/favicon-16x16.png">
    <link rel="manifest" href="<?php echo $imgDir; ?>/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="<?php echo $imgDir; ?>/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
  <?php
  }

  /*
  #########################################################
  #########################################################
  ###################                   ###################
  ###################      IMAGES       ###################
  ###################                   ###################
  #########################################################
  #########################################################
  */

  function genImageTag($data, $size = 'full', $retina = false, $class = '' ){
    if(!is_array($data)){
      return false;
    }

    $retinaDivisor = $retina ? 2 : 1;
    if ($size !== 'full') {
      $data['url'] =  $data['sizes'][$size];
      $data['width'] = $data['sizes'][$size . '-width'];

      $data['height'] = $data['sizes'][$size . '-height'];
    }

    if($data['url'] != ''){
      return '<img class="' . $class . '" src="'. $data['url'] . '" alt="' . $data['alt'] . '" width="' . $data['width'] / $retinaDivisor . '" height="' . $data['height'] / $retinaDivisor . '"/>';
    }

    return 'ERROR';
  }

  function genSvg($iconName, $classes = '') {
    $html = '<span class="icon ' .  $iconName . ' ' . $classes . '">';
      $html .= file_get_contents(get_stylesheet_directory_uri() . "/dist/images/$iconName.svg");
    $html .= '</span>';
    return $html;
  }

  function genBackgroundImage($image) {
    $html = '';
    if (!empty($image)) {
      $html .= 'background: url(\'' . $image['url'] . '\') no-repeat center center / cover';
    }
    return $html;
  }
