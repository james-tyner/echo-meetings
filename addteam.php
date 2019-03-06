<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
$username = "Jessica"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "teams";
?>

<!DOCTYPE html>
<html lang='en'>
<head>
  <?php require 'components/metadata.php'; ?>
  <style>


  </style>
</head>
<body>
<!-- navbar -->
<?php require 'components/nav.php'; ?>

<!-- middle area -->
<main id="add-team-main">
  <header>
    <h1 class="page-title">Create Team</h1>
  </header>

  <section>

    <div id="name">
      <h2>Team Name</h2>
      <input type="text" name="name" placeholder="set team name"></input>
    </div>
    <div id="location">
      <h2>Description</h2>
      <textarea type="text" name="name" placeholder="set description"></textarea>
    </div>

    <div id="button">
      <button type="button">Create New Team</button>
    </div>
  </section>
  <hr id="side-line">

  <section>

    <div id="add-members">

      <h3>Add Members</h3>

      <input type="text" name="name" placeholder="search members">
      <i class="fa fa-search" aria-hidden="true"></i>

    </div>

  </section>
</main>

</body>
</html>
