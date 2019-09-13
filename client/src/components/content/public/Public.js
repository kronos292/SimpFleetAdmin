import React, { Component } from "react";

import MainSection from "./MainSection";
import UserGuideSection from "./userGuide/UserGuideSection";
import ContactUsSection from "./contactUs/ContactUsSection";
import SimpFleetExplainationSection from "./simpFleetExplaination/SimpFleetExplainationSection";
import WhySimpFleetSection from "./whySimpFleet/WhySimpFleetSection";
import FeatureSection from "./features/FeaturesSection";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

class Public extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#49AE4B"
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <MainSection />
        <SimpFleetExplainationSection />
        <WhySimpFleetSection />
        <UserGuideSection />
        <FeatureSection />
        <ContactUsSection />
      </ThemeProvider>
    );
  }
}

export default Public;
