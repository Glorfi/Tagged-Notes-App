import { useState, useEffect } from 'react';
import NoteToolBar from './NoteToolBar';
import NoteFooter from './NoteFooter';

function Note({
  noteTitle,
  noteText,
  noteTags,
  noteId,
  onDelete,
  onFilter,
  onUpdateNoteContent,
}) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [noteDefaultContent, setNoteDefualtContent] = useState({
    title: noteTitle,
    text: noteText,
    tags: noteTags,
    _id: noteId,
  });

  const [noteContent, setNoteContent] = useState({
    title: noteTitle,
    text: noteText,
    tags: noteTags,
    _id: noteId,
  });

  function handleIsEditActive() {
    if (isEditActive) {
      setIsEditActive(false);
    } else {
      setIsEditActive(true);
    }
  }

  function handleInputsChange(e) {
    if (e.target.className === 'note__title') {
      const newTitle = e.target.value;
      setNoteContent((content) => ({ ...content, title: newTitle }));
    }
    if (e.target.className === 'note__text') {
      const newText = e.target.value;
      setNoteContent((content) => ({ ...content, text: newText }));
    }
  }
  function resetNote() {
    setNoteContent(noteDefaultContent);
  }
  function saveTags(newTags) {
    console.log(newTags);
    setNoteContent((content) => ({ ...content, tags: newTags }));
  }
  function saveNote() {
    console.log(noteContent);
    onUpdateNoteContent(
      noteContent._id,
      noteContent.title,
      noteContent.text,
      noteContent.tags
    );
    setNoteDefualtContent(noteContent);
  }

  useEffect(() => {
    onUpdateNoteContent(
      noteContent._id,
      noteContent.title,
      noteContent.text,
      noteContent.tags
    );
    // eslint-disable-next-line
  }, [noteContent.tags]);

  return (
    <article className="note">
      <form action="" name="noteform">
        <div className="note__header">
          <input
            type="text"
            className="note__title"
            placeholder="Make a title"
            disabled={isEditActive ? false : true}
            onChange={handleInputsChange}
            value={noteContent.title}
          />
          <NoteToolBar
            onEdit={handleIsEditActive}
            onReset={resetNote}
            onSave={saveNote}
            noteContent={noteContent}
          />
        </div>
        <div className="note__text-container">
          <textarea
            className="note__text"
            disabled={isEditActive ? false : true}
            placeholder="Jot something down"
            onChange={handleInputsChange}
            value={noteContent.text}
          />
        </div>
        <NoteFooter
          noteTags={noteTags}
          noteId={noteId}
          onDelete={onDelete}
          onFilter={onFilter}
          onSaveTags={saveTags}
        />
      </form>
    </article>
  );
}

export default Note;
