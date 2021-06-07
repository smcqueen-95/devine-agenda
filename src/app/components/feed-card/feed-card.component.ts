import { Component, Input, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { FeedService } from "src/app/services/feed.service";

@Component({
  selector: "app-feed-card",
  templateUrl: "./feed-card.component.html",
  styleUrls: ["./feed-card.component.scss"],
})
export class FeedCardComponent implements OnInit {
  @Input() loginUser: any;
  feedData: any;
  postData = {
    user_id: "",
    token: "",
    feed_id: "",
  };
  constructor(private feedService: FeedService, private alert: AlertService) {}

  ngOnInit() {
    this.feedService.feedData$.subscribe((res: any) => {
      this.feedData = res;
    });
  }

  feedDeleteAction(msgIndex: number) {
    this.postData.user_id = this.loginUser.user_id;
    this.postData.token = this.loginUser.token;
    this.alert
      .presentAlertConfirm('Delete feed', 'Do you want to delete this feed?')
      .then((res: any) => {
        if (res.role === 'okay') {
          this.feedService.feedDelete(this.postData).subscribe((res: any) => {
            if (res.success) {
              this.feedService.deleteFeedData(msgIndex);
            }
          });
        }
      });
  }

  makeFeedDelete(postData: any, feedIndex: number) {
    this.feedService.feedDelete(this.postData).subscribe((res: any) => {
      console.log(postData);
      if (res.success) {
        this.feedService.deleteFeedData(feedIndex);
      }
    });
  }
}
