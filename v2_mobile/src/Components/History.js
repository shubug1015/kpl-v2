import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveLocation } from "store";

const History = ({ history, getLocation }) => {
  useEffect(() => {
    getLocation(history.location.pathname + history.location.search);
  }, [history.location.pathname, history.location.search, getLocation]);
  return null;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLocation: (data) => dispatch(saveLocation(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(History));
