import React from 'react';
import {
  Scene,
  Router,
  Stack,
  ActionConst,
  Tabs,
} from 'react-native-router-flux';
import Home from '../containers/Home';
import Notifications from '../containers/Notifications';
import Splash from '../containers/Splash';
import Intro from '../containers/Intro';
import OurServices from '../containers/OurServices';
import Portfolio from '../containers/Portfolio';
import Contact from '../containers/Contact';
import Tabbar from '../components/Tabbar';
import MainNavBar from '../components/MainNavBar';
import SingleProject from '../containers/SingleProject';
import SingleBlog from '../containers/SingleBlog';
import SingleService from '../containers/SingleService';
const stateHandler = (prevState, newState, action) => {};
const RouterNav = () => (
  <Router onStateChange={stateHandler} navBar={MainNavBar}>
    <Tabs key="tabBar" type={ActionConst.RESET} tabBarComponent={Tabbar}>
      <Stack key="Main">
        <Scene
          key="splash"
          component={Splash}
          initial={true}
          type={ActionConst.RESET}
          gesturesEnabled={false}
          hideTabBar={true}
          hideNavBar={true}
          back={false}
        />
        <Scene
          key="intro"
          component={Intro}
          type={ActionConst.RESET}
          gesturesEnabled={false}
          hideTabBar={true}
          hideNavBar={true}
          back={false}
        />
        <Scene
          component={Home}
          title="Home"
          key="home"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
        <Scene
          component={OurServices}
          title="Services"
          key="services"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
        <Scene
          component={Portfolio}
          title="Portfolio"
          key="portfolio"
          type={ActionConst.RESET}
          type="reset"
          gesturesEnabled={false}
        />
        <Scene
          component={SingleBlog}
          title="SingleBlog"
          key="singleBlog"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
        <Scene
          component={SingleService}
          title="SingleService"
          key="singleservice"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
        <Scene
          component={SingleProject}
          title="singleproject"
          key="singleproject"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
        <Scene
          component={Notifications}
          title="Notifications"
          key="notifications"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
        <Scene
          key="contact"
          hideNavBar={false}
          component={Contact}
          title="Contact"
          type={ActionConst.RESET}
          gesturesEnabled={false}
        />
      </Stack>
    </Tabs>
  </Router>
);
export default RouterNav;
