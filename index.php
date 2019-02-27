<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
$username = "James"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables

?>

<!-- This page will be a splash screen, eventually. For now, just add a link to login/signup -->

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
			<h1 class="page-title">Dashboard</h1>
		</header>

		<section>

		</section>
	</main>

</body>
</html>
