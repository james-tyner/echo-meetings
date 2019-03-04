<nav id="sidebar">
  <img id="logo" src="assets/Logo on Dark.svg" alt="logo-img">
  <div class="nav-items">
    <a href="index.php" class="nav-item <?php echo $active == "dashboard" ? 'active' : '' ?>">Dashboard</a>
    <a href="meetings.php" class="nav-item <?php echo $active == "meetings" ? 'active' : '' ?>">Meetings</a>
    <a href="tasks.php" class="nav-item <?php echo $active == "tasks" ? 'active' : '' ?>">Tasks</a>
    <a href="teams.php" class="nav-item <?php echo $active == "teams" ? 'active' : '' ?>">Teams</a>
  </div>

  <!-- bottom part -->
  <div class="profile">
    <!-- User Photo -->
    <div id="profile-photo"></div>
    <div id="profile-info">
      <!-- User Name -->
      <a href="#"><?php echo $username; ?></a>
      <!-- Sign Out -->
      <a id="signout" href="#">Sign Out</a>
    </div>
  </div>
</nav>
