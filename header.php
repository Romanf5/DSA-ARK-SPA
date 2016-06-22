<!doctype html>
<html class="no-js" lang="en" ng-app="dsaArkTheme">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>
    <?php wp_title('&laquo;', true, 'right'); ?>
    <?php bloginfo('name'); ?>
  </title>
  <?php wp_head();?>
  <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css" rel="stylesheet">
  <script src="https://use.typekit.net/qxj3hxt.js"></script>
  <script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>


<body <?php body_class(); ?>>
  <div id="loading-bar-container"></div>
  <div ng-controller="OffCanvasCtrl">
    <div class="off-canvas-wrap" data-offcanvas>
      <div class="inner-wrap">
        <nav class="tab-bar">
          <div class="container">
            <div class="row">
          <section class="left tab-bar-section">
            <img src="<?php echo get_template_directory_uri() ?>/app/img/icons/logo.svg" alt="" class="logo">
          </section>

          <section class="right-small">
            <a class="right-off-canvas-toggle menu-icon door-icon" href="#"><span></span></a>
          </section>
          </div>
          </div>
        </nav>

        <aside class="right-off-canvas-menu">
          <ul class="off-canvas-list">
            <li><a href="#">Arkitect to Go</a></li>
            <li><a href="#">Om DSA</a></li>
            <li><a href="#">Samarbejestpartnere</a></li>
            <li><a href="#">Kontakt</a></li>
          </ul>
        </aside>


        <section class="main-section">
          <!-- content goes here -->
          


          <div class="container">
            <div class="row">