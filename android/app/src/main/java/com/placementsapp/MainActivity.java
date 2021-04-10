package com.placementsapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "PlacementsApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }
}
