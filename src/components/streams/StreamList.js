import React from 'react';
import { fetchStreams } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {

    componentDidMount = () => {
        this.props.fetchStreams()
    }

    renderStreams = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderButtons(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/show/${stream.id}`} className="header">
                            {stream.title}
                            <div className="description">{stream.description}</div>
                        </Link>
                    </div>
                </div>
            );
        })
    }

    renderButtons = (stream) => {
        if (this.props.currentUserId === stream.userId) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>Delete</Link>
                </div>
            )
        }
    }

    renderCreateButton = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderStreams()}</div>
                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapsStateToProps, { fetchStreams })(StreamList);