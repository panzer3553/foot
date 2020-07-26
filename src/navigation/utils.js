import {Navigation} from 'react-native-navigation';
import routes from './routes';
import {Platform} from 'react-native';
// import { iconsMap } from '../utils/AppIcons';
import {Colors, Images} from '../themes';
import {HeaderStyle} from './constants';
import {i18nTranslator} from '../i18n';
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();

const SIDE_MENU_ID = 'menu';
const LIST_HOME_SCREENS = ['home', 'product', 'businessInfo'];
const SCREEN_OVERLAY = {
  android: 'overCurrentContext',
  ios: 'fullScreen',
};

class NavigationUtils {
  sideMenuVisible = false;

  currentScreenId = 'home';

  isOverlay = false;

  welcomeAppearTime = null;

  isNotification = false;

  constructor() {
    this.lastClickScreen = new Date();
    Navigation.events().registerComponentDidAppearListener(
      ({componentId, componentType, componentName}) => {
        // if (componentId === 'menu') {
        //   return;
        // }
        if (componentName === 'notification') {
          this.isNotification = true;
          return;
        }
        this.currentScreenId = componentId;
        // if (componentId === 'welcome') {
        //   this.welcomeAppearTime = new Date();
        // }
        // if (componentId === 'home' || componentId === 'myOrder') {
        //   if (
        //     this.welcomeAppearTime &&
        //     new Date().getTime() - this.welcomeAppearTime.getTime() < 1000
        //   ) {
        //     return;
        //   }
        // if (!this.isOverlay) {
        //   Navigation.showOverlay({
        //     component: {
        //       id: 'overlay',
        //       name: 'overlayButton',
        //       options: {
        //         overlay: {
        //           interceptTouchOutside: false,
        //         },
        //       },
        //     },
        //   });
        // }
        // }
        // if (componentId !== 'overlay') {
        //   this.currentScreenId = componentId;
        // }
        // if (componentId === 'overlay') {
        //   this.isOverlay = true;
        // }
      },
    );

    // Navigation.events().registerComponentDidDisappearListener(
    //   ({ componentId }) => {
    //     if (componentId === 'overlay') {
    //       this.isOverlay = false;
    //     }
    //     if (componentId === 'notification') {
    //       this.isNotification = false;
    //     }
    //   },
    // );

    Navigation.events().registerNavigationButtonPressedListener(
      ({buttonId}) => {
        if (buttonId === 'backBtt') {
          Navigation.pop(this.currentScreenId);
        }
        if (buttonId === 'closeBtt') {
          Navigation.dismissAllModals();
        }
        if (buttonId === 'menuBtt') {
          this.toggleSideMenu();
        }
        if (buttonId === 'btnAddSchedule') {
          this.push({
            screen: 'addSchedule',
            title: i18nTranslator('HEADER_ADD_SCHEDULE'),
          });
        }
      },
    );

    Navigation.events().registerModalDismissedListener((item) => {
      this.currentScreenId = this.backupCurrentScreenId;
    });
  }

  dismissOverlay = async () => {
    try {
      await Navigation.dismissOverlay('overlay');
    } catch (err) {
      console.log(err);
    }
  };

