import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  template: `
  <div>
    <div id="dataInfo">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image2.png" width="100" height="100"
                                    alt="Card image cap">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image3.png" width="100" height="100"
                                    alt="Card image cap">

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image4.png" width="100" height="100"
                                    alt="Card image cap">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image3.png" width="100" height="100"
                                    alt="Card image cap">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image3.png" width="100" height="100"
                                    alt="Card image cap">

                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image2.png" width="100" height="100"
                                    alt="Card image cap">

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image4.png" width="100" height="100"
                                    alt="Card image cap">

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img class="card-img-top img-fluid" src="assets/image2.png" width="100" height="100"
                                    alt="Card image cap">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>

            </a>
            <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>

            </a>
        </div>
    </div>
</div>`,
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
