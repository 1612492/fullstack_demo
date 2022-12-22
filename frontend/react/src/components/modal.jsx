import { useEffect, useState } from 'react';
import XIcon from './x-icon';

function Modal({ open, onClose, defaultName, onSave }) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (defaultName && defaultName !== name) {
      setName(defaultName);
    }
  }, [defaultName]);

  if (!open) {
    return null;
  }

  return (
    <div className="mask">
      <div className="modal">
        <form className="form">
          <button type="button" onClick={onClose} className="btn-close">
            <XIcon />
          </button>
          <div className="input-group">
            <label htmlFor="name" className="label">
              Task's name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              onSave(name);
              onClose();
              setName(null);
            }}
            className="btn-save"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
