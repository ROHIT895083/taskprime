// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./login";
// import Register from "./Register";
// import Dashboard from "./Dashboard";
// import PrivateRoute from "./PrivateRoute";
// import Task from "./task";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={  <Dashboard />}/>

//         <Route
//           path="/task"
//           element={
//             <PrivateRoute>
//               <Task/>
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Task from "./task";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/task"
        element={
          <PrivateRoute>
            <Task />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
