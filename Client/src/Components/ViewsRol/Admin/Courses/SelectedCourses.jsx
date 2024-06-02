import React from "react";

export const SelectedCourses = ({ course }) => {
 return (
  <div className="flex justify-center">
   <p className="mr-2">{course.courseName}</p>
   <p> - </p>
   <p className="ml-2">{course.description}</p>
  </div>
 );
};
