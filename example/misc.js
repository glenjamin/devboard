import React from 'react';

var BASE_URL = 'https://github.com/glenjamin/devboard/tree/master/example';

export function sourceLink(definecard, dir, file) {
  definecard(
    <a
      href={BASE_URL + '/' + dir + '/' + file}
      style={{ position: 'absolute', top: 5, right: 5 }}
    >
      Page Source
    </a>
  );
}
