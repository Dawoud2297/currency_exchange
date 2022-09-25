import React from 'react'
import { Button } from '@material-ui/core'

class Header extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    render()
    {
        return (
            <div className="logo">
            <div className='logo-text'>
            <p>
              <strong style={{color:'gray'}}>A2M</strong>BROTHERS
            </p>
            </div>
            <div className='action'>
              {/* <Button variant='red' onClick={this.login}>Login</Button> */}
            </div>
          </div>
        )
    }
}

export default Header;