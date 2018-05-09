import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DeepMicPage } from '../pages/deep-mic/deep-mic';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = DeepMicPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    console.log('custructor MyApp');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

