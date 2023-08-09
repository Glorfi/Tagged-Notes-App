function NoteTag({ noteTag, onFilter }) {
  function filterNotes() {
    onFilter(noteTag);
  }

  return (
    <button
      type="button"
      className="note__button scale-down note__button_type_tag"
      onClick={filterNotes}
    >
      {noteTag}
    </button>
  );
}

export default NoteTag;
