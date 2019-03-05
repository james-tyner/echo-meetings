<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
$username = "James"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
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

<!-- middle area -->
<main>
  <header>
    <h1 class="page-title">Dashboard</h1>
  </header>

  <section>
    <div class="up-next-div">
      <h2>Up Next</h2>
      <div class="card color-band">
        <h3 class="card-team">ITP 460</h3>
        <h2 class="card-heading">Update completed tasks to use React</h2>
        <div class="card-icons">
          <div class="icon-group"><i class="fas fa-user-circle"></i> 2</div>
          <div class="icon-group"><i class="fas fa-comment"></i> 8</div>
          <div class="icon-group"><i class="fas fa-clock"></i> tomorrow</div>
        </div>
      </div>

    </div>

    <div class="task-team-flexbox">
      <div class="tasks-div">
        <h2>Tasks</h2>
      </div>
      <div class="team-div">
        <h2>Team</h2>
      </div>
    </div>

  </section>
</main>

</body>
</html>
