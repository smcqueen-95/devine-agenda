import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ToastService } from "src/app/services/toast.service";
import { FeedService } from "../../services/feed.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.page.html",
  styleUrls: ["./feed.page.scss"],
})
export class FeedPage implements OnInit {
  public authUser: any;
  postData = {
    user_id: "",
    token: "",
  };

  constructor(
    private authService: AuthService,
    private feedService: FeedService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.authService.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.getfeedData();
    });
  }

  getfeedData() {
    this.postData.user_id = this.authUser.user_id;
    this.postData.token = this.authUser.token;

    if (this.postData.user_id && this.postData.token) {
      this.feedService.feedData(this.postData).subscribe(
        (res: any) => {
          console.log(res.feedData);
          this.feedService.changeFeedData(res.feedData)
        },
        (error: any) => {
          this.toastService.presentToast("Network Issue");
        }
      );
    } 
  }
}
