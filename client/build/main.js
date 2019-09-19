var tx = document.getElementsByClassName('comment-area-responsive');

for (var i = 0; i < tx.length + 1; i++) {
  //   alert(i);
  tx[i].setAttribute(
    'style',
    'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
  );
  tx[i].addEventListener('change', OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  alert('hi2');
  this.style.height = this.scrollHeight + 'px';
}
