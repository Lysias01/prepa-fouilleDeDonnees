/* ===== Stockage local (confort par appareil) ===== */
const KEY = 'fouille-aa-revision-v1';
const store = {
  data: {
    q: {},
    ex: {},
    exams: [],
    theme: null,
    seenCards: {},
    tutos: {},
    days: {},
    qday: null,
    examDur: 120,
    examDraft: null
  },
  load() {
    try {
      const s = localStorage.getItem(KEY);
      if (s) this.data = Object.assign(this.data, JSON.parse(s));
    } catch (e) {}
  },
  save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data));
    } catch (e) {}
  }
};
store.load();
