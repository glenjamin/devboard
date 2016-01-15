import devcard from '../';
import React from 'react';
import Label from './Label';

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
