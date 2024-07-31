<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?>


<div class="footer-image">
 <div class="footer-image-container">
  <img src="https://www.johnfhuntpower.co.uk/wp-content/uploads/2018/10/JFH-Power-Illustration-Banner-3B-New-JFH-Blue-e1540211262468.jpg" alt="JFH Power Illustration Banner " />
 </div>
</div>

<div class="footer">
 <div class="footer-container">

<div class="footer-container-Contact">
    <p>
		South East
	</p>
	<hr>
	     Magnet Road<br />
            Grays<br />
            Essex<br />
            RM20 4DP<br />
       Tel: 01375 366 766<br />
       <a href="mailto:power@johnfhunt.co.uk">power@johnfhunt.co.uk</a></p>

    </div>


  <div class="footer-container-Contact">
   
    <p>South West</p>
	  <hr>
	     Bradley Road<br />
			Portbury<br />
            Bristol<br />
            BS20 7NZ<br />
       Tel: 0117 901 2199<br />
       <a href="mailto:power@johnfhunt.co.uk">power@johnfhunt.co.uk</a>

   </div>


 <div class="footer-container-Contact">
	      <p>North East</p>
	 	  <hr>
Portobello Trading Estate<br />
Shadon Way<br />
Chester-Le-Street<br />
        DH3 2RN<br />
       Tel: 0191 411 1200<br />
       <a href="mailto:power@johnfhunt.co.uk">power@johnfhunt.co.uk</a>
    </div>

  <div class="footer-container-Contact">
   
    <p>Midlands</p>
	  	  <hr>
     Fairfield Park<br />
		Halesowen<br />
		West Midlands<br />
		B62 9JL<br />
       Tel: 0121 559 1818<br />
       <a href="mailto:power@johnfhunt.co.uk">power@johnfhunt.co.uk</a>
  </div>
	 
	<div class="footer-container-Contact">
	     <p>Scotland</p>
			  <hr>
		Nasmyth Square<br />
		Livingston<br />
		West Lothian<br />
		EH54 5GG<br />
		Tel: 01506 353 399<br />

       <a href="mailto:power@johnfhunt.co.uk">power@johnfhunt.co.uk</a>
	</div>
	
 </div>



 <div class="copyright">
  <p> John F Hunt Power is part of the <a href="https://www.johnfhunt.co.uk" target="_blank">John F Hunt Group</a><br />
  © Copyright 2018 - John F Hunt Power. All Rights Reserved. | <a href="/privacy-policy/" target="_blank">Privacy Policy |</a>
 <a href="/terms-of-website-use/" target="_blank">Terms & Conditions</a><br />
	  Web & IT Support by TechVertu</p>
 </div>
 </div>

</div>




<?php get_sidebar( 'footer' ); ?>

			<div class="site-info">
				<?php do_action( 'twentyfourteen_credits' ); ?>
				<a href="<?php echo esc_url( __( 'http://www.johnfhunt.co.uk/', 'twentyfourteen' ) ); ?>"><?php printf( __( ' %s', 'johnfhunt' ), '' ); ?></a>
			</div>
	</div>

	<?php wp_footer(); ?>
