import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveLocation } from 'store';

const History = ({ history, redux_saveLocation }) => {
  useEffect(() => {
    redux_saveLocation(history.location.pathname + history.location.search);
    // eslint-disable-next-line
  }, [history.location.pathname, history.location.search, redux_saveLocation]);
  return null;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redux_saveLocation: (data) => dispatch(saveLocation(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(History));
