document.addEventListener('DOMContentLoaded', () => {
  buildCalendar();
  setupNav();
  setupAddTask();
});


function buildCalendar() {
  const grid = document.getElementById('calGrid');
  if (!grid) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();


  const markedDays = [3, 4, 10, 11, 17, 18, 24, 25];

  grid.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('span');
    empty.className = 'day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('span');
    cell.className = 'day';
    cell.textContent = d;

    if (d === today.getDate()) cell.classList.add('today');
    else if (markedDays.includes(d)) cell.classList.add('marked');

    grid.appendChild(cell);
  }
}

function setupNav() {
  const items = document.querySelectorAll('.nav-item[data-view]');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
 
/*add nova tarefa!!*/ 

function setupAddTask() {
  const btn = document.getElementById('addBtn');
  const input = document.querySelector('.add-task input');
  const list = document.getElementById('subjectList');
  if (!btn || !input || !list) return;

  const addItem = () => {
    const value = input.value.trim();
    if (!value) return;

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-icon icon-violet">
        <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
      </span>
      <span class="item-text">${escapeHtml(value)}</span>
      <span class="item-tag">novo</span>
    `;
    list.appendChild(li);
    input.value = '';
  };

  btn.addEventListener('click', addItem);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addItem();
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
