import React, { Component } from 'react';
import { Label,Progress,Message,Segment,Dropdown } from 'semantic-ui-react';
import Upload from 'rc-upload';
import kc from "../shared/UserManager";
import {WFUPLOAD_BACKEND, language_options, type_options} from "../shared/consts";

class UploadApp extends Component {

    state = {
        language: "",
        type: "",
        percent: 0,
    };

    progress = (step) => {
        let count = Math.round(step.percent);
        this.setState({percent: count});
    };

    uploadDone = () => {
        this.setState({percent: 0})
    };

    selectLanguage = (language) => {
        this.setState({language});
    };

    render() {
        const {language, type} = this.state;

        const props = {
            action: `${WFUPLOAD_BACKEND}/upload/${language}/${type}`,
            headers: {'Authorization': 'bearer ' + kc.token},
            type: 'drag',
            accept: '.mp4, .mp3, .zip',
            beforeUpload(file) {
                console.log('beforeUpload', file.name);
            },
            onStart(file) {
                console.log('onStart', file.name);
            },
            onError(err) {
                console.log('onError', err);
            },

        };

        return (
            <Segment textAlign='center' className="ingest_segment" raised>
                <Label attached='top' className="trimmed_label"></Label>
                <Message>
                    <Dropdown
                        error={!language}
                        placeholder="Language:"
                        selection
                        options={language_options}
                        language={language}
                        onChange={(e,{value}) => this.selectLanguage(value)}
                        value={language} >
                    </Dropdown>
                    <Dropdown
                        error={!type}
                        placeholder="Type:"
                        selection
                        options={type_options}
                        onChange={(e,{value}) => this.setState({type: value})}
                        value={type} >
                    </Dropdown>
                    <p /><p />
                    <Upload
                        {...this.props}
                        {...props}
                        className="dropbox"
                        onSuccess={this.uploadDone}
                        onProgress={this.progress} >
                        Drop file here or click me
                    </Upload>
                    <p />
                    <Progress label='' percent={this.state.percent} indicating progress='percent' />
                </Message>
            </Segment>
        );
    }
}

export default UploadApp;
