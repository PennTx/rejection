import Score from './score-component';
import { connect } from 'react-redux';
import { getScore } from '../rejection-reducer';

const mapStateToProps = state => ({
  score: getScore(state)
});

export default connect(mapStateToProps)(Score);
