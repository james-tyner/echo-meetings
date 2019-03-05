<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
$username = "James"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables

?>

<!-- This page will be a splash screen, eventually. For now, just add a link to login/signup -->

<!DOCTYPE html>
<html lang='en'>
<head>
	<?php require 'components/metadata.php'; ?>
  <style>
  input{
    position: absolute;
 width: 300px;
 height: 40px;
 left: 25%;
 top: 150%;
 border-radius: 8px;
 text-indent: 8px;
 font-size: 15px;
 box-shadow:  10px  rgba(0,0,0,0.1);


  }

  input::placeholder{
    font-style: italic;
  }

  h2{
    position: absolute;
  width: 275px;
  height: 23px;
  left: 25%;
  top: 90%;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 24px;

  color: #222222;
  }
  #location h2{
    position:absolute;
   left: 25%;
    top: 220%;

  }

  #location input{
    left: 25%;
    top: 280%;
    width: 500px;

  }

  button{
    position: absolute;
  width: 200px;
  height: 44px;
  left: 25%;
  top: 380%;
  background: #00D9BD;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-family: Rubik;
  }

    #add-members h3{
      position: absolute;
  width: 277px;
  height: 60px;
  left: 355%;
  top: 90%;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 18px;

  color: #000000;

  color: #000000;
    }
    #add-members input{
      left: 360%;
      top: 140%;
      width: 200px;
      height: 30px;
      font-size: 11px;
      border: none;
      border-bottom: 1px solid #000000;
      box-shadow: none;
      border-radius: 0px;
      background: transparent;
      opacity: 0%;
      text-indent: 18px;


    }

    i{
      margin-left: 340%;
    position: absolute;
    top: 145%;
    }

  #side-line{
    position: absolute;
  width: 260%;
  height: 0px;
  left: 200%;
  top: 270%;

  /* Gray/3 */
  border: 0.5px solid #777777;
  transform: rotate(90deg);
  }
  </style>
</head>
<body>
	<!-- navbar -->
	<?php require 'components/nav.php'; ?>

	<!-- middle area -->
	<main>
		<header>
			<h1 class="page-title">Create Team</h1>
		</header>

		<section>

       <div id="name">
       <h2>Team Name</h2>
       <input type="text" name="name" placeholder="set team name" ></input>
     </div>
     <div id="location">
       <h2>Description</h2>
       <input type="text" name="name" placeholder="set description" ></input>
     </div>

     <div id="button">
       <button type="button">Create New Team</button>
     </div>
		</section>
    <hr id="side-line">

     		</section>

        <section>

          <div id="add-members">

            <h3>Add Members</h2>

            <input type="text" name="name" placeholder="search members" ><i class="fa fa-search" aria-hidden="true" ></i></input>

          </div>

        </section>
	</main>

</body>
</html>
