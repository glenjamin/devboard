import devcards from '../';
import React from 'react';

import { sourceLink } from './misc';
import Button from './Button';
import Label from './Label';

var devcard = devcards.ns('Bootstrap Example');

sourceLink(devcard, __dirname, __filename);

devcard(
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

devcard(
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
