import {Colors} from '../themes';
import {HeaderStyle} from './constants';
import DeviceInfo from 'react-native-device-info';

let isTablet = DeviceInfo.isTablet();

const loginRoute = {
  stack: {
    options: {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      layout: {
        orientation: isTablet ? ['portrait', 'landscape'] : ['portrait'],
      },
    },
    children: [
      {
        component: {
          id: 'intro',
          name: 'about',
        },
      },
    ],
  },
};

const mainRoute = {
  bottomTabs: {
    id: 'BottomTabsId',
    children: [
      {
        stack: {
          children: [
            {
              component: {
                name: 'home',
                options: {
                  topBar: {
                    drawBehind: true,
                    visible: false,
                  },
                  bottomTabs: {
                    visible: false,
                    drawBehind: true,
                  },
                  statusBar: {
                    style: 'light',
                  },
                  layout: {
                    orientation: isTablet
                      ? ['portrait', 'landscape']
                      : ['portrait'],
                  },
                },
              },
            },
          ],
          options: {
            bottomTab: {
              text: '',
              // selectedIcon: require('../images/Home.png'),
              // icon: require('../images/Home.png'),
              iconInsets: {top: 5, bottom: -5},
              iconColor: '#8F9BB3',
              selectedIconColor: Colors.primary,
            },
          },
        },
      },
      {
        stack: {
          children: [
            {
              component: {
                name: 'add',
                options: {
                  topBar: {
                    drawBehind: true,
                    visible: false,
                  },
                  bottomTabs: {
                    visible: false,
                    drawBehind: true,
                  },
                  statusBar: {
                    style: 'light',
                  },
                  layout: {
                    orientation: isTablet
                      ? ['portrait', 'landscape']
                      : ['portrait'],
                  },
                },
              },
            },
          ],
          options: {
            bottomTab: {
              text: '',
              selectedIcon: require('../images/Star.png'),
              icon: require('../images/Star.png'),
              iconInsets: {top: 5, bottom: -5},
              iconColor: '#8F9BB3',
              selectedIconColor: Colors.primary,
            },
          },
        },
      },
      {
        stack: {
          children: [
            {
              component: {
                id: 'library',
                name: 'library',
                options: {
                  topBar: {
                    drawBehind: true,
                    visible: false,
                  },
                  statusBar: {
                    style: 'light',
                  },
                  bottomTabs: {
                    visible: false,
                    drawBehind: true,
                  },
                  layout: {
                    orientation: isTablet
                      ? ['portrait', 'landscape']
                      : ['portrait'],
                  },
                },
              },
            },
          ],
          options: {
            bottomTab: {
              text: '',
              selectedIcon: require('../images/Map.png'),
              icon: require('../images/Map.png'),
              iconInsets: {top: 5, bottom: -5},
              iconColor: '#8F9BB3',
              selectedIconColor: Colors.primary,
            },
          },
        },
      },
      {
        stack: {
          children: [
            {
              component: {
                id: 'about',
                name: 'about',
                options: {
                  topBar: {
                    drawBehind: true,
                    visible: false,
                  },
                  bottomTabs: {
                    visible: false,
                    drawBehind: true,
                  },
                  layout: {
                    orientation: ['portrait'],
                  },
                  statusBar: {
                    style: 'light',
                  },
                },
              },
            },
          ],
          options: {
            layout: {
              orientation: ['portrait'],
            },
            bottomTab: {
              text: '',
              selectedIcon: require('../images/Options.png'),
              icon: require('../images/Options.png'),
              iconInsets: {top: 5, bottom: -5},
              iconColor: '#8F9BB3',
              selectedIconColor: Colors.primary,
            },
          },
        },
      },
    ],
    options: {
      layout: {
        orientation: ['portrait'],
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysHide', // Sets the title state for each tab.
      },
    },
  },
};

const rootLoginRoute = {
  root: loginRoute,
};

const rootMainRoute = {
  root: mainRoute,
};

export default {
  loginRoute,
  mainRoute,
  rootLoginRoute,
  rootMainRoute,
};
