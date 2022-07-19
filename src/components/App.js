import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [quizes, setQuizes] = useState([
    {
      "id": 1,
      "prompt": "What special prop should always be included for lists of elements?",
      "answers": ["id", "name", "key", "prop"],
      "correctIndex": 2
    },
  ])


  //lets fetch the questions

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then(quizesdata => {
      console.log(quizesdata)
      setQuizes(quizesdata)
     
    })
  }, [])

  //post question
  function addQuestion(newQuestion){
    const config ={
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      body: JSON.stringify(newQuestion)
    }

    fetch("http://localhost:4000/questions", config)
    .then(response => response.json())
    .then(newQuestion =>{
      const newQuestions = [...quizes, newQuestion]
      setQuizes(newQuestions)
    })
  }


  //delete question
  function deleteQuestion(questionId){
    const config = {
      method: "DELETE"
    };

    fetch(`http://localhost:4000/questions/${questionId}`, config)
    .then(r => r.json())
    .then(() => {
      const undeletedQuest = quizes.filter((filtData) => filtData.id !== questionId)
      setQuizes(undeletedQuest)
    })
  }

  function updateQuestion (questId, upQuestion){

    fetch(`http://localhost:4000/questions/${questId}`,{
      method: "PATCH",
      headers:{
        "Content-type" : "application/json",
      },
      body: {"correctIndex":upQuestion},
    })
    .then(r => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = quizes.map((data) => {
        if(data.id === questId) return updatedQuestion ;
        return quizes
      })

      setQuizes(updatedQuestions)
    })
  }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList quizdata={quizes} delQuestion={deleteQuestion} updateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
