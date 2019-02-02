<?php
  /*
    #########################################################
    #########################################################
    ###################                   ###################
    ###################    SHORTCODES     ###################
    ###################                   ###################
    #########################################################
    #########################################################
  */

  function exampleShortcode($atts){
    $html = '';
    return $html;
  }
  add_shortcode('example', 'exampleShortcode');

  function emailShortcode($atts) {
    $html = '';
    if (!empty($atts['address'])) {
      $html .= '<span><a href="mailto:' . $atts['address'] . '">' . $atts['address'] . '</a></span>';
    }
    return $html;
  }
  add_shortcode('email', 'emailShortcode');

  function phoneShortcode($atts) {
    $html = '';
    if (!empty($atts['number'])) {
      $phone = preg_replace('/[^0-9]/', '', $atts['number']);
      $html .= '<span><a href="tel:' . $phone . '">' . $atts['number'] . '</a></span>';
    }
    return $html;
  }
  add_shortcode('phone', 'phoneShortcode');
