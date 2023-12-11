import { useState } from "react"
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
import { GoogleLoginButton } from "react-social-login-buttons"

function Login() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const navigate = useNavigate()

   const handleLogin = async (e) => {
      e.preventDefault()

      const response = await fetch("http://localhost:3030/users/session", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password,
         }),
      })

      const data = await response.json()

      if (data.token) {
         localStorage.setItem("userId", data.userId)
         localStorage.setItem("token", data.token)
      }

      navigate("/")
   }

   return (
      <Container>
         <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
               <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
               Submit
            </Button>
         </Form>

         <GoogleLoginButton
            onClick={() => {
               window.location.assign(
                  "http://localhost:3030/users/oauth-google"
               )
            }}
         />
      </Container>
   )
}

export default Login
