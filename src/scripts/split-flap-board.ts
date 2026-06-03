const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

type BoardCell = HTMLElement & {
  dataset: {
    target: string;
    delay: string;
    tone: string;
    wear: string;
  };
};

const characterOffsetFor = (cell: BoardCell) => {
  const tone = Number(cell.dataset.tone) || 0;
  const wear = Number(cell.dataset.wear) || 0;
  return tone * 11 + wear * 17;
};

const holdFinalState = (cells: BoardCell[]) => {
  cells.forEach((cell) => {
    const glyph = cell.querySelector<HTMLElement>('.split-cell__glyph');
    if (glyph) {
      glyph.textContent = cell.dataset.target === ' ' ? '' : cell.dataset.target;
    }
    cell.classList.remove('is-flipping');
    cell.classList.add('is-locked');
  });
};

const sequenceFor = (alphabet: string, target: string) => {
  if (target === ' ') {
    return ['A', 'B', 'C', 'D', 'E', ''];
  }

  const stop = alphabet.indexOf(target);
  return [...alphabet.slice(0, Math.max(0, stop) + 1)];
};

const animateCell = (cell: BoardCell, alphabet: string) => {
  const glyph = cell.querySelector<HTMLElement>('.split-cell__glyph');
  if (!glyph) {
    return;
  }

  const sequence = sequenceFor(alphabet, cell.dataset.target);
  const offset = characterOffsetFor(cell);
  const delay = Number(cell.dataset.delay) * 34 + offset;
  const tick = 48 + (offset % 5) * 5;
  const snap = 38 + (offset % 4) * 6;

  window.setTimeout(() => {
    sequence.forEach((letter, index) => {
      window.setTimeout(() => {
        glyph.textContent = letter;
        cell.classList.add('is-flipping');
        cell.classList.remove('is-settling');

        window.setTimeout(() => {
          cell.classList.remove('is-flipping');
          if (index === sequence.length - 1) {
            cell.classList.add('is-settling');
            cell.classList.add('is-locked');
            window.setTimeout(() => {
              cell.classList.remove('is-settling');
            }, 120 + (offset % 3) * 35);
          }
        }, snap);
      }, index * tick);
    });
  }, delay);
};

const runBoard = (board: HTMLElement) => {
  const alphabet = board.dataset.alphabet ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
  const cells = [...board.querySelectorAll<BoardCell>('.split-cell')];

  cells.forEach((cell) => {
    cell.classList.remove('is-flipping', 'is-locked', 'is-settling');
    const glyph = cell.querySelector<HTMLElement>('.split-cell__glyph');
    if (glyph) {
      glyph.textContent = '';
    }
  });

  if (reducedMotion.matches) {
    holdFinalState(cells);
    return;
  }

  cells.forEach((cell) => animateCell(cell, alphabet));
};

const init = () => {
  const board = document.querySelector<HTMLElement>('[data-split-flap-board]');
  const replay = document.querySelector<HTMLButtonElement>('[data-split-flap-replay]');

  if (!board) {
    return;
  }

  runBoard(board);
  replay?.addEventListener('click', () => runBoard(board));
};

init();
