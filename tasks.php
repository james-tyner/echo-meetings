<?php
$title = "";
$username = ""; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "dashboard";
?>

<!DOCTYPE html>
<html lang='en'>
<head>
	<?php require 'components/metadata.php'; ?>
	<link rel="stylesheet/scss" type="text/css" href="styles.scss">
	<style>

		main {
			margin-top: 15px;
		}

		body {
			margin: 0px;
			background: #FCFCFC;
			font-family: Rubik;
			font-style: normal;
			line-height: normal;
		}
		hr {
			border: 1px solid #EEEEEE;
		}
		#filterbar {
			color: #777777;
			height: 50px;
			font-weight: 500;
			font-size: 14px;
		}
		#options {
			margin-left: 20px;
		}
		#options button {
			padding: 12px 30px;
			margin: 0px 5px;
			border: none;
			border-radius: 30px;
			color: #777777;
			background-color: #EEEEEE;
			font-size: 12px;
			text-align: center;
		}
		#options button#selected {
			color: #FCFCFC;
			background-color: #777777;
		}
		#not-started, #in-progress, #complete {
			width: 325px;
			float: left;
			padding: 0px 10px;
		}
		button.num-circle {
			width: 26px;
			height: 26px;
			border-radius: 50%;
			border: 2px solid #CCCCCC;
			font-weight: 500;
			font-size: 14px;
			color: #CCCCCC;
			background: #FCFCFC;
			float: left;
			margin: 21px 10px 0px 45px;
		}
		#in-progress .num-circle {
			margin-left: 50px;
		}
		#complete .num-circle {
			margin-left: 60px;
		}
		#not-started > h2, #in-progress > h2, #complete > h2 {
			font-weight: 500;
			font-size: 24px;
			color: #777777;
			width: 143.87px;
			float: left;
		}
		
		.clear-float {
			clear: both;
		}
		.card {
			min-width: 260px;
			margin-bottom: 18px;
		}
		.card-team-itp460 {
			color: #00d9bd !important;
		}
		.color-band-itp460 {
	    	border-left: 10px solid #00d9bd;
	    }
	    .card-team-writ340 {
			color: #ff5f77 !important;
		}
	    .color-band-writ340 {
	    	border-left: 10px solid #ff5f77;
	    }
	    .card-team-soccerclub {
			color: #4c98f2 !important;
		}
	    .color-band-soccerclub {
	    	border-left: 10px solid #4c98f2;
	    }
		.red {
			color: #ff5f77;
		}
	</style>
</head>
<body>
	<!-- navbar -->
	<?php require 'components/nav.php'; ?>

	<!-- middle area -->
	<main>
		<h1> My Tasks </h1>

		<!-- filter bar -->
		<section>
			<div id="filterbar">
				Filter by group:
				<span id="options">
					<button class="option" id="selected">ALL</button>
					<button class="option">ITP 460</button>
					<button class="option">WRIT 340</button>
					<button class="option">SOCCER CLUB</button>
				</span> <!-- #options -->
			</div> <!-- #filterbar -->
		</section>

		<hr/>

		<!-- kanban -->
		<section>
			<div id="kanban">
				<div id="not-started">
					<button class="num-circle" disabled>4</button>
					<h2>Not Started</h2>
					<div class="clear-float"></div>

					<!-- card 1 -->
					<div class="card color-band-itp460">
						<h3 class="card-team card-team-itp460">ITP 460</h3>
						<h2 class="card-heading">Update Completed Tasks view to use React</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 2</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 8</div>
					    	<div class="icon-group"><i class="fas fa-clock"></i> tomorrow</div>
						</div>
					</div>

					<!-- card 2 -->
					<div class="card color-band-itp460">
						<h3 class="card-team card-team-itp460">ITP 460</h3>
						<h2 class="card-heading">Re-add comment icons to task list items</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 3</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 2</div>
					    	<div class="icon-group"><i class="fas fa-clock"></i> 2 days</div>
						</div>
					</div>

					<!-- card 3 -->
					<div class="card color-band-writ340">
						<h3 class="card-team card-team-writ340">WRIT 340</h3>
						<h2 class="card-heading">Update program brainstorming for class page</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 4</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 5</div>
					    	<div class="icon-group"><i class="fas fa-clock"></i> 3 days</div>
						</div>
					</div>

					<!-- card 4 -->
					<div class="card color-band-soccerclub">
						<h3 class="card-team card-team-soccerclub">SOCCER CLUB</h3>
						<h2 class="card-heading">Plan bake sale fundraiser for new uniforms</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 11</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 1</div>
					    	<div class="icon-group"><i class="fas fa-clock"></i> 6 days</div>
						</div>
					</div>

				</div> <!-- #not-started -->

				<div id="in-progress">
					<button class="num-circle" disabled>1</button>
					<h2>In Progress</h2>
					<div class="clear-float"></div>

					<!-- card 1 -->
					<div class="card color-band-soccerclub">
						<h3 class="card-team card-team-soccerclub">SOCCER CLUB</h3>
						<h2 class="card-heading">Fill out player agreement form and email it to Jane</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 1</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 0</div>
					    	<div class="icon-group red"><i class="fas fa-clock"></i> yesterday</div>
						</div>
					</div>
				</div> <!-- #in-progress -->

				<div id="complete">
					<button class="num-circle" disabled>2</button>
					<h2>Complete</h2>
					<div class="clear-float"></div>

					<!-- card 1 -->
					<div class="card color-band-itp460">
						<h3 class="card-team card-team-itp460">ITP 460</h3>
						<h2 class="card-heading">Create workspace filtering dropdown menu</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 7</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 22</div>
					    	<div class="icon-group"><i class="fas fa-clock"></i> today</div>
						</div>
					</div>

					<!-- card 2 -->
					<div class="card color-band-writ340">
						<h3 class="card-team card-team-writ340">WRIT 340</h3>
						<h2 class="card-heading">Conduct field research with students on campus</h2>
						<div class="card-icons">
					    	<div class="icon-group"><i class="fas fa-user-circle"></i> 9</div>
					    	<div class="icon-group"><i class="fas fa-comment"></i> 13</div>
					    	<div class="icon-group"><i class="fas fa-clock"></i> yesterday</div>
						</div>
					</div>

				</div> <!-- #complete -->
				
				<div class="clear-float"></div>
			</div> <!-- #kanban -->
		</section>
	</main>

</body>