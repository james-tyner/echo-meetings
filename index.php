<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
$username = "Mars"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "dashboard"; // controls which sidebar item is highlighted. Options are: dashboard, meetings, tasks, teams
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

<header>
  <h1 class="page-title">Dashboard</h1>
</header>

<!-- middle area -->
<!-- middle area -->
<main>
  <header>
    <h1 class="page-title">Dashboard</h1>
  </header>
<main>
  <section>
    <div class="up-next-div">
      <h2>Up Next</h2>

      <div class="grid-4">
        <div class="card">
          <h2 class="card-heading">Website Redesign Meeting</h2>
          <p class="card-date">Jan. 1 at 8 pm</p>
          <div class="card-description">
            <div class="team-members">
              <div class="member-img-div">
                <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
              </div>
              <div class="member-img-div">
                <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
              </div>
            </div>
            <h3 class="card-team">ITP 460</h3>
          </div>
        </div>
        <div class="card">
          <h2 class="card-heading">Prototype Review Meeting</h2>
          <p class="card-date">Jan. 18 at 12 pm</p>
          <div class="card-description">
            <div class="team-members">
              <div class="member-img-div">
                <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
              </div>
              <div class="member-img-div">
                <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
              </div>
            </div>
            <h3 class="card-team">ITP 460</h3>
          </div>
        </div>
        <div class="card">
          <h2 class="card-heading">New E-Board Introduction Meeting</h2>
          <p class="card-date">Jan. 12 at 12 pm</p>
          <div class="card-description">
            <div class="team-members">
              <div class="member-img-div">
                <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
              </div>
              <div class="member-img-div">
                <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
              </div>
            </div>
            <h3 class="card-team">E-Board (Soccer Club)</h3>
          </div>
        </div>
        <div class="add-meeting-div">
          <a href="#"><i class="material-icons"> add </i></a>
        </div>
      </div>
    </div>

    <div class="task-team-flexbox">
      <div class="tasks-div">
        <h2>Tasks</h2>
        <div class="card">
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
          <div class="task-item-div">
            <label for="task-1">Create Workspace Filtering dropdown</label>
            <p class="task-due">12/01/18</p>
            <select id="task-1">
              <option value="1" selected>Not Started</option>
              <option value="2">In Progress</option>
              <option value="3">Done</option>
            </select>
          </div>
        </div>
      </div>

      <div class="team-div">
        <h2>Team</h2>
        <div class="team">
          <h3 class="team-name">Designers</h3>
          <h4 class="group-name">ITP 460</h4>
          <div class="team-members">
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
          </div>
        </div>
        <div class="team">
          <h3 class="team-name">Programmers</h3>
          <h4 class="group-name">ITP 460</h4>
          <div class="team-members">
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
          </div>
        </div>
        <div class="team">
          <h3 class="team-name">E-Board</h3>
          <h4 class="group-name">Soccer Club</h4>
          <div class="team-members">
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
            <div class="member-img-div">
              <img src="assets/profile-img-sample.jpg" alt="profile-img-james">
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</main>

</body>
</html>
