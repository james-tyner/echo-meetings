<?php
$title = "";
$username = ""; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "dashboard";

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

</body>
</html>
