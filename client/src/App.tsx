import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Test from "./Test";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  function onClick() {
    setIsToggled(!isToggled);
  }

  return (
    <>
      <Test />
      <Login />
      <Button onClick={onClick}>Click</Button>
      {isToggled && JSON.stringify(user)}
    </>
  );
}

export default App;
