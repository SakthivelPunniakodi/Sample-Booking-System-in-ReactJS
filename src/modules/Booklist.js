import React, { Component } from 'react'

export class Booklist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            booklist: []
            //
        }
    }
    componentDidMount() {
        let arr = [{
            'eventname': 'Event 1',
            'date': '22-10-2020',
            'availseats': 22,
            'route': '/booking',
            'imgurl': '/static/media/logo.5d5d9eef.svg'
        },
        {
            'eventname': 'Event 2',
            'date': 'new Date()',
            'availseats': 0,
            'route': '/booking',
            'imgurl': '/static/media/logo.5d5d9eef.svg'
        },
        {
            'eventname': 'Event 3',
            'date': '22-10-2020',
            'availseats': 22,
            'route': '/booking',
            'imgurl': '/static/media/logo.5d5d9eef.svg'
        },
        {
            'eventname': 'Event 4',
            'date': '27-10-2020',
            'availseats': 2,
            'route': '/booking',
            'imgurl': '/static/media/logo.5d5d9eef.svg'
        },
       
        ]
        this.setState({ booklist: arr });
    }
    renderImage(imageUrl) {
        // const images = require.context('../images/', true); 
        // let img = images(`./${imageUrl}`);
        // const baseUrl = "../images/";
        // let img=baseUrl + imageUrl;

        return (
            <div>
                <img
                    src={imageUrl}
                    alt='images'
                />
                {/* <img src={require( "" + img )} alt="product" /> */}
            </div>
        );
    }

    handlebooking(param) {
        //this.props.history.push(param.route);
        this.props.history.push({ pathname: param.route, state: { params: param } });
    }

    handleKeyPress(evt) {
        // console.log(evt);
        let value, ul, li, i, eventli, eventnameTxt, nonecount;
        value = evt.target.value.toUpperCase();
        ul = document.querySelectorAll('.eventlist');
        li = ul[0].children;
        for (i = 0; i < li.length; i++) {
            eventli = li[i].children[0].childNodes[0];
            eventnameTxt = li[i].children[0].childNodes[0].textContent;
            if (eventnameTxt.toUpperCase().indexOf(value) > -1) {
                eventli.parentElement.closest('li').style.display = "block";
            }
            else {
                nonecount++;
                eventli.parentElement.closest('li').style.display = "none";
            }
            if (li.length == nonecount) {

            }

        }

    }

    render() {
        let { booklist } = this.state;
        return (
            <>
                <div className="row">
                    <input type='text' onChange={(e) => this.handleKeyPress(e)} id='search' style={{ width: '50%', margin: '20px 0px 20px 20%' }} name='search' placeholder='SEARCH EVENTS'></input>
                </div>
                <div className="section group">
                    <ul className='eventlist'>
                        {booklist.map((ele, index) => {
                            return (<li key={index} className="col span_1_of_4">
                                <h4 className="heading">{ele.eventname}</h4>
                                <div className="images">
                                    {this.renderImage(ele.imgurl)}
                                </div>
                                {/* <h3 className="heading">{ele.eventname}</h3> */}
                                <p>{ele.date}</p>
                                <p>Seats <br /> Available: {ele.availseats}</p>
                                <p>{ele.totalseats}</p>
                                <button className={(ele.availseats !== 0) ? 'btnsubmit' : 'btncancel'} disabled={(ele.availseats !== 0) ? false : true} onClick={() => this.handlebooking(ele)}>{(ele.availseats !== 0) ? "Book Now" : "Sold out"}</button>
                            </li>
                            )
                        })}
                    </ul>

                </div>
            </>
        )
    }
}

export default Booklist
