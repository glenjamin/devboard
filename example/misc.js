import React from 'react';

var BASE_URL = 'https://github.com/glenjamin/devcards-js/tree/master/example';

export function sourceLink(devcard, dir, file) {
  devcard(
    <a
      href={BASE_URL + '/' + dir + '/' + file}
      style={{ position: 'absolute', top: 5, right: 5 }}
    >
      Page Source
    </a>
  );
}
