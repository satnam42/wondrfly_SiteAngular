import { Component, OnInit, } from '@angular/core';
@Component({
  selector: 'not-found-404',
  template: `
  <section class="page_404">
  <div class="imgage-corners">
    <img src="assets/resouces-circle.png">
  </div>
	<div class="container">
		<div class="row">
		<div class="col-sm-12 ">
		<div class="col-12 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>


		</div>

		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>

		<p>the page you are looking for not avaible!</p>

		<a href="" class="link_404">Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>
  <div class="image-corners">
      <img src="assets/beta-image.png">
  </div>
</section>
  `,
  styles: [`
  .page_404{
    padding:40px 0;
    background:#fff;
    position:relative;
    min-height:100%;
  }

  .page_404  img{ width:100%;}

  .four_zero_four_bg{
      background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
      height: 400px;
      background-position: center;
   }
   .four_zero_four_bg h1{
   font-size:80px;
   }
  .four_zero_four_bg h3{
        font-size:80px;
  }
  .link_404{
      padding: 10px 20px;
      margin: 20px 0;
      display: inline-block;
      background-color: #53B2E8;
      border-color: #53B2E8;
      box-shadow: none;
      border-radius: 26px;
      font-weight: 600;
      font-size: 13px;
      color: #fff;
  }
    .contant_box_404{
       margin-top:-50px;
       }
       .page_404 .imgage-corners img {
        width:194px;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      .page_404 .image-corners img {
        width:194px;
        position: absolute;
        right: 0px;
        bottom:-35px;
      }
    `]
})
export class NotFound404Component implements OnInit {
  constructor(){

  }
  ngOnInit(){

  }
}
