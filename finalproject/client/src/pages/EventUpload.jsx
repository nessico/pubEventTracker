import React, { Component } from 'react'
import api from '../api'

class EventUpload extends Component {

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }
    

    handleIncludeEvent = async () => {
        const { name } = this.state
        const payload = { name }
        console.log(payload)
        api.createTable(name).then(res => {
            window.alert(`Event created successfully`)
        })
        setTimeout(function () {
            window.location.href = "/events/list";
        }, 2);
        window.alert(`Event created successfully`)
    }
    constructor(props) {
        super(props)
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(event) {
        let file = event.target.files[0];
        console.log(file);

        if (file) {
            const reader = new FileReader()
            reader.onload = event => console.log(event.target.result)
            reader.readAsText(file)
            console.log(event.target.result)
        }
       
    }

    render() {
        return <span>
            <input type="file"
                name="myFile"
                onChange={this.uploadFile} />
        </span>
    }
}

export default EventUpload