import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer2",
  template: `
    <footer style="background-color:#fff;">
      <div class="container">
        <div class="footer_inner">
          <div class="row">
            <div class="col-12">
              <div class="footer_logo">
                <a>
                  <img src="assets/newlogo.png" alt="Logo" />
                </a>
              </div>
              <div class="footer_menu">
                <ul>
                  <li class="cursor">
                    <a [routerLink]="['/about-wondrfly']"> About Us</a>
                  </li>
                  <li class="cursor">
                    <a [routerLink]="['/blogs']">Blog</a>
                  </li>
                  <li class="cursor">
                    <a [routerLink]="['/faq']">FAQ</a>
                  </li>
                  <!-- <li class="cursor">
                            <a [routerLink]="['/ambassador-policy']">Ambassador</a>
                          </li> -->
                  <li class="cursor">
                    <a [routerLink]="['/term-condition']">Terms & Conditions</a>
                  </li>
                  <li class="cursor">
                    <a [routerLink]="['/privacy-policy']">Privacy Policy</a>
                  </li>
                  <li class="cursor">
                    <a [routerLink]="['/contactUs']">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div class="footer-icons cursor">
                <a
                  href="https://www.facebook.com/wondrfly"
                  target="_blank"
                  class="fb"
                >
                  <img src="assets/fb-black.svg" />
                </a>
                <a
                  href="https://www.instagram.com/wondrfly/"
                  target="_blank"
                  class="insta"
                >
                  <img src="assets/insta-black.svg" />
                </a>
                <!-- <a href="#" class="tweet">
                          <img src="assets/tweet-black.svg">
                         </a> -->
                <a
                  href="https://www.pinterest.com/wondrfly/"
                  target="_blank"
                  class="pin"
                >
                  <img src="assets/pin-black.svg" />
                </a>
                <!-- <a href="#" class="link">
                          <img src="assets/link-black.svg">
                         </a> -->
              </div>
              <div class="copyright_text">
                <p>© 2021 Wondrfly Inc. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ["./footer2.component.css"],
})
export class Footer2Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
