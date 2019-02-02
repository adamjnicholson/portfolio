<?php
/**
 * The main template file
 */

get_header(); ?>

<?php $images = get_stylesheet_directory_uri() . '/dist/images/'; ?>

<section id="projects" class="page-section">
  <ul class="bg-image absolute-cover no-list">
    <li class="absolute-cover active" style="background: url('<?php echo $images . 'forest-edited.jpg'; ?>') no-repeat 0% center / cover"></li>
    <li class="absolute-cover"></li>
  </ul>
  <div class="col-2">
    <article>
      <div class="title">
        <span id="project-number" class="h1">01</span>
        <span id="project-title" class="h2">NatureWorks</span>
      </div>
      <div class="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum massa quis mollis varius. Vivamus pellentesque odio at vestibulum luctus. Quisque congue ex felis, semper fringilla tortor euismod in. Donec vitae fringilla est. Suspendisse enim urna, tristique ullamcorper luctus quis, auctor at leo. In sodales, erat non rhoncus tincidunt, nibh urna blandit nunc, vel gravida libero dolor quis augue. Mauris malesuada accumsan neque, a tincidunt velit fermentum sed. Fusce nunc risus, commodo eget tortor ac, sollicitudin varius nisl. Aliquam erat volutpat. Suspendisse tellus erat, scelerisque dapibus ex a, euismod cursus nibh. Duis ultricies eros in velit malesuada, nec porttitor eros ultricies. Morbi mollis pellentesque tellus, vitae posuere lectus faucibus ut.</p>
      <a class="button" href="www.google.com">Vist Site</a>
      </div>   
    </article>
    <aside>
      <div class="logo">
        <div class="image"><img src="<?php echo $images . 'natureworks-logo.png'; ?>" /></div>
      </div>
      <div class="gallery-container">
        <div class="image-inner">
          <ul class="image-slider no-list">
            <li style="background: url('<?php echo $images . 'forest-edited.jpg'; ?>') no-repeat 0% center / cover"></li>
            <li style="background: url('<?php echo $images . 'preview-1.jpg'; ?>') no-repeat 0% center / cover"></li>
            <li style="background: url('<?php echo $images . 'preview-2.jpg'; ?>') no-repeat 0% center / cover"></li>
            <li style="background: url('<?php echo $images . 'preview-3.jpg'; ?>') no-repeat 0% center / cover"></li>
            <li style="background: url('<?php echo $images . 'preview-4.jpg'; ?>') no-repeat 0% center / cover"></li>
          </ul>
          <ul class="no-list preview-container">
            <li><div class="preview-image" style="background: url('<?php echo $images . 'preview-1.jpg'; ?>') no-repeat 0% center / cover"></div></li>
            <li><div class="preview-image" style="background: url('<?php echo $images . 'preview-2.jpg'; ?>') no-repeat 0% center / cover"></div></li>
            <li><div class="preview-image" style="background: url('<?php echo $images . 'preview-3.jpg'; ?>') no-repeat 0% center / cover"></div></li>
            <li><div class="preview-image" style="background: url('<?php echo $images . 'preview-4.jpg'; ?>') no-repeat 0% center / cover"></div></li>
            <li class="magnifier"></li>
          </ul>  
        </div>
      </div>
      <nav>
        <ul class="arrows no-list">
          <li class="next"><span class="absolute-center">></span></li>
          <li class="prev"><span class="absolute-center"><</span></li>
        </ul>
        <div class="progress">
          <div class="progress-inner">
            <div class="bar"></div>
            <div class="current">01</div>
            <div class="total">03</div>
          </div>
          
        </div>
      </nav>
    </aside>
  </div>
</section>
<section id="map" class="page-section">
<ul class="bg-image absolute-cover no-list">
  <li class="absolute-cover active">

  </li>
  <li class="absolute-cover"></li>
</ul>
</section>


<?php get_footer(); ?>
