<?php
/**
 * The main template file
 */

get_header(); ?>

<?php $images = get_stylesheet_directory_uri() . '/dist/images/'; ?>
<section id="landing" class="page-section active">
  <div class="content absolute-center">
    <?php echo genSvg('lg-logo', 'absolute-center'); ?>
    <h2>Hi! I'm Adam</h2>
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum massa quis mollis varius. Vivamus pellentesque odio at vestibulum luctus. Quisque congue ex felis, semper fringilla tortor euismod in. Donec vitae fringilla est. </P>
  </div>
</section>
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
      <a class="button" href="www.google.com"><span>Vist Site</span><?php echo genSvg('icon-arrow-right', 'absolute-center'); ?></a>
      </div>   
    </article>
    <aside>
      <div class="logo">
        <div class="image"><img src="<?php echo $images . 'natureworks-logo.png'; ?>" /></div>
      </div>
      <div id="project-gallery" class="gallery-container">
        <div class="gallery-inner">
          <div class="gallery-image active" style="background-image: url('<?php echo $images . 'forest-edited.jpg'; ?>')"></div>
          <div class="gallery-image"></div>
          
          <ul class="no-list preview-container">
            <li><div class="preview-image" style="background-image: url('<?php echo $images . 'preview-1.jpg'; ?>')"></div></li>
            <li><div class="preview-image" style="background-image: url('<?php echo $images . 'preview-2.jpg'; ?>')"></div></li>
            <li><div class="preview-image" style="background-image: url('<?php echo $images . 'preview-3.jpg'; ?>')"></div></li>
            <li><div class="preview-image" style="background-image: url('<?php echo $images . 'preview-4.jpg'; ?>')"></div></li>
            <li class="magnifier"></li>
          </ul>  
        </div>
      </div>
      <nav id="project-nav">
        <ul class="arrows no-list">
          <li class="next"><?php echo genSvg('icon-arrow-right', 'absolute-center'); ?></span></li>
          <li class="prev disabled"><?php echo genSvg('icon-arrow-left', 'absolute-center'); ?></li>
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
      <h1 class="h2">Interested In <br>Working Together?</h1>
      <p>Let's grab a coffee or beer to discuss how I can help you achieve your online goals. Drop me a line down below with your details and I will get in contact with your soon.</p>
      <div class="input-container">
        <label for="name">Name</label>
        <input type="text">
      </div>
    </article>
  </div>
</section>


<?php get_footer(); ?>
