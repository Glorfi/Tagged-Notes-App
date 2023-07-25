import '../styles/notes.css';
import Note from './Note';

function Notes() {
  return (
    <section className="notes">
      <div className="notes__header">
        <h1 className="notes__title">Notes</h1>
        <button type="button" className="notes__add-button scale-down" />
      </div>
      <div className="notes__container">
        <Note/>
      </div>
    </section>
  );
}

export default Notes;
