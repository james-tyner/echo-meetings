<?php
$title = "Congratulations!";
$username = "Mars"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
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
  <div class="confetti-launcher">

  </div>
  <div class="card meeting-end-card">
    <div class="card-header">
      <h2> Congratulations! </h2>
      <p>The <span class="meeting-name-span">Web Redesign Meeting</span> has ended.</p>
      <p>Meeting minutes will be shared with all attendees.</p>
    </div>

    <div class="card-body">
      <h1 class="page-title">Web Redesign Meeting</h1>
      <p class="date">Date: <span class="date-span">January 27, 2019 @ 6:32PM</span></p>

      <div class="agenda-item-list">
        <div class="agenda-item">
          <h3>Agenda Item One:</h3>
          <div class="tasks-div">
            <div class="task-item-div">
              <label for="task-1">Support color token autocomplete in filter</label>
              <p class="task-due task-upcoming">12/01/18</p>
              <select id="task-1">
                <option value="1">Not Started</option>
                <option value="2" selected>In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
            <div class="task-item-div">
              <label for="task-1">Update program brainstorm class page</label>
              <p class="task-due task-progress">12/01/18</p>
              <select id="task-1">
                <option value="1" selected>Not Started</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
          </div>
        </div>
        <div class="agenda-item">
          <h3>Agenda Item One:</h3>
          <div class="tasks-div">
            <div class="task-item-div">
              <label for="task-1">Support color token autocomplete in filter</label>
              <p class="task-due task-upcoming">12/01/18</p>
              <select id="task-1">
                <option value="1">Not Started</option>
                <option value="2" selected>In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
            <div class="task-item-div">
              <label for="task-1">Update program brainstorm class page</label>
              <p class="task-due task-progress">12/01/18</p>
              <select id="task-1">
                <option value="1" selected>Not Started</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
  <div class="button-group">
    <button class="button create-meeting-btn">Create New Meeting</button>
    <button class="button dashboard-btn" onclick="location.href='index.php'">Return to Dashboard</button>
  </div>
</main>
<!--not sure we are using jquery on other places-->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="js/confetti.js"></script>
<script>
    (function () {
        setTimeout(() => confeeti($('.confetti-launcher')), 3000);
    })()
</script>

</body>
</html>
