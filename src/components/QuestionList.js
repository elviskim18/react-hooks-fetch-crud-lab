import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({quizdata, delQuestion, updateQuestion}) {
  





  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* display QuestionItem components here after fetching */}
     
      <ul>{quizdata.map((quiz) =>{
        return <QuestionItem question={quiz} delQuestion={delQuestion} updateQuestion={updateQuestion}/>
      })}</ul>
    </section>
  );
}

export default QuestionList;
