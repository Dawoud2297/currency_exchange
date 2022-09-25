import React from 'react'
import axios from 'axios'
import { Typography, Button } from '@material-ui/core'
import Header from './Header';


class Currency extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            currencies : [],
            currency : [],
            transform : {from : '', to : ''},
            currencyDetails : [],
            currencyName : '',
            currencyReverse : [],
            date : new Date()
        }
    }
    getCurrency = async () =>{
        let toArray = ['USD','EUR','EGP']
        let toResults = []
        for(let i = 0; i < 3; i++){
            await axios.get(
                `https://api.fastforex.io/fetch-one?from=${this.state.transform.from}&to=${toArray[i]}&api_key=ee2f812f02-caba015afb-rirlsf`
            ).then(res=>{
                toResults.push(res.data)
                this.setState({currency : toResults})
                console.log(this.state.currency)
                this.getCurrencyReverse()
            })
        }
    }
    getCurrencyReverse = async() =>{
        let toArray = ['USD','EUR','EGP']
        let toResults = []
        for(let i = 0; i < 3; i++){
            await axios.get(
                `https://api.fastforex.io/fetch-one?from=${toArray[i]}&to=${this.state.transform.from}&api_key=ee2f812f02-caba015afb-rirlsf`
            ).then(res=>{
                toResults.push(res.data)
                this.setState({currencyReverse : toResults})
                console.log(this.state.currencyReverse)
            })
        }
    }
    getCurrencyDetails = (n) =>{
        this.setState({currencyName : this.state.currencyDetails[n]})

        n === 'clear' && this.clear()

    }
    componentDidMount(){
        axios.get(
            'https://api.fastforex.io/fetch-all?api_key=ee2f812f02-caba015afb-rirlsf'
        ).then(res=>{
            this.setState({currencies : res.data.results})
            console.log(Object.keys(this.state.currencies).map(c=>(
                c
            )))
        }).catch(e=>{
            console.log(e.message)
        })

        axios.get(
            `https://api.apilayer.com/currency_data/list?apikey=6smGOPg5jzajEIxEJPDWry42RmoEYDd0`
        ).then(res=>{
            this.setState({currencyDetails : res.data.currencies})
            console.log(this.state.currencyDetails)
        }).catch(e=>{
            console.log(e.message)
        })
        
    }
    clear = () => {
        this.setState({
            currency : [],
            transform : {from : '', to : ''},
            currencyName : '',
            currencyReverse : []
        })
    }
    render ()
    {
        return (
    <div className="container">
       <Header/>
       <div className='content'>

            <div className='currencyBody'>
                <h4 style={{marginLeft : '50px'}}>Selected Currency Equals</h4>
                <div className='currencyContainer'>
                    <div className='eye'>
                            <h2>USD</h2>   
                            <p><strong>United States Dollar</strong></p>                      
                        <h4>

                         {
                         this.state.currency[0] &&
                         <>
                         <span style={{color:'gray'}}>

                        {
                            this.state.currency[0].base
                        }
                        </span>
                         <span style={{margin : '0 10px'}}>
                            =
                         </span>
                         {
                            this.state.currency[0].result.USD
                         }
                         <span style={{marginLeft:'10px'}}>
                            USD
                         </span>
                         </>
                         
                         }
                        </h4>
                    </div>
                    <div className='eye'>
                        <h2>EUR</h2>
                        <p><strong>Euro</strong></p>
                        <h4>
                        {
                        this.state.currency[1] && 
                        <>
                        <span style={{color:'gray'}}>
                        {
                            this.state.currency[1].base
                        }
                        </span>
                        <span style={{margin : '0 10px'}}>
                            =
                        </span>

                        {
                        this.state.currency[1].result.EUR
                        }
                        <span style={{marginLeft:'10px'}}>
                            EUR
                        </span>
                        </>
                        }

                        </h4>
                    </div>
                    <div className='eye last'>
                        <h2>EGP</h2>
                        <p><strong>Egyptian Pound</strong></p>
                        <h4>
                        {
                            this.state.currency[2] &&
                            <>
                            <span style={{color:'gray'}}>
                            {
                                this.state.currency[2].base
                            }
                            </span>
                            <span style={{margin : '0 10px'}}>
                                =
                            </span>
                            {
                                this.state.currency[2].result.EGP
                            }
                            <span style={{marginLeft:'10px'}}>
                                EGP
                            </span>
                            </>
                        }
                        </h4>
                    </div>
                    <div className='margin'>
                    </div>
                    <div className='optionCurrencies'>
                        {/* <input type='text'/> */}
                        <Typography>
                <select autoFocus className='dropList' 
                onChange={e=>this.setState({transform : {...this.state.transform,from : e.target.value}})}
                onClick={e=>this.getCurrencyDetails(e.target.value)}
                >
                    <option value='clear'>Select Currency</option>
                    {
                        Object.keys(this.state.currencies).map(currency=>(
                            <option 
                            value={currency} 
                            >
                                {currency}
                            </option>
                        ))
                    }
                </select>
                        <div className='currency info'>
                            {
                                this.state.currencyName
                            }
                        </div>
                        </Typography>
                        <div>
                        <div className='someInfo'>
                        {
                            this.state.transform.from &&
                            <>
                            <div className='reverseCurrency'>
                            <Button variant='outlined' style={{marginBottom : '10px'}} onClick={this.getCurrency}> Convert
                            </Button> 

                                <p><strong>
                                1 USD =
                                <span style={{margin : '5px'}}>
                                        
                            {
                                this.state.currencyReverse[0] && this.state.currencyReverse[0].result[this.state.transform.from]
                            }
                            </span>
                            <span style={{margin : '5px'}}>
                                        
                            {
                                this.state.currencyReverse[0] && Object.keys(this.state.currencyReverse[0].result)
                            }
                            </span> 
                                </strong></p>
                            </div>
                            <div className='reverseCurrency'>
                                <p><strong>
                                1 EUR =
                                <span style={{margin : '5px'}}>
                                        
                            {
                                this.state.currencyReverse[1] && this.state.currencyReverse[1].result[this.state.transform.from]
                            }
                            </span>
                            <span style={{margin : '5px'}}>
                                        
                            {
                                this.state.currencyReverse[1] && Object.keys(this.state.currencyReverse[1].result)
                            }
                            </span>
                                </strong></p>
                            </div>
                            <div className='reverseCurrency'>
                                <p><strong>
                                   1 EGP = 
                                    <span style={{margin : '5px'}}>
                                        
                                    {
                                        this.state.currencyReverse[2] && this.state.currencyReverse[2].result[this.state.transform.from]
                                    }
                                    </span>
                                    <span style={{margin : '5px'}}>
                                        
                                    {
                                        this.state.currencyReverse[2] && Object.keys(this.state.currencyReverse[2].result)
                                    }
                                    </span>
                                </strong></p>
                                <p style={{marginTop : '25px'}}>
                                    <strong>
                                        {
                                            this.state.date.toDateString()
                                        }
                                    </strong>
                                </p>
                            </div>
                            </>
                            }
                        </div>
                        </div>
                    </div>

                </div>
                <div>
                </div>
            </div>
       </div>
    </div>
        )
    }
}

export default Currency