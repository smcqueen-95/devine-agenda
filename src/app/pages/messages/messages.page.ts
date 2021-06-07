import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from "src/app/services/feed.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @Input() loginUser: any;
  feedData: any;
  postData = {
    user_id: "",
    token: "",
    feed_id:"",
  };

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.feedData$.subscribe((res: any) => {
      this.feedData = res;
    });
  }

}
