import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class EventsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            checkin:'',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }
    handleChangeInputCheckin = async event => {
        const checkin = event.target.value
        this.setState({ checkin })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleUpdateEvent = async () => {
        const { id, checkin } = this.state
        const payload = {  checkin }
        console.log(payload)
        const page = ''//get from table
        await api.updateEventById(page,id, payload).then(res => {
            window.alert(`Event updated successfully`)
            this.setState({
                checkin: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        console.log(id)
        const event = await api.getEventById(id)

        this.setState({
            checkin: event.data.data.checkin,
        })
    }

    render() {
        const { checkin } = this.state
        return (
            <Wrapper>
                <Title>Mark Student as Present</Title>
                
                <InputText
                    type="radio"
                    value={checkin}
                    onChange={this.handleChangeInputCheckin}
                />

                <Button onClick={this.handleUpdateEvent}>Update Event</Button>
                <CancelButton href={'/events/view'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default EventsUpdate