import axios from "axios";
import { useEffect, useState } from "react";
import "./Convegration.scss";
import im from "../../assets/notFound.jpg";
function Convegration({ friend, user }) {
  const [myFriend, setmyFriend] = useState("");

  useEffect(() => {
    const id = friend.members.filter((e) => e !== user._id);

    async function aha() {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}`);

        setmyFriend(res.data.others);
      } catch (error) {
        console.log(error);
      }
    }

    aha();
  }, [friend, user]);

  return (
    <div className="con">
      <img src={myFriend.image || im} alt="" />
      <span>{myFriend.username}</span>
    </div>
  );
}

export default Convegration;
