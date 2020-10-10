import React, { Component } from 'react'

export class Seatbook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            booklist: this.props.location.state.params,
            selectitems:[],
            attendeecount:'',
            phone:'',
            email:'',
            name:'',
            attendee:[{ firstName: ""}],
            error:'',
            disabled:false,
            dynamicflag:0
        }
    }
    componentDidMount(){
        // console.log(this.props);
        let countElement = this.props.location.state.params.availseats;
        // let select=[];
        // for (let index = 1; index < countElement; index++) {
        //     select.push({'id':index,'name':index});
        // }
        // console.log(select);
        this.setState({availseats:countElement})
    }
     handleInputChange (e, index){
        let{attendee}= this.state;
        const { name, value } = e.target;
        const list = [...attendee];
        list[index][name] = value;
        this.setState({attendee:list, error:''});
      };
    renderImage(imageUrl) {
        return (
            <div>
                <img
                    src={imageUrl}
                    alt='images'
                />
            </div>
        );
    }
    change(evt){
        const value = evt.target.value;
         if(evt.target.name =='attendeecount' && value !=='' && value!==1){
            let{attendee,dynamicflag}= this.state;
            if(dynamicflag == 0){
            let arr =[...attendee];
            for (let i = 1; i < value; i++) {
                arr.push({ firstName: ""});        
            }
            this.setState({attendee:arr,dynamicflag:1});
            }
            else{
            let arr =[];
            for (let i = 1; i <=value; i++) {
                arr.push({ firstName: ""});        
            }
            this.setState({attendee:arr,dynamicflag:1});
            }
            }
        this.setState({[evt.target.name]: value, error:''});
    }

    handlecancel(e){
    //    history.go(-1);
    this.props.history.push({ pathname: '/'});
    }
    handleSubmit(e){
        let {name,email,phone,attendee,attendeecount,availseats} = this.state;
        let reg1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(name === '' || name === undefined){
            this.setState({error:"Please enter your name."})
            return false;
        }
        else if(email === '' || email === undefined){
            this.setState({error:"Please enter your email."})
            return false;
        }
        else if (reg1.test(email) == false) {
            this.setState({error:"Invalid email"})
            return false;
        }
        else if(phone === '' || phone === undefined){
            this.setState({error:"Phone no. must be provided."})
            return false;
        }
        else if(attendeecount === '' || attendeecount === undefined){
            this.setState({error:"Please enter the number of seats."})
            return false;
        }
        else if(attendeecount > availseats){
            this.setState({error:"Number of seats selected greater than available seats"})
            return false;
        }
        else if(attendee.length==0 || attendee==undefined){
            this.setState({error:"Attendee Name must be provided."})
            return false;
        }
        else if(parseInt(attendeecount) !== attendee.length){
            this.setState({error:"Please enter the name of Attendee."})
            return false;
        }
        console.log('name:'+name,'email:'+email,'phone'+phone,'attendee'+attendee,'attendeecount'+attendeecount);
        this.setState({disabled:true});
    }
    render() {
        let { booklist, selectitems, name, email, phone, attendee, attendeecount, error,attendeeinput,disabled } = this.state;
        // console.log(booklist)
        // let Bookingcount = selectitems.length > 0
        //     && selectitems.map((item, i) => {
        //         return (
        //             <option key={i} value={item.id}>{item.name}</option>
        //         )
        //     }, this);
        return (
            <div>
                <div className='error1'>{error}</div>
               
                <div className="App-logo">
                        {this.renderImage(booklist.imgurl)}
                    </div>
                <div className="container">
                <h3 className='topic'>{booklist.eventname}</h3>
                <h5 className='topic'>Number of available seats: {booklist.availseats}</h5>
                    <div className="row">
                        <div className="col-25">
                            <label>Name:</label><span className='error'>*</span>
                        </div>
                        <div className="col-75">
                            <input name='name' onChange={(e) => this.change(e)} type='text' value={name} placeholder="Name"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Email:</label><span className='error'>*</span>
                        </div>
                        <div className="col-75">
                            <input name='email' onChange={(e) => this.change(e)} type='email' value={email} placeholder="Email"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Phone no:</label><span className='error'>*</span>
                        </div>
                        <div className="col-75">
                            <input name='phone' onChange={(e) => this.change(e)} type='number' value={phone} placeholder="Phone no"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Number of seats:</label><span className='error'>*</span>
                        </div>
                        <div className="col-75">
                            <select id="count" name='attendeecount' onChange={(e) => this.change(e)} value={attendeecount}>
                                {/* {Bookingcount} */}
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Name of Attendee {(attendeecount!=='select')?attendeecount:null}:</label><span className='error'>*</span>
                        </div>

                        <div className="col-75">
                        {attendee.map((ele,i)=>{
                             return (
                                 <input key={i} name='firstName' className='dyninput' onChange={(e) => this.handleInputChange(e,i)} type='text' value={ele.firstName} placeholder="Name of Attendee"/>
                             );
                        })}
                        </div>
                    </div>
                    <div className="row">
                    <button className='btncancel' disabled={disabled} onClick={(e) => this.handlecancel(e)}>cancel</button>
                    <button className='btnsubmit' disabled={disabled} onClick={(e) => this.handleSubmit(e)}>submit</button>
                    <div className='error1'>{error}</div>
                     </div>
                </div>
            </div>
        )
    }
}

export default Seatbook
