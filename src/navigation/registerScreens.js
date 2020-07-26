import {Navigation} from 'react-native-navigation';

// https://docs.swmansion.com/react-native-gesture-handler/docs/getting-started.html
// Apply react-native-gesture-handler with wix/react-native-navigation
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import Intro from '../screens/Intro';
import About from '../screens/About';
import Home from '../screens/Home';
import Add from '../screens/Add';
import Library from '../screens/Library';
import ViewImage from '../screens/ViewImage';
import EditImage from '../screens/EditImage';
import Preview from '../screens/Preview';
import Template from '../screens/Template';
// import Login from '../screens/Login';
// import Signup from '../screens/SignUp';
// import Favorite from '../screens/Favorite';
// import Home from '../screens/Home';
// import Map from '../screens/Map';
// import More from '../screens/More';
// import WebView from '../screens/WebView';
// import Profile from '../screens/Profile';
// import Temple from '../screens/Temple';
// import Stream from '../screens/Stream';
// import Religion from '../screens/Religion';
// import NotificationAlert from '../components/Notification';
// import StreamView from '../screens/StreamView';
// import ForgotPassword from '../screens/ForgotPassword';
// import ChangePassword from '../screens/ChangePassword';
// import ResetPassword from '../screens/ResetPassword';

import {withReduxProvider} from '../redux/store';
// import TempleManagement from '../screens/TempleManagement';
// import CreateStream from '../screens/CreateStream';
// import AddSchedule from '../screens/AddSchedule';

// import DistanceFilter from '../screens/DistanceFilter';
// import Help from '../screens/Help';
// import SelectOffering from '../screens/SelectOffering';
// import StreamSchedule from '../screens/StreamSchedule';
// import EditSchedule from '../screens/EditSchedule';

