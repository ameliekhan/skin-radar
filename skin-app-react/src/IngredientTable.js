import React from 'react';

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


export default class Table extends React.Component {


    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.state={
            expanded:false,
        };
    }

    getKeys = function () {

        return Object.keys(this.props.data[0]);

    }

    getHeader = function () {

        var keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })


    }

    getRowsData = function () {

        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow ref={tbDiv => {
                this.tbDiv = tbDiv
              }}
              rowClick={this.rowClick.bind(this)} key={index} data={row} keys={keys} /></tr>
        })

    }

    rowClick (){
        if (this.state.expanded=== true){
            this.setState({
                expanded:false,
            })
            this.tbDiv.setAttribute("className", "tbDiv");
        }
        else{
            this.setState({
                expanded:true,
              })
            this.tbDiv.setAttribute("className", "tbDivExpand");
        }
        

    }

    

    render() {
//add scrollY
        return (
            <MDBTable hover> 
            <div>
                <p>{this.state.height}</p>
            </div>
                <MDBTableHead>

                    {this.getHeader()}

                </MDBTableHead>
                <MDBTableBody >

                    {this.getRowsData()}

                </MDBTableBody>
            </MDBTable>
            

        );
    }
}


const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        return <td key={props.data[key]}><div 
         class="tbDiv" >{props.data[key]}</div></td>
    })

    // style= {Table.state.rowHeight} onClick={Table.rowClick}
}

