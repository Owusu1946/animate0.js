export function createBox() {
  const el = document.createElement('div');
  el.className = 'fixture box';
  el.style.opacity = '0';
  el.style.transform = 'translateX(0px)';
  document.getElementById('fixtures').appendChild(el);
  return el;
}