function registerScreens(store) {
  Navigation.registerComponent(
    'about',
    () => withReduxProvider(About),
    () => About,
  );
  Navigation.registerComponent(
    'home',
    () => withReduxProvider(Home),
    () => Home,
  );
  Navigation.registerComponent(
    'add',
    () => withReduxProvider(Add),
    () => Add,
  );
  Navigation.registerComponent(
    'library',
    () => withReduxProvider(Library),
    () => Library,
  );
  Navigation.registerComponent(
    'viewImage',
    () => withReduxProvider(ViewImage),
    () => ViewImage,
  );
  Navigation.registerComponent(
    'editImage',
    () => withReduxProvider(EditImage),
    () => EditImage,
  );
  Navigation.registerComponent(
    'preview',
    () => withReduxProvider(Preview),
    () => Preview,
  );
  Navigation.registerComponent(
    'template',
    () => withReduxProvider(Template),
    () => Template,
  );
  // Navigation.registerComponent(
  //   'login',
  //   () => withReduxProvider(Login),
  //   () => Login,
  // );
  // Navigation.registerComponent(
  //   'signup',
  //   () => withReduxProvider(Signup),
  //   () => Signup,
  // );
  // Navigation.registerComponent(
  //   'favorite',
  //   () => withReduxProvider(Favorite),
  //   () => Favorite,
  // );
  // Navigation.registerComponent(
  //   'home',
  //   () => withReduxProvider(Home),
  //   () => Home,
  // );
  // Navigation.registerComponent(
  //   'map',
  //   () => withReduxProvider(Map),
  //   () => Map,
  // );
  // Navigation.registerComponent(
  //   'more',
  //   () => withReduxProvider(More),
  //   () => More,
  // );
  // Navigation.registerComponent(
  //   'webView',
  //   () => withReduxProvider(WebView),
  //   () => WebView,
  // );
  // Navigation.registerComponent(
  //   'profile',
  //   () => withReduxProvider(Profile),
  //   () => Profile,
  // );
  // Navigation.registerComponent(
  //   'temple',
  //   () => withReduxProvider(Temple),
  //   () => Temple,
  // );
  // Navigation.registerComponent(
  //   'stream',
  //   () => withReduxProvider(Stream),
  //   () => Stream,
  // );
  // Navigation.registerComponent(
  //   'notification',
  //   () => NotificationAlert,
  //   () => NotificationAlert,
  // );
  // Navigation.registerComponent(
  //   'religion',
  //   () => withReduxProvider(Religion),
  //   () => Religion,
  // );
  // Navigation.registerComponent(
  //   'changePassword',
  //   () => withReduxProvider(ChangePassword),
  //   () => ChangePassword,
  // );
  // Navigation.registerComponent(
  //   'templeManagement',
  //   () => withReduxProvider(TempleManagement),
  //   () => TempleManagement,
  // );
  // Navigation.registerComponent(
  //   'streamView',
  //   () => withReduxProvider(StreamView),
  //   () => StreamView,
  // );
  // Navigation.registerComponent(
  //   'createStream',
  //   () => withReduxProvider(CreateStream),
  //   () => CreateStream,
  // );
  // Navigation.registerComponent(
  //   'addSchedule',
  //   () => withReduxProvider(AddSchedule),
  //   () => AddSchedule,
  // );
  // Navigation.registerComponent(
  //   'forgotPassword',
  //   () => withReduxProvider(ForgotPassword),
  //   () => ForgotPassword,
  // );
  // Navigation.registerComponent(
  //   'resetPassword',
  //   () => withReduxProvider(ResetPassword),
  //   () => ResetPassword,
  // );
  // Navigation.registerComponent(
  //   'distanceFilter',
  //   () => withReduxProvider(DistanceFilter),
  //   () => DistanceFilter,
  // );
  // Navigation.registerComponent(
  //   'help',
  //   () => withReduxProvider(Help),
  //   () => Help,
  // );
  // Navigation.registerComponent(
  //   'about',
  //   () => withReduxProvider(About),
  //   () => About,
  // );
  // Navigation.registerComponent(
  //   'selectOffering',
  //   () => withReduxProvider(SelectOffering),
  //   () => SelectOffering,
  // );
  // Navigation.registerComponent(
  //   'streamSchedule',
  //   () => withReduxProvider(gestureHandlerRootHOC(StreamSchedule)),
  //   () => StreamSchedule,
  // );

  // Navigation.registerComponent(
  //   'editSchedule',
  //   () => withReduxProvider(EditSchedule),
  //   () => EditSchedule,
  // );

  // Navigation.registerComponentWithRedux('term', () => Term, Provider, store);

  // Navigation.registerComponentWithRedux('home', () => Home, Provider, store);

  // Navigation.registerComponentWithRedux(
  //   'drawer',
  //   () => Sidebar,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'notificationList',
  //   () => Notification,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'carList',
  //   () => gestureHandlerRootHOC(CarList),
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'paymentMethod',
  //   () => PaymentMethod,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'notification',
  //   () => NotificationAlert,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'parkingList',
  //   () => gestureHandlerRootHOC(ParkingList),
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'parkingDetail',
  //   () => ParkingDetail,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'profile',
  //   () => Profile,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'bookingList',
  //   () => BookingList,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'addCar',
  //   () => AddCar,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'forgotPassword',
  //   () => ForgotPassword,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'resetPassword',
  //   () => ResetPassword,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux('chat', () => Chat, Provider, store);

  // Navigation.registerComponentWithRedux(
  //   'activity',
  //   () => Activity,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'flightLog',
  //   () => FlightLog,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'rating',
  //   () => Rating,
  //   Provider,
  //   store,
  // );

  // Navigation.registerComponentWithRedux(
  //   'changePassword',
  //   () => ChangePassword,
  //   Provider,
  //   store,
  // );
  // Navigation.registerComponentWithRedux(
  //   'bookingDetail',
  //   () => BookingDetail,
  //   Provider,
  //   store,
  // );
  // Navigation.registerComponentWithRedux(
  //   'contactList',
  //   () => ContactList,
  //   Provider,
  //   store,
  // );
  // Navigation.registerComponentWithRedux(
  //   'contactDetail',
  //   () => ContactDetail,
  //   Provider,
  //   store,
  // );
}

export default registerScreens;
