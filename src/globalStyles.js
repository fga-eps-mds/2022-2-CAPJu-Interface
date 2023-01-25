import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: regular;
    color: black;
  }


  .dropdown {
    background: #ddd;
    max-width: 300px;
    border-radius: 20px;
    transition: all .2s ease;
    padding: 5px;

    .is-open {
      .dropdown-control {
        display: none
      }
    }
  }

  .dropdown-control {
    min-width: 200px;
    padding: 0;
    padding: 10px;
    cursor: pointer;

  }


  .dropdown-menu {
    background: #ccc;

    position: static !important;
    border-radius: 12px;
    width: 100%;
    max-width: 300px;
    top: 45%;
    z-index: 100000;
    transition: all .2s ease;
  }

  .dropdown-arrow {
    color: white;
    right: 24px;
    top: 32px;
  }

  .Dropdown-menu {
    width: inherit;
    background-color: #d9d9d9;
    border: solid #9b8f8f 2px;
    border-radius: 11px;
    padding: 16px;
    position: absolute;
    z-index: 100000;
    margin: 0 auto;
    left: -2px;
    top: -2px;
    transform: rotate(0deg);

    .Dropdown-option {
      width: auto;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .Dropdown-control {
    cursor: pointer;
    width: 100%;
    min-width: 200px;
  }

  .Dropdown-option {
    width: 100%;
    padding: 8px 24px;
    border: solid 1px #bbb;
    border-radius: 12px;
    
    
    :hover {
      background: rgba(255, 255, 255, .3);
      border-radius: 12px;
    }
  }
  
  &[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
  `;

export default GlobalStyle;
