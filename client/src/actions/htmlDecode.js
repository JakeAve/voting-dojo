export default function htmlDecode(text) {
  const e = document.createElement('div');
  e.innerHTML = text;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}
