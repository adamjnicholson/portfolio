<?php
// Move Yoast to bottom
function yoasttobottom() {
	return 'low';
}
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');

function my_acf_init() {
	$key = 'AIzaSyDa6I0ToHrAdFGjYZMK1DXDaY1CVZUnGI8';
	acf_update_setting('google_api_key', $key);
}

add_action('acf/init', 'my_acf_init');

// function filter_ptags_on_images($content){
//    return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/', '\1\2\3', $content);
// }
// add_filter('the_content', 'filter_ptags_on_images');





















