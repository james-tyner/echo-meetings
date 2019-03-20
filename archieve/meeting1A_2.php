<?php
$title = "Meetings";
$username = "Katlyn"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
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

	<header class="scrollable-header">
		<div class="add-button align-right">
		  <a href="createmeeting.php"><i class="material-icons"> add </i></a>
		</div>
		<h1 class="page-title"> Meetings </h1>
		<div class="filter-bar">
			<p>Filter by group:</p>
			<a class="filter-group" href="meeting1A.php">All</a>
			<a class="filter-group selected" href="meeting1A_2.php">ITP 460</a>
			<a class="filter-group" href="meeting1A_3.php">WRIT 340</a>
			<a class="filter-group" href="meeting1A_4.php">SOCCER CLUB</a>
		</div>
	</header>

	<!-- middle area -->
	<main>

		<section class="meeting-cards">
      <div class="mtg-card" style="top:5em;">
  			<div class="card green-color-band centered">
  				<h3 class="card-team green">ITP 460</h3>
  				<h2 class="card-heading">Website Redesign Meeting</h2>
  			</div>

  			<p class="mtg-date"> Feb 27</p>
  		</div>
		</section>
	</main>

</body>
</html>
