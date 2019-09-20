const textarea = document.getElementsByTagName('textarea');
// alert(textarea.length);
for (var i = 0; i < textarea.length; i++) {
  // alert(textarea[0]);
  textarea[i].setAttribute(
    'style',
    'height:' + textarea[i].scrollHeight + 'px;overflow-y:hidden;'
  );
  textarea[i].addEventListener('input', OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}
