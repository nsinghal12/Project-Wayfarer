import React, {Component} from 'react';
import Group from './Group';
import IfClause from './IfClause';
import axios from 'axios';

export default class Post extends Component {

    editPostClickHandler = () => {
        this.props.onPostEdit(this.props.post);
    }

    deleteClickHandler = () => {
        let confirmed = window.confirm('Do you really want to delete this post?');
        if(confirmed) {
            let url = 'http://localhost:3000/post/' + this.props.post['_id'] + '?email=' + this.props.user.email;
            axios.delete(url)
                .then((data) => {
                    console.log('deleted post data: ', data);
                    this.props.onPostDeleted();
                });
        }
    }

    render() {
        return <Group>
            <div className='row '>
            <div className='col-md-6 postrow'>
                {/* <div className=" text-center postimage">
                    <img className="img-fluid mx-auto d-block rounded city-image" src="https://az760333.vo.msecnd.net/-/media/corporate/footer-section/shutterstock_210836533.jpg?la=en&ts=6e058b19-5741-4545-a575-5d4016a04962" /> 
                </div> */}
                <div className="avatar text-center">
                            <img className="img-fluid mx-auto d-block rounded city-image"  src="https://s3.amazonaws.com/cdn.roosterteeth.com/default/tb/user_profile_female.jpg" alt="Avatar" />
                </div>
                <div className='col-md-6 d-none d-md-block postheader'>
                
                    <div className='posttitle'><h6>{ this.props.post.title }</h6></div>
                    <br/>
                    <div><p>{ this.props.post.email }</p></div>
                </div>
                </div>
   
                <div className='col  offset-md-4 postbuttons'>
                    <IfClause condition={ this.props.user.email == this.props.post.email }>
                        <a href='#' onClick={ () => this.editPostClickHandler() }>Edit</a> | <a href='#' onClick={ () => this.deleteClickHandler() } >Delete</a>
                    </IfClause>
                </div>
            </div>
        </Group>;
    }
}