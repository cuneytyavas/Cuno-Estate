import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChat = async (id) => {
    if (currentUser.id === id) return;

    try {
      await apiRequest.post("/chats", { recieverId: id });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" onClick={handleSave} />
            </div>
            <div className="icon" onClick={() => handleChat(item.userId)}>
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
