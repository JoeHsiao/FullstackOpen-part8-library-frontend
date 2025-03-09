import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { PERSON_ADDED } from "./queries";
import { addBookToCache } from "./subscritions";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      addBookToCache(client.cache, data.data.bookAdded)
      console.log(data)
      window.alert(`New book ${data.data.bookAdded.title}`)
    }
  })

  const goHome = () => {
    setPage("authors")
  }

  const handleLogout = () => {
    client.resetStore()
    setToken(null)
    localStorage.clear()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token
          ? (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recommend")}>recommend</button>
              <button onClick={handleLogout}>logout</button>
            </>
          )
          : (
            <button onClick={() => setPage("login")}>login</button>
          )
        }
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <LoginForm show={page === "login"} setToken={setToken} onLogin={goHome} />
    </div>
  )
};

export default App;
