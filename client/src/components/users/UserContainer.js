import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchUserBlogs,
  fetchUserComments,
  fetchUserFollowers,
  fetchUserFollowing,
  toFollow,
  toUnfollow,
  putOver
} from '../../actions';
import UserBlogsList from './UserBlogsList';
import UserCommentsList from './UserCommentsList';
import UserFollowersList from './UserFollowersList';
import UserFollowingList from './UserFollowingList';
import FollowUserButton from './FollowUserButton';
import PutOverButton from './PutOverButton';

class UserContainer extends Component {
  // This component works because it is passed a unique key in its container.
  // Otherwise, the param._id changing does not remount it, and so api calls in
  // componentDidMount are not invoked when you click a link to a differnet usercontainer
  // in any of the lists.
  componentDidMount() {
    this.props.fetchUserBlogs(this.props.match.params._id);
    this.props.fetchUserComments(this.props.match.params._id);
    this.props.fetchUserFollowers(this.props.match.params._id);
    this.props.fetchUserFollowing(this.props.match.params._id);
  }

  render() {
    switch (this.props.auth) {
      case null:
        return <div>Checking credentials:</div>;
      default:
        return (
          <div>
            <div className="user-options">
              <FollowUserButton
                auth={this.props.auth}
                _user={this.props.match.params._id}
                followers={this.props.userFollowers}
                onClickFollowHandler={this.props.toFollow}
                onClickUnfollowHandler={this.props.toUnfollow}
              />
              <PutOverButton
                authId={this.props.auth._id}
                _user={this.props.match.params._id}
                onClickPutOverHandler={this.props.putOver}
              />
            </div>
            <div>
              <UserFollowersList followers={this.props.userFollowers} />
              <UserFollowingList following={this.props.userFollowing} />
              <UserBlogsList blogs={this.props.blogs} />
              <UserCommentsList comments={this.props.commentsList} />
            </div>
          </div>
        );
    }
  }
}

const mapStateToProps = ({
  blogs,
  commentsList,
  userFollowers,
  userFollowing,
  auth
}) => {
  return {
    blogs,
    commentsList,
    userFollowers,
    userFollowing,
    auth
  };
};
export default connect(
  mapStateToProps,
  {
    fetchUserBlogs,
    fetchUserComments,
    fetchUserFollowers,
    fetchUserFollowing,
    toFollow,
    toUnfollow,
    putOver
  }
)(UserContainer);
