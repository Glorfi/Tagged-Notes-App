import { useState } from 'react';

function NoteToolBar({ onEdit, onReset, onSave }) {
  const [isActive, setIsActive] = useState(false);

  function openToolBar() {
    onEdit();
    setIsActive(true);
  }

  function closeToolBar(e) {
    e.preventDefault();
    onEdit();
    setIsActive(false);
  }

  function resetNote(e) {
    e.preventDefault();
    onReset();

  }
  function saveNote(e) {
    closeToolBar(e);
    onSave();
  }
  return (
    <div className="note__button-container">
      <button
        className={`note__button note__button_type_reset scale-down ${
          isActive ? '' : 'note__button_disabled'
        }`}
        type="reset"
        form="noteform"
        onClick={resetNote}
      />
      <button
        className={`note__button note__button_type_edit scale-down ${
          isActive ? 'note__button_disabled' : ''
        }`}
        onClick={openToolBar}
        type="button"
      />
      <button
        className={`note__button note__button_type_submit scale-down ${
          isActive ? '' : 'note__button_disabled'
        }`}
        form="noteform"
        type="submit"
        onClick={saveNote}
      />
    </div>
  );
}

export default NoteToolBar;
