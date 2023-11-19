import React from 'react';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const logout=()=>{
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav  className="navbar navbar-expand-lg" >
        <a className="navbar-brand" href="/home">
          HEYHOTEL
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" ><i class="fa fa-bars" aria-hidden="true"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-5">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <li className='fa fa-user'></li>{user.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/profile">Profile</a>
                  <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                </div>
              </div>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
{/* <div>
  <img style={{backgroundSize:'cover',width:'100%'}} src='https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjBib29raW5nfGVufDB8fDB8fHww'alt=''></img>
  <button className='btn ' style={{marginLeft:'700px',marginTop:'-1000px'}}>Get Started</button>
</div> */}

    </div>
  );
}

export default NavBar;
