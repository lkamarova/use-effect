import { useEffect, useRef, useState } from "react";
import Details from "./components/Details";
import List from "./components/List";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const fetchUsers = () =>
      fetch(
        "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json"
      )
        .then((res) => res.json())
        .then(
          (users) => {
            if (!isCancelled) {
              setIsLoaded(true);
              setUsers(users);
            }
          },

          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    fetchUsers();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="App">
        <List
          activeUser={activeUser}
          setActiveUser={setActiveUser}
          users={users}
        />
        {activeUser && <Details info={activeUser} />}
      </div>
    );
  }
}

export default App;
