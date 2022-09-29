import { useState } from "react";

const List = ({ users, activeUser, setActiveUser }) => {
  const [activeLi, setActiveLi] = useState(null);

  const styleActive = (idx) => {
    if (idx === activeLi) {
      return "list-group-item active";
    }
    return "list-group-item";
  };

  const handleActiveUser = (id, idx) => {
    setActiveLi(idx);
    const user = users.find((el) => el.id === id);
    setActiveUser({ id: user.id, name: user.name });
  };

  return (
    <div className="wrap">
      <ul className="list-group">
        {users.map((el, idx) => (
          <li
            key={idx}
            className={styleActive(idx)}
            onClick={() => handleActiveUser(el.id, idx)}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
