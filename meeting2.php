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
    <h1 class="page-title">Giving Project</h1>
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
        <h2>Fundraising</h2>
        <p contenteditable="true" class="agenda-item-description">We want to fundraise at least $3,000 to fund this project.</p>

        <h3>Notes</h3>
        <p contenteditable="true" class="agenda-item-note">We need to contact different companies who would potentially partner with us to fundraise and then come back with different options.</p>

        <h3>Action Items</h3>
        <div class="agenda-action-items">
          <div class="action-item">
            <input type="checkbox">
            <div class="action-item-text">
              <p contenteditable="true" class="action-item-description">Contact Krispy Kreme, get fundraiser info.</p>
              <p contenteditable="true" class="due-date">due Thursday</p>
            </div>
            <div class="assignees">
              <div class="assignee-photo"></div>
            </div>
          </div>
          <div class="action-item">
            <input type="checkbox">
            <div class="action-item-text">
              <p contenteditable="true" class="action-item-description">Contact Porto's and receive fundraising quotes.</p>
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
              <p contenteditable="true" class="action-item-description">Talk to USG about potential fundraising opportunities.</p>
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
        <h2>Touch Base with Charity</h2>
        <p contenteditable="true" class="agenda-item-description">This year, we will focus our giving project to Red Cross. We need a club representative to contact the organization and figure out logistics in donation.</p>
      </div>

      <div class="agenda-item">
        <div class="agenda-icon-tray">
          <i class="far fa-sticky-note"></i>
          <i class="fas fa-tasks"></i>
        </div>
        <h2>Promote Event</h2>
        <p contenteditable="true" class="agenda-item-note">We want to engage our entire campus, both undergraduate and graduate students, to contribute to this giving project. We are looking for donations or engagements from at least 2,000 students. So we will need extensive efforts in promoting the event the next month.</p>
      </div>
		</section>
	</main>

	<!-- right sidebar -->
	<section class="right-bar">
		<!-- Start/End Button -->
		<div id="meeting-start-btn">Start Meeting</div>

		<!-- Agenda Item ToC -->
		<div class="agenda-list-div">
				<div class="agenda-list-item active"> Fundraising</div>
				<div class="agenda-list-item"> Touch Base with Charity</div>
				<div class="agenda-list-item"> Promote Event</div>
		</div>
	</section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="js/lib/autoresize.jquery.js"></script>
  <script src="js/meetings-scripts.js"></script>
</body>
</html>
