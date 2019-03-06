<<?php
$title = "Create Meeting"; // title of the page is the heading1 and also appears in meta title
$username = "Jessica"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "meetings";
 ?>

 <!DOCTYPE html>
 <html lang='en'>
 <head>
 	<?php require 'components/metadata.php'; ?>
 </head>

 <body>
 	<!-- navbar -->
 	<?php require 'components/nav.php'; ?>

  <header>
    <h1 class="page-title">Create Meeting</h1>
  </header>

 	<!-- middle area -->
 	<main id="create-meeting-main" class="meeting-main">

 		<section id="meeting-form">
      <div id="name">
        <label for="meeting-name">Name</label>
        <input id="meeting-name" type="text" name="name" placeholder="Planning extravaganza…"></input>
      </div>

      <div id="date-time-block">
        <div id="label-row">
          <label id="date-label" for="meeting-date">Date</label>
          <label id="time-label" for="meeting-time">Time</label>
        </div>

        <div id="field-row">
          <input id="meeting-date" type="date" name="name"  ></input>
          <div id="at">at</div>
          <input id="meeting-time" type="time" name="name"  ></input>
        </div>
      </div>

      <div id="location">
        <label for="meeting-loc">Location</label>
        <input id="meeting-loc" type="text" name="name" placeholder="Timberwolves Room…"></input>
      </div>

      <button class="submit-button" type="button">Create Meeting</button>
 		</section>

    <section class="right-bar">

      <div id="add-team">
        <h3>Add Team</h2>
        <div id="team-search">
          <i class="fa fa-search" aria-hidden="true" ></i>
          <input type="text" name="name" placeholder="search teams" ></input>
        </div>
      </div>

    </section>
 	</main>

 </body>
 </html>
