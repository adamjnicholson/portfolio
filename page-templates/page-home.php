<?php
/**
 * Template Name: Home
 */

get_header();
?>

<?php 
  function getImageUrl($img) {
    return $img['url'];
  }

  function getGalleryUrls($gallery) {
    $imgs = [];
    foreach ($gallery as $img) {
      $imgs[] = getImageUrl($img);
    }
    return $imgs;
  }

  function genBgImg($url) {
    echo 'style="background-image: url(\'' . $url . '\')"';
  }

  $args = [
    'post_type' => 'project',
    'posts_per_page' => -1,
    'order' => 'ASC'
  ];

  $projects = new WP_Query($args);
  $projectInfo = [];

  $mapID = 34;
  $mapPage = get_post($mapID);
  $mapContent = apply_filters('the_content', $mapPage->post_content); 
  $markers = [
    'cafes' => get_field('cafes', $mapID),
    'bars' => get_field('bars', $mapID)
  ];
  $mapMarkers = [];

  foreach ($markers as $key => $type) {
    $typeMarkers = [];
    foreach ($type as $place) {
      $typeMarkers[] = [$place['marker']['lat'], $place['marker']['lng']];
    }
    $mapMarkers[$key]['locations'] = $typeMarkers;
  }

  $mapMarkers['cafes']['icon'] = 'coffee.svg';
  $mapMarkers['bars']['icon'] = 'beer.svg';

?>

<?php if ($projects->have_posts()) : ?>
    <?php 
    $i = 1;
    while ($projects->have_posts()) : $projects->the_post();
      $projectInfo[] = [
        'index' => $i,
        'title' => get_the_title(),
        'desc' => get_the_content(),
        'class' => get_field('project_class'),
        'url' => get_field('project_url'),
        'logo' => getImageUrl(get_field('project_logo')),
        'mainImg' => get_the_post_thumbnail_url(get_the_ID(), 'full'),
        'gallery' => getGalleryUrls(get_field('gallery'))
      ];
      $i++;
    endwhile; endif; wp_reset_postdata();
    ?>
    <script type='text/javascript'>
      <?php 
        echo 'var projects = ' . json_encode($projectInfo) . ';'; 
        echo 'var markers = ' . json_encode($mapMarkers) . ';';
      ?>
    </script>
    <section id="landing" class="page-section active">
    <?php echo genSvg('lg-logo', 'absolute-center'); ?>
      <div class="content absolute-center">
        <?php the_content(); ?>
      </div>
    </section>
    <section id="projects" class="page-section <?php echo $projectInfo[0]['class']; ?>">
      <ul class="bg-image absolute-center no-list">
        <li class="absolute-cover active" <?php genBgImg($projectInfo[0]['mainImg']); ?>></li>
        <li class="absolute-cover"></li>
      </ul>
    <div class="col-2">
      <article>
        <div id="title-container">
          <span id="project-number" class="h1">01</span>
          <span id="project-title" class="h2"><?php echo $projectInfo[0]['title']; ?></span>
        </div>
        <div id="content-container">
          <p><?php echo $projectInfo[0]['desc']; ?></p>
          <a href="<?php echo $projectInfo[0]['url']; ?>" class="button" target="_blank"><span>Visit Site</span><?php echo genSvg('icon-arrow-right', 'absolute-center'); ?></a>
        </div>
      </article>
      <aside>
        <div id="logo">
          <div class="image">
            <img src="<?php echo $projectInfo[0]['logo']; ?>">
          </div>
        </div>
        <div id="project-gallery">
          <div class="gallery-images">
            <div class="gallery-image active" <?php genBgImg($projectInfo[0]['mainImg']); ?>></div>
            <div class="gallery-image"></div>
          </div>
            
          <ul id="preview-container" class="no-list">
            <?php foreach ($projectInfo[0]['gallery'] as $img) : ?>
              <li><div class="preview-image" <?php genBgImg($img); ?>></div></li>
            <?php endforeach; ?>
            <li class="magnifier"><?php echo genSvg('icon-magnify', 'absolute-center'); ?></li>
          </ul>
        </div>
        <nav id="project-nav">
          <ul id="arrows" class="no-list">
            <li class="next square"><?php echo genSvg('icon-arrow-right', 'absolute-center'); ?></span></li>
            <li class="prev square disabled"><?php echo genSvg('icon-arrow-left', 'absolute-center'); ?></li>
          </ul>
          <div id="progress-bar-container">
            <div class="progress-inner">
              <div id="bar"><div class="bar-inner"></div></div>
              <div id="current">01</div>
              <div id="total">0<?php echo count($projectInfo); ?></div>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  </section>
  <section id="map" class="page-section">
    <ul class="bg-image absolute-cover no-list">
      <li class="absolute-cover active"></li>
    </ul>
    <div class="col-2">
      <aside>
        <div class="marker-toggle">
          <?php echo genSvg('coffee'); ?>
          <div class="toggle"></div>
          <?php echo genSvg('beer'); ?>
        </div>
      </aside>
      <article>
        <?php echo $mapContent; ?>
      </article>
    </div>
  </section>





<?php get_footer(); ?>
