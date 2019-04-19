<?php
$title = "Teams Home";
$username = "Katlyn"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "teams";

?>

<!DOCTYPE html>
<html lang='en'>
<head>
  <?php require 'components/metadata.php'; ?>
  <link rel="stylesheet" type="text/css" href="teams1.css">
</head>
<body>
  <!-- navbar -->
  <?php require 'components/nav.php'; ?>

  <header class="scrollable-header">
      <div class="add-button align-right">
        <a href="addteam.php"><i class="material-icons"> add </i></a>
      </div>
      <h1> Teams </h1>
      
  </header>
  <!-- middle area -->
  <main>
    <section class="team-list">
      <div class="team-card">
        <div class="card green-color-band">
          <h2 class="card-heading">ITP 460</h2>
          <div class="team-photos">
            <div class="profile-photo"></div>
            <div class="profile-photo"></div>
            <div class="profile-photo"></div>
            <div class="profile-photo"></div>
          </div>
        </div>
      </div> <!-- end .team-card -->

      <div class="team-card">
        <div class="card red-color-band">
          <h2 class="card-heading">WRIT 340</h2>
          <div class="team-photos">
            <div class="profile-photo"></div>
            <div class="profile-photo"></div>
          </div>
        </div>
      </div> <!-- end .team-card -->

      <div class="team-card">
        <div class="card blue-color-band">
          <h2 class="card-heading">Soccer Club</h2>
          <div class="team-photos">
            <div class="profile-photo"></div>
            <div class="profile-photo"></div>
            <div class="profile-photo"></div>
          </div>
        </div>
      </div> <!-- end .team-card -->
    </section>

  </main>

</body>
</html>
