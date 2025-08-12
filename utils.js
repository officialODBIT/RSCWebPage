document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.tree-toggle');

  toggles.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));

      const nextUl = button.nextElementSibling;
      if (nextUl) {
        if (expanded) {
          nextUl.hidden = true;
        } else {
          nextUl.hidden = false;
        }
      }

      // Also toggle code block if present inside
      const codeBlock = nextUl?.querySelector('pre.code-block');
      if (codeBlock) {
        codeBlock.hidden = expanded;
      }
    });
  });
});
