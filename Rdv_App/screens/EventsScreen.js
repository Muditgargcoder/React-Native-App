import * as React from 'react';

import Event from './eventscreens/Event';
import SubEvent from './eventscreens/subEvent';
import MainEvent from './eventscreens/mainEvent';


import { createStackNavigator, createAppContainer } from 'react-navigation';
navigationOptions = {
  drawerIcon:({ tintColor }) => (
      <Icon name="locate" style={{fontSize:24, color:tintColor}}/>
  )

}
const AppNavigator = createStackNavigator(
  {
    Home: Event,
    cat: SubEvent,
    mainEvent: MainEvent,
  },
  {
    initialRouteName: 'Home',
    
  }
);

export default AppNavigator;

// export default class EventsScreens extends React.Component {
//   render() {
//     return <AppNavigator />;
//   }
//}
