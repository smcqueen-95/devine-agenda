import { Component, Input, OnInit } from "@angular/core";
import { FeedService } from "src/app/services/feed.service";

@Component({
  selector: "app-feed-update",
  templateUrl: "./feed-update.component.html",
  styleUrls: ["./feed-update.component.scss"],
})
export class FeedUpdateComponent implements OnInit {
  @Input() loginUser: any;
  postData = {
    feed_id: "",
    feed: "",
    lastCreated: "",
    user_id: "",
    token: "",
  };
  constructor(private feedService: FeedService) {}

  ngOnInit() {}

  feedUpdateAction() {
    if (this.postData.feed.length > 0) {
      this.postData.lastCreated = "";
      this.postData.user_id = this.loginUser.user_id;
      this.postData.token = this.loginUser.token;
      this.feedService.feedUpdate(this.postData).subscribe((res: any) => {
        this.postData.feed = "";
        this.feedService.updateFeedData(res.feedData);
      });
    }
  }
}
