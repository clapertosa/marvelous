import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CHANGE_AVATAR_MUTATION } from "../../../Dashboard/Form/mutations";
import User, { CURRENT_USER_QUERY } from "../../../../hoc/User/User";
import Avatar from "../../../Avatar/Avatar";
import Spinner from "../../../UI/Spinner/Spinner";
import styles from "./AvatarForm.scss";

class AvatarForm extends Component {
  state = {
    image: undefined,
    loading: false
  };

  uploadAvatar = async e => {
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "marvelous");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/wolf91/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({ image: file.secure_url });
  };

  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <Mutation
            mutation={CHANGE_AVATAR_MUTATION}
            variables={{ avatar: this.state.image }}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(changeAvatar, { error, data, loading }) => {
              return (
                <div className={styles["image-upload"]}>
                  <label htmlFor="file-input">
                    {this.state.loading ? (
                      <Spinner
                        containerWidth="250px"
                        containerHeight="250px"
                        spinnerHeight="150px"
                        spinnerWidth="150px"
                      />
                    ) : (
                      <Avatar dashboard avatar={currentUser.avatar} />
                    )}
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={async e => {
                      await this.uploadAvatar(e);
                      await changeAvatar();
                      !loading ? this.setState({ loading: false }) : null;
                    }}
                  />
                </div>
              );
            }}
          </Mutation>
        )}
      </User>
    );
  }
}

export default AvatarForm;
