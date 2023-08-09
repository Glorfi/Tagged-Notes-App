import { useRef, useState, useEffect } from 'react';
import NoteTag from './NoteTag';

function NoteFooter({
  noteTags,
  noteId,
  onDelete,
  onFilter,
  onSaveTags,
}) {
  const [isTagEditActive, setIsTagEditActive] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [tags, setTags] = useState(noteTags);
  const tagInputRef = useRef(null);

  function openTagEdit() {
    setIsTagEditActive(true);
    tagInputRef.current.focus();
  }
  function closeTagEdit() {
    setNewTagName('');
    setIsTagEditActive(false);
  }

  function handleTagInputChange(e) {
    setNewTagName(e.target.value);
  }
  function saveTag(e) {
    e.preventDefault();
    if (newTagName === '') {
      closeTagEdit();
    } else {
      const updatedTags = [...tags, newTagName];
      setTags(updatedTags);
      onSaveTags(updatedTags);
      setNewTagName('');
      closeTagEdit();
    }
  }
  function deleteNote() {
    onDelete(noteId);
  }
  useEffect(() => {
    if (isTagEditActive) {
      tagInputRef.current.focus();
    }
  }, [isTagEditActive]);

  return (
    <div className="note__footer">
      <button
        type="button"
        className={`note__button note__button_type_add-tag scale-down ${
          isTagEditActive || tags.length >= 3 ? 'note__button_disabled' : ''
        }`}
        onClick={openTagEdit}
      />
      <button
        type="button"
        className={`note__button note__button_type_reset-tag scale-down ${
          isTagEditActive ? '' : 'note__button_disabled'
        }`}
        onClick={closeTagEdit}
      />
      <input
        type="text"
        ref={tagInputRef}
        className={`note__tag-input ${
          isTagEditActive ? '' : 'note__button_disabled'
        }`}
        minLength={1}
        maxLength={15}
        required=""
        value={newTagName}
        onChange={handleTagInputChange}
      />
      {isTagEditActive
        ? ' '
        : tags.map((tag, index) => (
            <NoteTag noteTag={tag} key={index} onFilter={onFilter} />
          ))}
      <button
        type="submit"
        className={`note__button note__button_type_save-tag scale-down ${
          isTagEditActive ? '' : 'note__button_disabled'
        }`}
        disabled=""
        onClick={saveTag}
      />
      <button
        type="button"
        className={`note__button note__button_type_delete scale-down ${
          isTagEditActive ? 'note__button_disabled' : ''
        }`}
        onClick={deleteNote}
      />
    </div>
  );
}

export default NoteFooter;
