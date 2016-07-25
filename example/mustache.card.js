import devboard from '../';
import React from 'react';

var definecard = devboard.ns('5. Mustache demo');

definecard(`
Most of the demos so far have used React, but that isn't required.

This page shows an example of using devboard with mustache templates and jQuery.
`);

import $contactListEditor from "./contactListEditor";
definecard("Editable Contact List",
  mustacheCard(
    require("./contact-list.tpl.html"),
    {
      contacts: [
        {name: "Glen", email: "glen@stainlessed.co.uk"},
        {name: "Larry", email: "larry@google.com"},
        {name: "Tim", email: "tim@apple.com"},
        {name: "Jeff", email: "jeff@amazon.com"},
        {name: "Mark", email: "mark@fb.com"}
      ]
    },
    node => $contactListEditor(node)
  )
);

function mustacheCard(template, data, extra) {
  return (
    <div ref={node => {
      if (node) {
        node.innerHTML = template(data);
        if (extra) {
          extra(node);
        }
      }
    }}/>
  );
}
