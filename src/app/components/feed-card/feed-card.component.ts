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

  feedDeleteAction(feedID: any, feedIndex: number) {
    this.postData.feed_id = feedID;
    this.postData.user_id = this.loginUser.user_id;
    this.postData.token = this.loginUser.token;
    this.alert
      .presentAlertConfirm("Delete Feed", "Do you want to delete this feed?")
      .then((res: any) => {
        console.log(res.role);
        if (res.role === "okay") {
          this.makeFeedDelete(this.postData, feedIndex);
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
