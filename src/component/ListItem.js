import React from "react";

const ListItem = ({ item, updateToDo, showEdit, deleteToDo }) => {
  return (
    <div className="row justify-content-sm-between">
      <div
        style={{ textDecoration: item.status ? "line-through" : "none" }}
        className="col"
      >
        <input
          type="checkbox"
          checked={item.status}
          onChange={e => updateToDo(item.id, item.name, e.target.checked)}
        />

        {item.name}
      </div>
      <button
        className="material-icons ml-1 mt-1 btn btn-sm"
        onClick={() => showEdit(item.id, item.name, item.status)}
      >
        edit
      </button>
      <button
        className="material-icons ml-1 mt-1 btn btn-sm"
        onClick={() => deleteToDo(item.id)}
      >
        delete
      </button>
    </div>
  );
};

export default ListItem;
