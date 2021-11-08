import React, { Component } from 'react';
import {Progress, Message, Header, Dropdown, Grid, Divider, Container, Segment} from 'semantic-ui-react';
import Upload from 'rc-upload';
import kc from "../shared/UserManager";
import {WFUPLOAD_BACKEND} from "../shared/consts";
import {getData} from "../shared/tools";

class UploadApp extends Component {

    state = {
        language: "",
        type: "",
        percent: 0,
        file_name: "",
        file_link: "",
        type_options: [],
        language_options: [],
    };

    componentDidMount() {
        getData(`conf.json`, conf => {
            const {language_options, type_options} = conf;
            this.setState({language_options, type_options});
        })
    };

    progress = (step) => {
        let count = Math.round(step.percent);
        this.setState({percent: count});
    };

    uploadDone = () => {
        const {language, type, file_name} = this.state;
        this.setState({percent: 0, file_link: `${WFUPLOAD_BACKEND}/data/${language}/${type}/${file_name}`})
    };

    onError = (err) => {
        this.setState({percent: 0, file_link: "", file_name: ""})
        alert(err)
    }

    selectLanguage = (language) => {
        this.setState({language});
    };

    render() {
        const {language, type, file_name, file_link, percent, type_options, language_options} = this.state;

        const props = {
            action: `${WFUPLOAD_BACKEND}/upload/${language}/${type}`,
            headers: {'Authorization': 'bearer ' + kc.token},
            type: 'drag',
            accept: '.mp4, .mp3, .zip',
            multiple: false,
        };

        const show_upload = !!language && !!type;
        const uploading = percent !== 0;

        return (
            <Container textAlign='center' >
                <p />
                <Header as='h2'>WP Plugins Upload</Header>
                <Segment raised>
                    <Grid columns={2} textAlign='center'>
                        <Divider vertical>&</Divider>
                        <Grid.Column>
                            <Dropdown
                                error={!language}
                                placeholder="Language:"
                                selection
                                options={language_options}
                                language={language}
                                onChange={(e,{value}) => this.selectLanguage(value)}
                                value={language} >
                            </Dropdown>
                        </Grid.Column>
                        <Grid.Column>
                            <Dropdown
                                error={!type}
                                placeholder="Type:"
                                selection
                                options={type_options}
                                onChange={(e,{value}) => this.setState({type: value})}
                                value={type} >
                            </Dropdown>
                        </Grid.Column>
                    </Grid>
                </Segment>
                    {show_upload ? <Message>
                     <p />
                        <Upload
                            {...this.props}
                            {...props}
                            className="dropbox"
                            disabled={uploading}
                            onError={this.onError}
                            onSuccess={this.uploadDone}
                            onStart={(file) => this.setState({file_name: file.name})}
                            onProgress={this.progress} >
                            Drop file here or click me
                        </Upload>
                    <p />
                    <Progress label={uploading ? file_name : file_link} percent={this.state.percent} indicating progress='percent' />
                    </Message> : null}
            </Container>
        );
    }
}

export default UploadApp;
