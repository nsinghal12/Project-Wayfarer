import React,{Component} from 'react';
import Post from '../component/Post';

export default class PostContainer extends Component {
    render(){
        return(
            <div>
                <p>this is my PostContainer</p>
                <Post />
            </div>
        )
    }
}