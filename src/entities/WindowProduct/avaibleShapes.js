/**
 * Icons
 */
import windowOnePane from '@images/configurator/windows-shapes/window-one-pane.svg';
import windowTwoPanes from '@images/configurator/windows-shapes/window-two-panes.svg';
import windowThreePanes from '@images/configurator/windows-shapes/window-three-panes.svg';
import door from '@images/configurator/windows-shapes/door.svg';
import windowOnePaneAndDoor from '@images/configurator/windows-shapes/window-one-pane-and-door.svg';
import windowTwoPanesAndDoor from '@images/configurator/windows-shapes/window-two-panes-and-door.svg';
import windowThreePanesAndDoor from '@images/configurator/windows-shapes/window-three-panes-and-door.svg';
import windowDoorWindow from '@images/configurator/windows-shapes/window-door-window.svg';

const avaibleShapes = [
  {
    value: 'windowOnePane',
    icon: windowOnePane,
    elements: [{ type: 'window', panes: [0] }]
  },
  {
    value: 'windowTwoPanes',
    icon: windowTwoPanes,
    elements: [{ type: 'window', panes: [0, 1] }]
  },
  {
    value: 'windowThreePanes',
    icon: windowThreePanes,
    elements: [{ type: 'window', panes: [0, 1, 0] }]
  },
  {
    value: 'door',
    icon: door,
    elements: [{ type: 'door', panes: [1] }]
  },
  {
    value: 'windowOnePaneAndDoor',
    icon: windowOnePaneAndDoor,
    elements: [
      { type: 'window', panes: [1] },
      { type: 'door', panes: [1] }
    ]
  },
  {
    value: 'windowTwoPanesAndDoor',
    icon: windowTwoPanesAndDoor,
    elements: [
      { type: 'window', panes: [0, 1] },
      { type: 'door', panes: [1] }
    ]
  },
  {
    value: 'windowDoorWindow',
    icon: windowDoorWindow,
    elements: [
      { type: 'window', panes: [1] },
      { type: 'door', panes: [1] },
      { type: 'window', panes: [2] }
    ]
  },
  {
    value: 'windowThreePanesAndDoor',
    icon: windowThreePanesAndDoor,
    elements: [
      { type: 'window', panes: [0, 1, 0] },
      { type: 'door', panes: [1] }
    ]
  }
];

export default avaibleShapes;
