import React, { Component } from 'react'
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
        console.log("attempting to fetch list for this event, sending to the event page")
        await api.getAllEvents(this.props.id)
            .then(
                window.location.href = `/${this.props.id}/view`
        )
    }
    render() {
        return <Update onClick={this.updateUser}>Update Attendance</Update>
    }
}


class EventsList extends Component {
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
        console.log("fetching tables")
        await api.getAllTables().then(name => {
            this.setState({
                events: name.data.names,
                isLoading: false,
            })
            for (var i = 0; i < name.data.names.length; i++) {
                console.log(name.data.names[i].name)
                
            }
            
            console.log("fetched tables")
        })
    }

    render() {
        const { events, isLoading } = this.state

        const columns = [
            {
                Header: 'Table Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateEvent id={props.original.name} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        return (
            <Wrapper>
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
            </Wrapper>
        )
    }
}

export default EventsList
