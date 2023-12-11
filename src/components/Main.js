import { useEffect, useState } from "react"
import { Button, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useJwt from "../hook/useJwt"
export default function Main() {
   const [user, setUser] = useState()
   const navigate = useNavigate()

   const { userId, token } = useJwt()

   console.table({ userId, token })

   useEffect(() => {
      // Altrimenti, li utilizzo per fare una chiamata API e recuperare i dati dell'utente
      fetch(`http://localhost:3030/users/${userId}`, {
         headers: { Authorization: `Bearer ${token}` },
      })
         .then((response) => response.json())
         .then((user) => {
            // Se la chiamata API va a buon fine mostro i dati dell'utente
            setUser(user)
         })
         .catch(() => {
            // Se la chiamata API fallisce reindirizzo l'utente alla pagina di login
            navigate("/login")
         })
   }, [navigate, token, userId])
   return (
      <Container>
         <Row>
            {!user ? (
               <span>Loading...</span>
            ) : (
               <div>
                  Congratulations! You have successfully logged in as{" "}
                  {user.name}
               </div>
            )}
         </Row>

         <Button
            onClick={() => {
               navigate("/login")
               localStorage.clear()
            }}
         >
            Logout
         </Button>
      </Container>
   )
}
