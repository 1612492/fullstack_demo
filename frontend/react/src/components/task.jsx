import EditIcon from './edit-icon';
import TrashIcon from './trash-icon';

function Task({ name, onUpdate, onDelete }) {
  return (
    <article className="task">
      <div className="name">{name}</div>
      <div className="actions">
        <button onClick={onUpdate} className="btn-edit">
          <EditIcon />
        </button>
        <button onClick={onDelete} className="btn-delete">
          <TrashIcon />
        </button>
      </div>
    </article>
  );
}

export default Task;
