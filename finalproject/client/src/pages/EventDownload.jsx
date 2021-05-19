import React, { Component } from 'react'
import api from '../api'
import 'react-table/react-table.css'


class EventDownload extends Component {
    downloadXLS() {
        let temp = window.location.pathname;
        temp = temp.split("/")
        const name = temp[1];
        console.log(name)

        api.getXLS(name).then(res => {
            window.alert(`XLS download complete, check your desktop`)
           // window.location.href = `/${name}/view`
        })
    }
    downloadCSV() {
        let temp = window.location.pathname;
        temp = temp.split("/")
        const name = temp[1];
        console.log(name)
        api.getCSV(name).then(res => {
            window.alert(`CSV download complete, check your desktop`)
            // window.location.href = `/${name}/view`
        })
    }
    render() {
        return (
            <div>

                <h1>Download this table</h1>
                <button className="button" onClick={this.downloadXLS}>XLS Download</button>
                <button className="button" onClick={this.downloadCSV}>CSV Download</button>
            </div>
        )
    }
}
export default EventDownload