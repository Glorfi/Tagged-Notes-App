import { useEffect, useState } from 'react';
import '../styles/notes.css';
import Note from './Note';
import notesarray from './notesarray.json';
import NoteTag from './NoteTag';

function Notes() {
  const [noteList, setNoteList] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  function addNote() {
    setNoteList([
      { title: '', text: '', _id: `${noteList.length + 1}`, tags: [] },
      ...noteList,
    ]);
    // noteList.length + 1 костыль который мы потом уберем, сейчас это простая функция чтобы был какой-нибудь айдишник
  }

  function deleteNote(_id) {
    const newArr = noteList.filter((note) => note._id !== _id);
    setNoteList(newArr);
  }

  function filterNotes(tag) {
    setSelectedTag(tag);
    setIsFilterActive(true);
  }

  function resetFilterNotes() {
    setIsFilterActive(false);
    setSelectedTag('');
  }

  function updateNoteContent(noteId, noteTitle, noteText, noteTags) {
    const updatedNote = {
      title: noteTitle,
      text: noteText,
      tags: noteTags,
      _id: noteId,
    };
    const updatedNoteList = noteList.map((note) => {
      if (note._id === noteId) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNoteList(updatedNoteList);
  }

  useEffect(() => {
    const arr = notesarray;
    // setDefaultNoteList(arr);
    setNoteList(arr); // здесь будет асинхрон позже
  }, []);

  return (
    <section className="notes">
      <div className="notes__header">
        <h1 className="notes__title">Notes</h1>
        <button
          type="button"
          className="notes__add-button scale-down"
          onClick={addNote}
        />
      </div>
      <div
        className={`notes__filter ${
          isFilterActive ? 'notes__filter_active' : ''
        }`}
      >
        <p className="notes__filter-text">Filtered by</p>
        <NoteTag noteTag={selectedTag} onFilter={resetFilterNotes} />
      </div>
      <div className="notes__container">
        {noteList
          .filter((note) => !isFilterActive || note.tags.includes(selectedTag))
          .map((note) => (
            <Note
              key={note._id}
              noteId={note._id}
              noteTitle={note.title}
              noteText={note.text}
              noteTags={note.tags}
              onDelete={deleteNote}
              onFilter={filterNotes}
              onUpdateNoteContent={updateNoteContent}
            />
          ))}
      </div>
    </section>
  );
}

export default Notes;
