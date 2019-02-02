<?php
  function genSiteLogo($position = 'header') {

    $logo = get_field('logo', 'options');

    if (empty($logo)) {
      $logo = get_bloginfo('name');
    } else {
      $logo = genImageTag($logo, 'full', true);
    }

    $logo = '<a href="' . get_site_url() . '">' . $logo  . '</a>';
    if (is_front_page() && $position === 'header') {
      echo '<h1 id="site-logo" class="site-logo">' . $logo . '</h1>';
    } else{
      echo '<div class="site-logo">' . $logo . '</div>';
    }
  }

  function genCopyright() {
    echo '<div class="copyright">';
      echo '<p>&copy; ' . get_bloginfo('name') . ' ' . date('Y') . '</p>';
    echo '</div>';
  }


  function genSocialMenu($position = 'header') {
    $accounts = get_field('social', 'options');
    if (!empty($accounts)) {
      echo '<ul class="social-menu horizontal no-list">';
        foreach ($accounts as $account) {
          echo '<li><a href="' . $account['link'] . '">' . genSvgTag($account['icon']) . '</a></li>';
        }
      echo '</ul>';
    }
  }
