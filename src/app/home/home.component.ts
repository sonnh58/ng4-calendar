import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: any[];

  header: any;

  event: MyEvent;

  dialogVisible: boolean = false;

  idGen: number = 100;

  constructor() {
    // this.header = {
    //   left: 'prev,next today',
    //   center: 'title',
    //   right: 'month,agendaWeek,agendaDay,listMonth'
    // };
  }

  ngOnInit() {
    this.events = [
      {
        "title": "All Day Event",
        "start": "2017-08-01"
      },
      {
        "title": "Long Event",
        "start": "2017-08-01",
        "end": "2017-08-02"
      },
      {
        "title": "Repeating Event",
        "start": "2017-04-08T16:00:00"
      },
      {
        "title": "Repeating Event",
        "start": "2017-08-16T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2017-08-11",
        "end": "2017-08-13"
      }
    ];
  }

  handleDayClick(event) {
    this.event = new MyEvent();
    this.event.start = event.date.format();
    this.dialogVisible = true;
  }

  handleEventClick(e) {
    console.log(e);
    this.event = new MyEvent();
    this.event.title = e.calEvent.title;

    let start = e.calEvent.start;
    let end = e.calEvent.end;
    if(e.view.name === 'month') {
      start.stripTime();
    }

    if(end) {
      end.stripTime();
      this.event.end = end.format();
    }

    this.event.id = e.calEvent.id;
    this.event.start = start.format();
    this.event.allDay = e.calEvent.allDay;
    this.dialogVisible = true;
  }

  saveEvent() {
    //update
    if(this.event.id) {
      let index: number = this.findEventIndexById(this.event.id);
      if(index >= 0) {
        this.events[index] = this.event;
      }
    }
    //new
    else {
      this.event.id = this.idGen++;
      this.events.push(this.event);
      this.event = null;
    }

    this.dialogVisible = false;
  }

  deleteEvent() {
    let index: number = this.findEventIndexById(this.event.id);
    if(index >= 0) {
      this.events.splice(index, 1);
    }
    this.dialogVisible = false;
  }

  findEventIndexById(id: number) {
    let index = -1;
    for(let i = 0; i < this.events.length; i++) {
      if(id == this.events[i].id) {
        index = i;
        break;
      }
    }

    return index;
  }

}

export class MyEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean = true;
}
