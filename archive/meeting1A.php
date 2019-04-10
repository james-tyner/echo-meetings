<?php
$title = "Meetings";
$username = "Katlyn"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "meetings";

?>

<!DOCTYPE html>
<html lang='en'>
<head>
	<?php require 'components/metadata.php'; ?>

  <style type="text/css">
    a {
      text-decoration: none;
    }
  </style>
</head>
<body>
	<!-- navbar -->
	<?php require 'components/nav.php'; ?>

	<header class="scrollable-header">
		<div class="add-button align-right">
		  <a href="createmeeting.php"><i class="material-icons"> add </i></a>
		</div>

		<h1 class="page-title"> Meetings </h1>
		<div class="filter-bar">
			<p>Filter by group:</p>
			<a class="filter-group selected" href="meeting1A.php">All</a>
			<a class="filter-group" href="meeting1A_2.php">ITP 460</a>
			<a class="filter-group" href="meeting1A_3.php">WRIT 340</a>
			<a class="filter-group" href="meeting1A_4.php">SOCCER CLUB</a>
	</header>

	<!-- middle area -->
	<main>

		<section class="meeting-cards">
      <div class="mtg-card">
  			<div class="card green-color-band">
  				<h3 class="card-team green">ITP 460</h3>
  				<h2 class="card-heading">Work Session</h2>
  			</div>

  			<p class="mtg-date"> Feb 27</p>
  		</div>

  		<div class="mtg-card">
  			<div class="card blue-color-band">
  				<h3 class="card-team blue">WRIT 340</h3>
  				<h2 class="card-heading">Presentation Planning</h2>
  			</div>

  			<p class="mtg-date"> Mar 3</p>
  		</div>

      <a href="meeting2.php">
        <div class="mtg-card">
          <div class="card blue-color-band centered">
            <h3 class="card-team blue">WRIT 340</h3>
            <h2 class="card-heading">Giving Project</h2>
          </div>

          <p class="mtg-date"> Mar 10</p>
        </div>
      </a>
  		

  		<div class="mtg-card">
  			<div class="card red-color-band">
  				<h3 class="card-team red">SOCCER CLUB</h3>
  				<h2 class="card-heading">Playoff Logistics</h2>
  			</div>

  			<p class="mtg-date"> Mar 20</p>
  		</div>
		</section>
	</main> 



</body>
</html>
