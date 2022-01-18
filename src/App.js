import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed getting rooms");
    }
  };

  const createRoom = async (newRoom) => {
    try {
      console.log(newRoom);
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      console.log(response);
      setRooms([...rooms, response.data]);
    } catch (error) {
      console.log(error);
      alert("Cannot add");
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      let tempRooms = rooms.filter((room) => room.id !== id);
      setRooms(tempRooms);
      alert("Deleted succesfully");
    } catch (error) {
      console.log(error);
      alert("Cannot delete");
    }
  };

  const updateRoom = async (room) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${room.id}`
      );
      let updatedRooms = rooms.map((e) =>
        e.id === room.id ? response.data : e
      );
      setRooms(updatedRooms);

      alert("Updated Succesfully");
    } catch (error) {
      console.log(error);
      alert("Cannot update");
    }
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
