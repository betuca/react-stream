import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';


class StreamDelete extends React.Component {

    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    }

    onClick = () => {
        this.props.deleteStream(this.props.match.params.id);
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={this.onClick}>Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) return 'Are you sure you want to delete the stream?';

        return `Are you sure you want to delete the stream with title ${this.props.stream.title}?`;
    }

    render = () => {
        return (
            <Modal
                title="Delete Stream"
                description={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);