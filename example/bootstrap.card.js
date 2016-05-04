import devboard from '../';
import React from 'react';

import { sourceLink } from './misc';
import Label from './Label';
import Button from './Button';
import ProgressBar from './ProgressBar';
import Accordion from './Accordion';
import Panel from './Panel';

var definecard = devboard.ns('3. Bootstrap Example');

definecard(`
This page is intended to give you an overview of what it might be like to use
Devboard to build an interactive style guide for your component library.
`);

sourceLink(definecard, __dirname, __filename);

definecard(
  'Labels',
  `
  A simple display of bootstrap labels.

  * default
  * primary
  * success
  * info
  * warning
  * danger
  `,
  (
    <div>
      <Label kind="default">default</Label>
      <Label kind="primary">primary</Label>
      <Label kind="success">success</Label>
      <Label kind="info">info</Label>
      <Label kind="warning">warning</Label>
      <Label kind="danger">danger</Label>
      <Label kind="link">link</Label>
    </div>
  )
);

definecard(
  'Buttons',
  `
  A simple display of bootstrap buttons.

  * default
  * primary
  * success
  * info
  * warning
  * danger
  * link
  `,
  <div style={{textAlign: 'center'}}>
    <Button kind="default">default</Button>
    <Button kind="primary">primary</Button>
    <Button kind="success">success</Button>
    <Button kind="info">info</Button>
    <Button kind="warning">warning</Button>
    <Button kind="danger">danger</Button>
    <Button kind="link">link</Button>
  </div>
);

definecard(
  'Progress Bars',
  `
  A variety of progress bars
  `,
  ({state}) => <div>
    <ProgressBar n={40} label />
    <ProgressBar n={60} type="success" />
    <ProgressBar n={35} type="danger" striped />
    <ProgressBar n={70} type="warning" striped animated />
    <ProgressBar n={state} type="info" label striped animated />
  </div>,
  {
    state: 0,
    onTick: ({setState}) => setState(s => (s + 1) % 100),
    tickInterval: 200
  }
);

definecard(
  'Accordion',
  `
  This component has some internal state. If hot reloading is
  configured correctly then the state will be preserved when the
  \`<Accordion>\` component's definition is changed.
  `,
  <Accordion>
    <Panel title="Group 1">
      Th’art nesh thee nay lad soft lad wacken thi sen up t’foot o’
      our stairs. Nay lad where’s tha bin. Th’art nesh thee a pint
      ‘o mild any rooad t’foot o’ our stairs.
    </Panel>
    <Panel title="Group 2">
      Where there’s muck there’s brass t’foot o’ our stairs ah’ll
      gi’ thee a thick ear. Ah’ll learn thi tintintin tell thi
      summat for nowt soft lad mardy bum. Chuffin’ nora ah’ll box
      thi ears soft lad ee by gum tell thi summat for nowt.
    </Panel>
    <Panel title="Group 3">
      Ah’ll gi’ thee a thick ear. Bobbar nay lad. Breadcake soft
      southern pansy wacken thi sen up. Be reet where’s tha bin
      mardy bum mardy bum. Tell thi summat for nowt where there’s
      muck there’s brass shu’ thi gob. Dahn t’coil oil. That’s
      champion ey up will ‘e ‘eckerslike shurrup by ‘eck.
    </Panel>
  </Accordion>
);
