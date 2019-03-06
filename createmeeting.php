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
 	<main id="create-meeting-main">

 		<section>
      <div id="name">
      <h2>Name</h2>
      <input type="text" name="name" placeholder="set meeting name"></input>
    </div>
    <div id="date">
      <h2>Date</h2>
      <input type="date" name="name"  ></input>
    </div>
<div id="at">at</div>

    <div id="time">
      <h2>Time</h2>
      <input type="time" name="name"  ></input>
    </div>

    <div id="location">
      <h2>Location</h2>
      <input type="text" name="name" placeholder="set location"></input>
    </div>

    <div id="button">
      <button type="button">Create New Meeting</button>
    </div>

<hr id="side-line">

 		</section>

    <section>

      <div id="add-team">

        <h3>Add Team</h2>

        <input type="text" name="name" placeholder="search teams" ><i class="fa fa-search" aria-hidden="true" ></i></input>

      </div>

    </section>
 	</main>

 </body>
 </html>
