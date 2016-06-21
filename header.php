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
  <script src="https://use.typekit.net/qxj3hxt.js"></script>
  <script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>


<body <?php body_class(); ?>>

  <div ng-controller="OffCanvasCtrl">
    <div class="off-canvas-wrap" data-offcanvas>
      <div class="inner-wrap">
        <nav class="tab-bar">

          <section class="left tab-bar-section">
            <h1 class="title">DKA-ARK</h1>
          </section>

          <section class="right-small">
            <a class="right-off-canvas-toggle menu-icon" href="#"><span></span></a>
          </section>
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