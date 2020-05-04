import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Header extends Component {
    render() {
        return (
            <div>
                <h1>1653009 - Ngô Anh Cảnh - Mid Term</h1>
                <div className="btns">
                <Link to='/' className="btn"><div>Trang chủ</div></Link>
                <Link to='/map' className="btn"><div >Bản đồ</div></Link>
                <Link to='/stats' className="btn"><div>Biểu đồ</div></Link>
                </div>
            </div>
        )
    }
}
export default Header;