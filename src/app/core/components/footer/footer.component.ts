import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer>
      <div class="container">
        <div class="footer_inner">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="footer_left">
                <div class="footer_menu">
                  <ul>
                    <li>
                      <a [routerLink]="['/about-wondrfly']"> About Us</a>
                    </li>
                    <li>
                      <a [routerLink]="['/blogs']">Blog</a>
                    </li>
                    <li>
                      <a [routerLink]="['/faq']">FAQ</a>
                    </li>
                    <!-- <li>
                                <a [routerLink]="['/ambassador-policy']">Ambassador</a>
                            </li> -->
                    <li>
                      <a [routerLink]="['/term-condition']"
                        >TERMS OF USE</a
                      >
                    </li>
                    <li>
                      <a [routerLink]="['/privacy-policy']">Privacy Policy</a>
                    </li>

                    <li>
                      <a [routerLink]="['/contactUs']">Contact Us</a>
                    </li>
                  </ul>
                </div>

                <div class="copyright_text">
                  <p>© {{currentYear}} Wondrfly Inc. All Rights Reserved.</p>
                </div>
              </div>

              <div class="social_icon_footer">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/wondrfly" target="_blank">
                      <span class="icon icon-facebook"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/teamwondrfly"
                      target="_blank"
                    >
                      <span class="icon icon-instagram"></span>
                    </a>
                  </li>
                  <!-- <li>
                            <a href="javascript:;">
                                <span class="icon icon-twitter"></span>
                            </a>
                        </li> -->
                  <li>
                    <a
                      href="https://www.pinterest.com/wondrfly/"
                      target="_blank"
                    >
                      <span class="icon icon-pinterest"></span>
                    </a>
                  </li>
                  <!-- <li>
                            <a href="#">
                                <span class="icon">
                                    <img src="assets/linkedin.png">
                                </span>
                            </a>
                        </li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
   currentYear =new Date().getFullYear()
  constructor() {}

  ngOnInit() {}
}
