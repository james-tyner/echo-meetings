<?php
$title = "Website Redesign Meeting";
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

  <header class="scrollable-header meeting-header">
    <h1 class="page-title">Website Redesign Meeting</h1>
  </header>

	<!-- middle area -->
	<main class="meeting-main">
		<section id="agenda">
			<!-- Agenda Item 1 -->
			<div class="agenda-item">
        <h2>Agenda Item One</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae velit ligula. Praesent accumsan lacus urna, ut blandit libero viverra ac. Maecenas leo magna, efficitur sit amet ipsum a, placerat varius nisi.</p>

        <h3>Notes</h3>
        <p>Etiam eget elit vel est egestas ornare. Quisque nisl nisi, tempor tincidunt urna maximus, tincidunt pellentesque sem. Praesent feugiat odio vitae imperdiet sollicitudin. Mauris a cursus orci, id venenatis mi. Integer in dui et augue tincidunt pretium. Sed id placerat tortor. Fusce aliquam molestie risus, in fringilla lacus auctor ut.</p>
      </div>

			<!-- Agenda Item 2 -->
			<div class="agenda-item">
        <h2>Agenda Item Two</h2>
        <p>Praesent efficitur egestas tellus, at viverra purus facilisis vitae. Mauris sit amet feugiat nisl. Nulla facilisi. Nunc bibendum a mi id tristique. Vestibulum tincidunt turpis metus, at malesuada arcu mattis ut.</p>
      </div>

      <div class="agenda-item">
        <h2>Agenda Item Three</h2>
        <p>Fusce sed ligula aliquam, hendrerit purus id, dictum felis. Sed pharetra mauris id justo sollicitudin molestie. Phasellus at magna sit amet sem consectetur consequat. Nunc placerat felis nec nulla.</p>
      </div>
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
