import { useEffect, useState } from "react";

const Details = ({ info }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullUserInfo, setFullUserInfo] = useState({});

  const { avatar, name, details } = fullUserInfo;

  useEffect(() => {
    let isCancelled = false;
    fetch(
      `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
    )
      .then((res) => res.json())
      .then(
        (users) => {
          if (!isCancelled) {
            setIsLoaded(true);
            setFullUserInfo(users);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    return () => {
      isCancelled = true;
    };
  }, [info.id]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="wrap">
        <ul className="list-group">
          <img src={avatar} alt="avatar" className="list-group-item" />
          <span className="list-group-item">{name}</span>
          <span className="list-group-item">City: {details.city}</span>
          <span className="list-group-item">Company: {details.company}</span>
          <span className="list-group-item">Position: {details.position}</span>
        </ul>
      </div>
    );
  }
};

export default Details;
