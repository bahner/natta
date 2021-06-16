import React from 'react'

#import config from '../../../config'
import './index.scss'
import FullCalendar from '@fullcalendar/react'
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeLinePlugin from '@fullcalendar/resource-timeline'

//FIXME: get events and resources from graphql, using apolloclient
export default class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events,
      resources: resources
    }
  }

  render () {
    return (
      <div>
        <FullCalendar
          schedulerLicenseKey={config.FULLCALENDAR_LICENSE_KEY}
          plugins={[interactionPlugin, resourceTimeLinePlugin]}
          locales={allLocales}
          locale='nb'
          ref={this.calendarRef}
          resources={this.state.resources}
          events={this.state.events}
          views={config.views}
          selectable
          editable
          eventDrop={this.drop}
          dragScroll
          eventOverlap={false}
          defaultView='resourceTimelineDays'
        />
      </div>
    )
  }
}