  showNotification = ({title, content, type}) => {
    console.log(type);
    try {
      Navigation.showOverlay({
        component: {
          name: 'notification',
          passProps: {
            title,
            content,
            type,
          },
          options: {
            overlay: {
              interceptTouchOutside: false,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  dismissAllModals = () => {
    Navigation.dismissAllModals();
  };

  dismissNotification = () => {
    Navigation.dismissOverlay('notification');
  };

  openSideMenu() {
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: true,
          enabled: true,
        },
      },
    });
  }

  closeSideMenu() {
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: false,
          enabled: true,
        },
      },
    });
  }

  toggleSideMenu = () => {
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: true,
          enabled: true,
        },
      },
    });
  };

  startLoginContent() {
    Navigation.setRoot(routes.rootLoginRoute);
  }

  startMainContent() {
    Navigation.setRoot(routes.rootHomeRoute);
  }

  changeToHomeTab() {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 0,
      },
    });
  }

  changeToOrderTab() {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });
  }

  push({
    screen,
    title,
    passProps,
    isBack = true,
    isTopBarEnable = true,
    leftButtons,
    rightButtons,
    noBorder = true,
    topBarDrawBehind,
    componentId,
    statusBar = {},
    haveLandscape,
    isAnimation = true,
  }) {
    console.log('status bar', statusBar);
    const currentClickScreen = new Date();
    if (currentClickScreen.getTime() - this.lastClickScreen.getTime() < 400) {
      this.lastClickScreen = currentClickScreen;
      return;
    }
    this.lastClickScreen = currentClickScreen;
    Navigation.push(this.currentScreenId, {
      component: {
        name: screen,
        passProps,
        id: componentId,
        options: {
          layout: {
            orientation: haveLandscape
              ? ['portrait', 'landscape']
              : isTablet
              ? ['portrait', 'landscape']
              : ['portrait'],
          },
          statusBar: {
            style: 'light',
            ...statusBar,
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
          },
          animations: !isAnimation
            ? {
                push: {
                  enabled: isAnimation,
                },
              }
            : undefined,
          topBar: {
            visible: isTopBarEnable,
            title: {
              text: title,
              ...HeaderStyle,
            },
            noBorder,
            drawBehind: !!topBarDrawBehind,
            buttonColor: 'black',
            leftButtons: isBack
              ? [
                  {
                    id: 'backBtt',
                    icon: Images.BACK,
                    color: Colors.main,
                  },
                ]
              : leftButtons || [],
            rightButtons: rightButtons || [],
          },
        },
      },
    });
  }

  mergeOptions = (componentId, options) => {
    Navigation.mergeOptions(componentId, options);
  };

  pop = () => {
    Navigation.pop(this.currentScreenId);
  };

  popTo = (name) => {
    Navigation.popTo(name);
  };

  popToRoot = () => {
    Navigation.popToRoot('home');
  };

  showModal = ({screen, title, isClose = true, isApply, passProps}) => {
    const currentClickScreen = new Date();
    if (currentClickScreen.getTime() - this.lastClickScreen.getTime() < 400) {
      this.lastClickScreen = currentClickScreen;
      return;
    }
    this.lastClickScreen = currentClickScreen;
    this.backupCurrentScreenId = this.currentScreenId;
    if (this.isOverlay) {
      Navigation.dismissOverlay('overlay');
    }
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: screen,
              passProps,
              options: {
                topBar: {
                  visible: true,
                  noBorder: true,
                  title: {
                    text: title,
                    ...HeaderStyle,
                  },
                  overlay: {
                    interceptTouchOutside: false,
                  },
                  layout: {
                    componentBackgroundColor: 'transparent',
                    backgroundColor: 'transparent',
                  },
                  modalPresentationStyle: SCREEN_OVERLAY[Platform.OS],
                  buttonColor: 'black',
                  leftButtons: isClose
                    ? [
                        {
                          id: 'closeBtt',
                          icon: Images.CLOSE,
                          color: 'black',
                        },
                      ]
                    : [],
                  rightButtons: isApply
                    ? [
                        {
                          id: 'applyBtt',
                          text: 'Apply',
                          color: Colors.main,
                        },
                      ]
                    : [],
                },
              },
            },
          },
        ],
      },
    });
  };

  resetTo = ({screen, isTopBarEnable = true, title}) => {
    Navigation.setStackRoot(this.currentScreenId, {
      component: {
        name: screen,
        options: {
          animations: {
            setStackRoot: {
              enable: false,
            },
          },
          topBar: {
            visible: isTopBarEnable,
            title: {
              text: title,
              fontFamily: 'VillerayRounded-Light',
              fontSize: 17,
            },
            buttonColor: 'black',
            leftButtons: [
              {
                id: 'menuBtt',
                icon: Images.menu,
                color: 'black',
              },
            ],
          },
          layout: {
            backgroundColor: 'white',
            orientation: ['portrait'],
          },
        },
      },
    });
  };

  changeBottomTab(index) {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: index,
      },
    });
  }
}

export default new NavigationUtils();
