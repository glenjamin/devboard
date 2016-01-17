import devcards from '../';
import React from 'react';
import Button from './Button';

var devcard = devcards.ns('buttons');

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
  (
    <div>
      <Button kind="default">default</Button>
      <Button kind="primary">primary</Button>
      <Button kind="success">success</Button>
      <Button kind="info">info</Button>
      <Button kind="warning">warning</Button>
      <Button kind="danger">danger</Button>
      <Button kind="link">link</Button>
    </div>
  )
);
