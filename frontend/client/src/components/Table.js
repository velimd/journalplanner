import React, { Component } from 'react';

class Table extends Component {

    columntitles() {
        let colName = this.props.titles.map( (t, key) =>
            <th key={key} scope="col"> {t} </th>
        );

        return(
            colName
        )
    }

    render() {
        return (
            <div>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        {this.columntitles()}
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.objects}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
