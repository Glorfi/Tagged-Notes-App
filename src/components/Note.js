function Note() {
  return (
    <article className="note">
      <form action="">
        <div className="note__header">
          <input
            type="text"
            className="note__title"
            placeholder="Make a title"
            disabled=""
          />
          <div className="note__button-container">
            <button className="note__button note__button_type_reset scale-down note__button_disabled" />
            <button className="note__button note__button_type_edit scale-down" />
            <button className="note__button note__button_type_submit scale-down note__button_disabled" />
          </div>
        </div>
        <div className="note__text-container">
          <textarea
            className="note__text"
            disabled=""
            placeholder="Jot something down"
            defaultValue={''}
          />
        </div>
        <div className="note__footer">
          <button
            type="button"
            className="note__button note__button_type_add-tag scale-down"
          />
          <button
            type="button"
            className="note__button note__button_type_reset-tag scale-down note__button_disabled"
          />
          <input
            type="text"
            className="note__tag-input note__button_disabled"
            minLength={1}
            maxLength={15}
            required=""
          />
          <button
            type="submit"
            className="note__button note__button_type_save-tag scale-down note__button_disabled"
            disabled=""
          />
          <button
            type="button"
            className="note__button scale-down note__button_type_tag note__button_disabled"
          >
            Idea
          </button>
          <button
            type="button"
            className="note__button note__button_type_delete scale-down"
          />
        </div>
      </form>
    </article>
  );
}

export default Note;
