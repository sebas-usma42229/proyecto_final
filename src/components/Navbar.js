import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarContainer>
      <div className="logo-container">
        <img
          src="/marvel-logo.png" // Asegúrate de colocar la imagen en la carpeta public
          alt="Marvel Logo"
          className="logo"
        />
      </div>
      <h1 className="title">Sebastian Usma</h1>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #b71c1c; /* Rojo Marvel */
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 50px;
    width: auto;
  }

  nav .title {
    color: #ffffff !important; /* Mayor especificidad */
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase; /* Opcional */
    letter-spacing: 1px; /* Opcional */
  }
`;


export default Navbar;
