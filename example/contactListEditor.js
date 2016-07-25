import $ from "jquery";

var formTemplate = require("./contact-form.tpl.html");

export default function $contactListEditor(node) {
  var $node = $(node);
  var $list = $node.find(".js-contact-list");
  var $formTemplate = $(formTemplate());
  $node.off(".contactListEditor");
  $node.on("click.contactListEditor", ".js-contact-item", function() {
    var $form = $formTemplate.insertAfter($list);
    var $item = $(this);

    var $name = $item.find(".js-contact-name");
    var $email = $item.find(".js-contact-email");
    var $nameInput = $form.find("input[name=name]");
    var $emailInput = $form.find("input[name=email]");

    $nameInput.val($name.text());
    $emailInput.val($email.text());

    $form.on("submit", (e) => {
      e.preventDefault();
      $name.text($nameInput.val());
      $email.text($emailInput.val());
      $form.remove();
    });
  });
}
