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
        <div class="agenda-icon-tray">
          <i class="far fa-sticky-note active"></i>
          <i class="fas fa-tasks active"></i>
        </div>
        <h2>Agenda Item One</h2>
        <p contenteditable="true" class="agenda-item-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae velit ligula. Praesent accumsan lacus urna, ut blandit libero viverra ac. Maecenas leo magna, efficitur sit amet ipsum a, placerat varius nisi.</p>

        <h3>Notes</h3>
        <p contenteditable="true" class="agenda-item-note">Etiam eget elit vel est egestas ornare. Quisque nisl nisi, tempor tincidunt urna maximus, tincidunt pellentesque sem. Praesent feugiat odio vitae imperdiet sollicitudin. Mauris a cursus orci, id venenatis mi. Integer in dui et augue tincidunt pretium. Sed id placerat tortor. Fusce aliquam molestie risus, in fringilla lacus auctor ut.</p>

        <h3>Action Items</h3>
        <div class="agenda-action-items">
          <div class="action-item">
            <input type="checkbox">
            <div class="action-item-text">
              <p contenteditable="true" class="action-item-description">Sed vitae rhoncus lectus, eget sagittis nibh</p>
              <p contenteditable="true" class="due-date">due Thursday</p>
            </div>
            <div class="assignees">
              <div class="assignee-photo"></div>
            </div>
          </div>
          <div class="action-item">
            <input type="checkbox">
            <div class="action-item-text">
              <p contenteditable="true" class="action-item-description">Sed vitae rhoncus lectus, eget sagittis nibh</p>
              <p contenteditable="true" class="due-date">due Thursday</p>
            </div>
            <div class="assignees">
              <div class="assignee-photo"></div>
              <div class="assignee-photo"></div>
            </div>
          </div>
          <div class="action-item">
            <input type="checkbox">
            <div class="action-item-text">
              <p contenteditable="true" class="action-item-description">Sed vitae rhoncus lectus, eget sagittis nibh</p>
              <p contenteditable="true" class="due-date">due Thursday</p>
            </div>
            <div class="assignees">
              <div class="assignee-photo"></div>
            </div>
          </div>
          <div class="action-item">
            <input type="checkbox" disabled>
            <div class="action-item-text">
              <p contenteditable="true" class="start-typing-description">Start typing…</p>
              <p contenteditable="true" class="start-typing-due-date">due…</p>
            </div>
            <div class="assignees">
              <i class="fas fa-user-plus"></i>
              <div class="add-assignee">
                <p class="add-team">Add team members…</p>
                <div class="add-assignee-row">
                  <div class="add-assignee-img"></div>
                  <p class="add-assignee-name">James</p>
                </div>
                <div class="add-assignee-row">
                  <div class="add-assignee-img"></div>
                  <p class="add-assignee-name">Mars</p>
                </div>
                <div class="add-assignee-row">
                  <div class="add-assignee-img"></div>
                  <p class="add-assignee-name">Katlyn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

			<!-- Agenda Item 2 -->
			<div class="agenda-item">
        <div class="agenda-icon-tray">
          <i class="far fa-sticky-note"></i>
          <i class="fas fa-tasks"></i>
        </div>
        <h2>Agenda Item Two</h2>
        <p contenteditable="true" class="agenda-item-description">Praesent efficitur egestas tellus, at viverra purus facilisis vitae. Mauris sit amet feugiat nisl. Nulla facilisi. Nunc bibendum a mi id tristique. Vestibulum tincidunt turpis metus, at malesuada arcu mattis ut.</p>
      </div>

      <div class="agenda-item">
        <div class="agenda-icon-tray">
          <i class="far fa-sticky-note"></i>
          <i class="fas fa-tasks"></i>
        </div>
        <h2>Agenda Item Three</h2>
        <p contenteditable="true" class="agenda-item-note">Fusce sed ligula aliquam, hendrerit purus id, dictum felis. Sed pharetra mauris id justo sollicitudin molestie. Phasellus at magna sit amet sem consectetur consequat. Nunc placerat felis nec nulla.</p>
      </div>
		</section>
	</main>

	<!-- right sidebar -->
	<section class="right-bar">
		<!-- Start/End Button -->
		<div id="meeting-start-btn">Start Meeting</div>

		<!-- Agenda Item ToC -->
		<div class="agenda-list-div">
				<div class="agenda-list-item active"> Agenda Item One</div>
				<div class="agenda-list-item"> Agenda Item Two</div>
				<div class="agenda-list-item"> Agenda Item Three</div>
		</div>
	</section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="js/lib/autoresize.jquery.js"></script>
  <script src="js/meetings-scripts.js"></script>
</body>
</html>
