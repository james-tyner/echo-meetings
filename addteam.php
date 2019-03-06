<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
<<<<<<< HEAD
$username = "James"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "teams";
=======
$username = "Jessica"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables
$active = "teams";

>>>>>>> 6f6804611fb9a4dd9b372bf609c40a88c19ee484
?>

<!-- This page will be a splash screen, eventually. For now, just add a link to login/signup -->

<!DOCTYPE html>
<html lang='en'>
<head>
	<?php require 'components/metadata.php'; ?>
  <style>
  input{
    position: fixed;
 width: 35%;
 height: 5%;
 left: 25%;
 top: 30%;
 border-radius: 8px;
 text-indent: 8px;
 font-size: 15px;
 box-shadow:  10px  rgba(0,0,0,0.1);


  }

  input::placeholder{
    font-style: italic;
  }
  textarea::placeholder{
    font-style: italic;
    padding-top: 2%;
  }

  h1{
    position: fixed;
    left: 25%;
  top: 10%;
  }

   h2{
     position: fixed;
  width: 200%;
  height: 100%;
  left: 25%;
  top: 20%;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 24px;

  color: #222222;
   }

   #location h2{
     position:fixed;
     left: 25%;
     top: 40%;

   }



  #location textarea{
    left: 25%;
    top: 50%;
    width: 35%;
    height: 20%;
    vertical-align: top;
    text-align: left;
position: fixed;

    border-radius: 8px;
    text-indent: 8px;
    font-size: 15px;
    box-shadow:  10px  rgba(0,0,0,0.1);

  }

  button{
    position: fixed;
  width: 15%;
  height: 6%;
  left: 25%;
  top: 82%;
  background: #00D9BD;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-family: Rubik;
  }

  #add-members h3{
    position: fixed;
width: 50%;
height: 50%;
left: 85%;
top: 20%;
font-family: Rubik;
font-style: normal;
font-weight: 500;
line-height: normal;
font-size: 18px;

color: #000000;
  }

  #add-members input{
    left: 83%;
    top: 30%;
    width: 15%;
    height: 5%;
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
  margin-left: 61%;
position: fixed;
top: 32%;
}


    #side-line{
      position: fixed;
    width: 50%;
    height: 0px;
    left: 55%;
    top: 49%;

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
       <textarea type="text" name="name" placeholder="set description" ></textarea>
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
