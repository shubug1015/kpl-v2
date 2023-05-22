import React from "react";
import EditProfilePresenter from "./EditProfilePresenter";
import { usersApi } from "api";

export default class extends React.Component {
  state = {
    user: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const { data: user } = await usersApi.mypage();
      this.setState({
        user,
      });
    } catch {
      this.setState({ error: "Can't find user" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, error, loading } = this.state;
    return <EditProfilePresenter user={user} error={error} loading={loading} />;
  }
}
