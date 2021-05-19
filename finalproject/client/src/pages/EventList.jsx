import React, { Component} from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`
class UpdateEvent extends Component {
    updateUser = async event => {
        event.preventDefault()
       
        window.location.href = `/events/update/${this.props.id}`
    }
    handleUpdateEvent = async () => {
        const id = this.props.id
        const checkin = false
        const payload = { checkin }
        let temp = window.location.pathname;
        temp = temp.substring(temp.indexOf("/") + 1, temp.lastIndexOf("/"))
        console.log(temp)
        const page = temp
        await api.updateEventById(page,id, payload).then(res => {
            
            this.setState({
                checkin: '',
            })
            setTimeout(function () {
                window.location.href = `./view`;
            }, 2);
            window.alert(`Event updated successfully`)
        })
    }
    render() {
        return <Update className="radio" onClick={this.handleUpdateEvent}>Update Attendance</Update>
    }
}


class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        let temp = window.location.pathname;
        temp = temp.substring(temp.indexOf("/")+1, temp.lastIndexOf("/"))
        console.log(temp)
        await api.getAllEvents(temp).then(events => {
            this.setState({
                events: events.data.data,
                isLoading: false,
            })
        })
    }

    handleUploadFile = async (event) => {
        let temp = window.location.pathname;
        temp = temp.substring(temp.indexOf("/") + 1, temp.lastIndexOf("/"))

        const name = temp
        const file = event.target.files[0].name

        console.log(file, event.target.files)
        var formData = new FormData();
        var newfile = event.target.files[0]
        formData.append("file", newfile);

        api.updateEventByFile(name, file).then(res => {
            //window.alert(`Event data uploaded successfully`)
        })/**/
       /* setTimeout(function () {
            window.location.href = `/${name}/view`;
        }, 200000);
        window.alert(`Event data uploaded successfully`)*/
    }
    relocate() {
        let temp = window.location.pathname;
        temp = temp.substring(temp.indexOf("/") + 1, temp.lastIndexOf("/"))
        const name = temp;
        window.location.href = `/${name}/download`
    }
    uploadFile(event) {
        let file = event.target.files[0];
        let temp = window.location.pathname;
        temp = temp.substring(temp.indexOf("/") + 1, temp.lastIndexOf("/"))
        const name = temp;
        if (file) {
            const reader = new FileReader()
            //reader.onload = event => temp = temp + event.target.result
            
            reader.onload = function (e) {
                // Use reader.result
                var csv = reader.result;
                var lines = csv.replace(" ", "").split("\n");
                var result = [];
                var headers = lines[0].replace(" ", "").split(",");
                for (var i = 1; i < lines.length; i++) {
                    var obj = { checkin: false};
                    var currentline = lines[i].replace(" ", "").split(",");
                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j].replace(" ", "")] = currentline[j];
                    }
                    result.push(obj);
                }
                //return result; //JavaScript object
                result = JSON.stringify(result); //JSON
                result = `${result}`
                console.log("sending final to API" + result)
               
                api.updateEventByFile(name, result).then(res => {
                    window.alert(`Event data uploaded successfully`)
                    window.location.href = `/${name}/view`
                })/**/
            }
            const text = reader.readAsText(file)
            reader.onloadend = function () {
                console.log('DONE', reader.readyState); // readyState will be 2
            };
        }

    }


    render() {
        const { events, isLoading } = this.state

        const columns = [
            {
                Header: 'PantherID',
                accessor: 'PantherID',
                filterable: true,
            },
            {
                Header: 'First Name',
                accessor: 'FirstName',
                filterable: true,
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
                filterable: true,
            },
            {
                Header: 'Department',
                accessor: 'Department',
                filterable: true,
            },
            {
                Header: 'Level',
                accessor: 'Level',
                filterable: true,
            },
            {
                Header: 'Campus',
                accessor: 'Campus',
                filterable: true,
            },
            {
                Header: 'Degree',
                accessor: 'Degree',
                filterable: true,
            },
            {
                Header: 'Email',
                accessor: 'Email',
                filterable: true,
            },
            {
                Header: 'College',
                accessor: 'College',
                filterable: true,
            },
            {
                Header: 'Year',
                accessor: 'Year',
                filterable: true,
            },
            {
                Header: 'Check-in',
                id: 'checkin',
                accessor: d => d.checkin.toString().substring(0,1).toUpperCase(),
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateEvent id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        let showUpload = true
        if (!events.length) {
            showTable = false
            showUpload = true
        }

        return (
            <Wrapper>

                <h1>Update this table</h1>
                {showTable && (
                    <ReactTable
                        data={events}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={11}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                {showUpload && (
                   <input className= "file" type="file" accept=".xls,.csv" name="myFile" onChange={this.uploadFile} />)}
                <button className="button" onClick={this.relocate}>Checkin Complete</button>
            </Wrapper>
        )
    }
}

export default EventList
