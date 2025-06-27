import {Signup, Login, Home, MySpace, CreatePost, PostDetail, AllPosts, EditPost} from './pages'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Protected from './security/Protected'
import AuthRedirect from './security/AuthRedirect'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={
      <AppLayout/>}>
        <Route index element={<Home/>} />

        <Route path="login" element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        } />

        <Route
          path="signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          } />
        <Route
          path="my-space"
          element={
            <Protected>
              <MySpace />
            </Protected>
          }
        />
        <Route
          path="post/:postid"
          element={
            <Protected>
             
            <PostDetail /></Protected>
          }
        />
         <Route
          path="edit-post/:postid"
          element={
            <Protected>
             
            <EditPost />
            </Protected>
          }
        />

        <Route
          path="create-post"
          element={
            <Protected>
              <CreatePost />
            </Protected>
          }
        />

        <Route
          path="all-posts"
          element={
            <Protected>
              <AllPosts />
            </Protected>
          }
        />
      </Route>
    )
  );

  return (<RouterProvider router={router}/>)
}

export default App
