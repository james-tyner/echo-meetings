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

	<header>
		<h1 class="page-title">Meetings</h1>
	</header>

	<!-- middle area -->
	<main>
      <div class="filter-bar">
				<p>Filter by group:</p>
				<a class="filter-group" href="meeting1A.php">All</a>
				<a class="filter-group" href="meeting1A_2.php">ITP 460</a>
				<a class="filter-group" href="meeting1A_3.php">WRIT 340</a>
				<a class="filter-group selected" href="meeting1A_4.php">SOCCER CLUB</a>
			</div>

		<section>
      <div class="mtg-card">
  			<div class="card red-color-band">
  				<h3 class="red-card-team">SOCCER CLUB</h3>
  				<h2 class="card-heading">Plan Logistics for Playoffs</h2>
  			</div>

  			<p class="mtg-date"> Mar 20</p>
  		</div>
		</section>
	</main>

</body>
</html>
