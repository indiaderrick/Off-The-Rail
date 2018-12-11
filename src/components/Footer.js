import React from 'react';
import { withRouter, Link } from 'react-router-dom';


function Footer(){

  return (

    <footer className="footer has-text-centered">
      <p className="footerText"> <Link className="footerText" to={'/'}> HOME </Link>|| <Link className="footerText" to={'/items'}> EXPLORE </Link> ||  LOGIN  ||  REGISTER  </p>
    </footer>
  );

}

export default withRouter(Footer);
