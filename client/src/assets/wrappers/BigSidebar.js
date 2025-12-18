import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--black);
      min-height: 100vh;
      height: 100%;
      width: 280px;
      margin-left: -190px;
      transition: margin-left 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    .show-sidebar .nav-link{
    position abo
    } 
  
    
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .show-sidebar .nav-links {
      padding-top: 2rem;
      padding: 2rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .nav-links {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
     .show-sidebar .footer .nav-links {
        gap: 0rem;
    }
    .show-sidebar .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      margin: 0.5rem 0;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: bolder;
    }
      hr {
        opacity :0.2
        }
    .show-sidebar .footer .nav-link {
        display: flex;
        align-items: center;
        color: var(--text-secondary-color);
        margin: 0.1rem 0;
        text-transform: capitalize;
        transition: padding-left 0.3s ease-in-out;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
    }
        
      .nav-link {
      display: flex;
      align-items: center;
      color: var(--white);
      margin: 1.5rem 0;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: bolder;
      position:relative;
    }
    .nav-link:hover {
      background-color: var(--grey-500);
      transition: var(--transition);
    }
    .nav-link:hover .icon {
      background-color: var(--white);
      color: black;
      transition: var(--transition);
    }
     .show-sidebar .icon {
      font-size: 1.5rem;
      margin-right: 1.5rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--white);
      padding: 0.8rem;
      position:relative;
      margin-top: 0rem;
      right: 0px;

    }
   
        .icon{
     font-size: 1.5rem;
      margin-right: 1.5rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--white);
      padding: 0.8rem;
      position: absolute;
      right: -17px;
      margin-top: 0.5rem;
    } 
      
    .active {
      background-color: var(--grey-500);
      transition: var(--transition);
    }

    .active .icon {
      background-color: var(--white);
      color: black;
      transition: var(--transition);
    }
    .pending {
      background: var(--background-secondary-color);
    }

    img {
      width: 70px;
      position: absolute;
      right: 8px;
      top: 10%;
    } 

    .show-sidebar img{
        width: 160px;
        right: 8px;
        top: 10%;
        margin-top: 20px;
        margin-left:20px;
        position :relative;
      }  

    .footer{
              display: flex;
        flex-direction: column;
        gap: 60px;
}
    .footer .footer-font {
        display:none;
    }   
    
    .show-sidebar .footer .footer-font{
       display: flex;
        flex-direction: column;
        color: white;
        padding: 0 1.6rem;
        gap: 14px;
        margin: 20px 0;
    }

     .show-sidebar .footer h4{
        font-size: 1.1rem;
        font-weight: 500;
    }

     .show-sidebar .footer .footer-font span{
          font-size: 0.7rem;
        font-weight: 700;
        color: #ffffffc9;
    }
          .show-sidebar .footer .footer-font div{
         display: flex;
          flex-direction: column;
          gap: 6px;
}
    }

}  
  }
`;
export default Wrapper;
