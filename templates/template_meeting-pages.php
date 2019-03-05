<?php
$title = "Meetings";
$username = "James"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
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

	<!-- middle area -->
	<main>
		<header>
			<h1> Meeting Page </h1>
		</header>

		<section>
			<!-- Agenda Item 1 -->
			<div class="agenda-item"></div>

			<!-- Agenda Item 2 -->
			<div class="agenda-item"></div>
		</section>
	</main>

	<!-- right sidebar -->
	<section class="right-bar">
		<!-- Start/End Button -->
		<button>Start/End Meeting</button>

		<!-- Agenda Item ToC -->
		<div class="agenda-list-div">
			<ul class="agenda-list">
				<li class="agenda-list-item"> Agenda Item 1</li>
				<li class="agenda-list-item"> Agenda Item 2</li>
				<li class="agenda-list-item"> Agenda Item 3</li>
			</ul>
		</div>
	</section>

</body>
</html>
