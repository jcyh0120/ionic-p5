import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

declare var p5: any;
/**
 * Generated class for the DeepMicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "DeepMicPage",
  segment: "deep-mic/:id"
})
@Component({
  selector: "page-deep-mic",
  templateUrl: "deep-mic.html"
})
export class DeepMicPage {
  myp5: any;
  input: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DeepMicPage");
  }

  ionViewDidEnter() {
    var s = p => {
      p.setup = () => {
        var cnv = p.createCanvas(
          document.getElementById("micCanvas").clientWidth,
          document.getElementById("micCanvas").clientHeight
        );
        cnv.parent("micCanvas"); // id="myCanvas"と紐づけ

        this.input = new p5.AudioIn(function(e) {
          console.log("aaaaa", e);
        });

        this.input.start();
      };

      p.draw = () => {
        // Get the overall volume (between 0 and 1.0)
        var volume = this.input.getLevel();

        // If the volume > 0.1,  a rect is drawn at a random location.
        // The louder the volume, the larger the rectangle.
        var threshold = 0.1;
        if (volume > threshold) {
          p.stroke(0);
          p.fill(0, 100);
          p.rect(
            p.random(40, p.width),
            p.random(p.height),
            volume * 50,
            volume * 50
          );
        }

        console.log(volume);

        // Graph the overall potential volume, w/ a line at the threshold
        var y = p.map(volume, 0, 1, p.height, 0);
        var ythreshold = p.map(threshold, 0, 1, p.height, 0);

        p.noStroke();
        p.fill(175);
        p.rect(0, 0, 20, p.height);
        p.fill(0);
        p.rect(0, y, 20, y);
        p.stroke(0);
        p.line(0, ythreshold, 19, ythreshold);
      };
    };

    this.myp5 = new p5(s);
  }

  ionViewDidLeave() {
    this.input.stop();
    this.myp5.noLoop();
  }
}
