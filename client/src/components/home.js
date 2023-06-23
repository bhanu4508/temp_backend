import React,{useState,useEffect} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

export const Home = () => {
  
  let [notes, setNotes] = useState([]);
  
  const fetchData = async () => {
    try {

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get("http://localhost:5000/api/notes/notes", config);
      // console.log(response.data);
      setNotes(response.data);

      } catch (error) {
        console.log(error);
      }

    };

  useEffect(() => {
      fetchData();
  }, []);

  async function addNote(newNote) {

    let title = newNote.title;
    let content = newNote.content;
   
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/api/notes/notes', {
        title,
        content
      },config);
      // console.log(response.data); 
      const newNote = response.data;
      setNotes([...notes, newNote])
    } catch (error) {
      console.log(error);
    }
    
  }

  async function deleteNote(id) {

    // console.log(id);

    try {

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.post(`http://localhost:5000/api/notes/notes/delete`, {
        id
      },config);

      console.log(response);
      
      // console.log(response.data); 
      // const newNote = response.data;
      // setNotes([...notes, newNote])

    } catch (error) {
      console.log(error);
    }
    
    fetchData();

  }
  return (
    <>
    <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
          return (
              <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              />
              );
            })}
      <Footer />
    </>
  )
}



// const data_1 = await localStorage.getItem('userInfo');
//     console.log(data_1);

//     const data = await fetch(`http://localhost:5000//api/notes/notes`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data_1),
//     });

//     console.log(data);