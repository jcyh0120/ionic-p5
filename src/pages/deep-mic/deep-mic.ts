
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Platform } from "ionic-angular";

declare var p5: any;

/**
 * Generated class for the DeepMicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-deep-mic",
  templateUrl: "deep-mic.html"
})
export class DeepMicPage {
  myp5: any;
  input: any;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log("custructor DeepMicPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DeepMicPage");
  }

  ionViewDidEnter() {}

  ionViewDidLeave() {
    // this.input.stop();
    // this.myp5.noLoop();
  }

  hello() {
    var s = p => {
      p.setup = () => {
        console.log("p", p);

        console.log("p5", p5);

        var cnv = p.createCanvas(
          document.getElementById("micCanvas").clientWidth,
          document.getElementById("micCanvas").clientHeight
        );
        cnv.parent("micCanvas"); // id="myCanvas"と紐づけ

        // must add this line
        p.getAudioContext().resume();
        this.input = new p5.AudioIn();

        this.input.start();
        console.log(p.getAudioContext());
        this.input.start(
          res => console.log("success", res),
          res => console.log("error", res)
        );
        console.log(p.getAudioContext());
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

        // console.log(volume);

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
    console.log("this.myp5", this.myp5);
  }
}
